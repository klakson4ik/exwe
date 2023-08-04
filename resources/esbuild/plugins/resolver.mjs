import { getRecursiveFiles, resolveRoot } from "../utils/fs.mjs"
import path from 'path';
import fs from 'fs'

const pluginResolver = () => ({
	name: 'resolver',
	setup(build) {
		build.onResolve({ filter: /^(common|layouts|pages|partials|style)\/?.*$/ }, (args) => {
			if (args.kind == 'import-statement' && args.importer.includes('entry') && !/\.(scss|js)$/.test(args.path)) {
				return {
					path: resolveRoot('src', args.path),
					namespace: 'dir',
				}
			} else {
				return {
					path: resolveRoot('src', args.path),
				}
			}
		})

		build.onResolve({ filter: /\.(woff2?|ttf)$/ }, (args) => {
			return {
				path: args.path,
				namespace: 'fonts'
			}
		})

		build.onResolve({ filter: /^(\@|node\_modules)\/?.*/ }, (args) => {
			return {
				path: resolveRoot(args.path),
			}
		})

		build.onLoad({ filter: /.+/, namespace: 'dir' }, (args) => {
			let imports = ''
			console.log(args)
			getRecursiveFiles(args.path).forEach(file => {
				if (/\.(scss|js)$/.test(file)) {
					imports += 'import \'.' + file.replace(args.path, '') + '\'\n';
				}
			})

			return {
				contents: imports,
				loader: 'js',
				resolveDir: resolveRoot(args.path)
			}
		})

		build.onLoad({ filter: /.+/, namespace: 'fonts' }, (args) => {
			const content = new Uint8Array(fs.readFileSync(args.path))

			return {
				contents: content,
				loader: (0 < content.length) ? 'copy' : 'empty',
			};

		})
		build.onEnd(result => {
			console.log(result.metafile)
		})
	}
})

export default pluginResolver;

