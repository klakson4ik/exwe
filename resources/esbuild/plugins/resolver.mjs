import { getRecursiveFiles, resolveRoot } from "../utils/fs.mjs"

export default {
	name: 'resolver',
	setup(build) {
		
		build.onResolve({ filter: /^(common|layouts|pages|partials)/ }, (args) => {
			console.log('common')
			if (args.kind == 'import-statement' && !/\.(js|scss);?,?$/.test(args.path)) {
				return {
					path: resolveRoot('src', args.path),
					namespace: 'blocks',
				}
			}
		})

		build.onResolve({ filter: /(\.(js|scss)$)/ }, (args) => {
			console.log('js')
			if (args.kind == 'import-statement') {
				return {
					path: resolveRoot('src', args.path),
					namespace: 'fullpatn',
				}
			}
		})
		// build.onResolve({ filter: /^.+$/ }, () => ({
		// 	path: resolveRoot('src'),
		// 	namespace: 'blocks',
		// })),
		build.onLoad({ filter: /.+/, namespace: 'blocks' }, (args) => {
			let importSting = ''
			// console.log(args.path)
			getRecursiveFiles(args.path).forEach(file => {
				if (/\.(js|scss)$/.test(file)) {
					importSting += 'import \'' + file + '\';\n';
				}
			})
			// console.log(importSting);

			return {
				contents: importSting,
				loader: 'js',
				resolveDir: args.path
			}
		})
		build.onLoad({ filter: /.+/, namespace: 'fullpath'}, args => {
			console.log(args)
		})

	},
}