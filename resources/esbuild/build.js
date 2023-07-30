const esbuild = require('esbuild');
const { resolveRoot } = require('./utils/fs');
const Entries = require('./Services/Entries');
const { sassPlugin }  = require('esbuild-sass-plugin')
const stylelint = require('esbuild-plugin-stylelint');
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

esbuild.build({
	entryPoints: Entries.get(),
	bundle: true,
	write: true,
	sourcemap: true,
	metafile: true,
	outdir: resolveRoot('esbuild', 'out'),
	plugins: [
		sassPlugin({
			filter: /\.scss$/,
			async transform(source) {
				const { css } = await postcss([autoprefixer]).process(source);
				return css;
			},
		}),
		stylelint()
	],
});
