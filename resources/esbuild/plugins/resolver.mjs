import { getRecursiveFiles, resolveRoot } from "../utils/fs.mjs"
import path from 'path';

const pluginResolver = () => ({
	name: 'resolver',
	setup(build) {
		build.onResolve({ filter: /^(common|layouts|pages|partials)$/ }, (args) => {
			if (args.kind == 'import-statement') {
				return {
					path: path.join('src', args.path),
					namespace: 'dir',
				}
			}
		})

		build.onLoad({ filter: /.+/, namespace: 'dir' }, (args) => {
			let imports = ''
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
	}
})

export default pluginResolver;

