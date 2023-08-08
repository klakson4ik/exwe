import esbuild from 'esbuild'
import { argv, exit } from 'process'
import config from '../config.mjs';
import { resolveRoot } from './utils/fs.mjs';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env'
import resolver from './plugins/pluginResolver.mjs';
import images from './plugins/pluginImages.mjs'
import Stylelint from './Services/Stylelint.mjs';
import Eslint from './Services/Eslint.mjs';

const mode = argv[2] || 'dev';
let linting = [];

if (config.modes[mode].stylelint.enable) {
	const result = await Stylelint.lint(config.modes[mode].stylelint)
	if (result.isErrors) {
		linting.push(result.errors)
	}
}

if (config.modes[mode].eslint.enable) {
	const result = await Eslint.lint(config.modes[mode].eslint);
	if (result.isErrors) {
		linting.push(result.errors)
	}
}
if (linting.length > 0) {
	linting.forEach(el => {
		console.log(el + '\n')
	})
	exit()
}

esbuild.build({
	entryPoints: config.entryList.map(el => resolveRoot('entry', el)),
	bundle: true,
	write: true,
	sourcemap: config.modes[mode].sourcemap || true,
	minify: config.modes[mode].minify || false,
	metafile: true,
	outdir: resolveRoot('..', config.outdir),
	plugins: [
		resolver(),
		sassPlugin({
			precompile(source, pathname, isRoot) {
				return isRoot ? `@import '${resolveRoot('src/style/style.scss')}';\n${source}` : source
			},
			async transform(source, resolveDir) {
				const { css } = await postcss(
					config.modes[mode].autoprefixer
						? [autoprefixer, postcssPresetEnv({ stage: 1 })]
						: []).process(source, { from: resolveDir }
						)
				return css
			},
		}),
		images()
	],
});