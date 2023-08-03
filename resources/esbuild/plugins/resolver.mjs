import { getRecursiveFiles, resolveRoot } from "../utils/fs.mjs"
import path from 'path';
import fs from 'fs'
import babelCore from '@babel/core';

const pluginResolver = (options = {}) => ({
	name: 'resolver',
	setup(build) {
		const transformContents = (file) => {
			const babelOptions = babelCore.loadOptions({
				filename: file,
				caller: {
					name: 'babel',
					supportsStaticESM: true
				}
			});

			if (babelOptions.sourceMaps) {
				const filename = path.relative(process.cwd(), file);

				babelOptions.sourceFileName = filename;
			}

			const contents = fs.readFileSync(file, 'utf8');
			return babelCore.transform(contents, babelOptions).code

			// return new Promise((resolve, reject) => {
			// 	babelCore.transform(contents, babelOptions, (error, result) => {
			// 		error ? reject(error) : resolve({ contents: result.code });
			// 	});
			// });
		};

		build.onResolve({ filter: /^(common|layouts|pages|partials)\/.+/ }, (args) => {
			if (args.kind == 'import-statement') {
				return {
					path: /\.(js|scss);?,?$/.test(args.path) ? resolveRoot('src', args.path) : path.join('src', args.path),
					namespace: /\.(js|scss);?,?$/.test(args.path) ? 'file' : 'blocks',
				}
			}
		})

		build.onLoad({ filter: /.+/, namespace: 'blocks' }, (args) => {
			let content = ''
			getRecursiveFiles(args.path).forEach(file => {
				if (/\.scss$/.test(file)) {
					content += 'import \'.' + file.replace(args.path, '') + '\';\n';
				}
				if (/\.js$/.test(file)) {
					content += transformContents(file) + '\n';
				}
			})
			console.log(content)

			return {
				contents: content,
				loader: 'js',
				resolveDir: resolveRoot(args.path)
			}
		})
		build.onStart(() => {
			console.log('build started')
		})
	}
})

export default pluginResolver;

