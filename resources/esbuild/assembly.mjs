import sassPlugin from 'esbuild-sass-plugin';
import postcss from 'postcss';
import Entries from './Services/Entries.mjs';
import { resolveRoot } from './utils/fs.mjs';

export const dev = {
	entryPoints: new Entries().get(),
	bundle: true,
	write: true,
	sourcemap: true,
	metafile: true,
	outdir: resolveRoot('esbuild', 'out', 'dev'),
	plugins: [
		sassPlugin({
			async transform(source, resolveDir) {
				const { css } = await postcss([]).process(source, { from: resolveDir })
				return css
			}
		}),
	],
}
export const prod = {
	entryPoints: new Entries().get(),
	bundle: true,
	write: true,
	metafile: true,
	minify: true,
	outdir: resolveRoot('esbuild', 'out', 'prod'),
	plugins: [
		sassPlugin({
			async transform(source, resolveDir) {
				const { css } = await postcss([autoprefixer, postcssPresetEnv({ stage: 1 })]).process(source, { from: resolveDir })
				return css
			}
		}),
		babel()
	],
}