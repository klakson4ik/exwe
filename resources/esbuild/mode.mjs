import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import { resolveRoot } from './utils/fs.mjs';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env'
import resolver from './plugins/resolver.mjs';
import babel from './plugins/pluginBabel.mjs';

export default {
	dev: {
		entryPoints: ['entry/home.js'],
		bundle: true,
		write: true,
		sourcemap: true,
		metafile: true,
		outdir: resolveRoot('..', 'public', 'assets'),
		plugins: [
			resolver(),
			sassPlugin({
				precompile(source, pathname, isRoot) {
					return isRoot ? `@import '${resolveRoot('src/style/style.scss')}';\n${source}` : source
				},
				async transform(source, resolveDir) {
					const { css } = await postcss([]).process(source, { from: resolveDir })
					return css
				},

			}),
		],
	},
	prod: {
		entryPoints: ['entry/home.js'],
		bundle: true,
		write: true,
		metafile: true,
		minify: true,
		outdir: resolveRoot('esbuild', 'out', 'prod'),
		plugins: [
			resolver,
			sassPlugin({
				async transform(source, resolveDir) {
					const { css } = await postcss([autoprefixer, postcssPresetEnv({ stage: 1 })]).process(source, { from: resolveDir })
					return css
				}
			}),
			babel()
		],
	}
}