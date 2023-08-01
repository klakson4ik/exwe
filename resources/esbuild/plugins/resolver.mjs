import { build } from "esbuild"
import { resolveRoot } from "../utils/fs.mjs"
import Entries from "../Services/Entries.mjs"

export default {
	name: 'resolver',
	setup(build) {
		// Intercept import paths called "env" so esbuild doesn't attempt
		// to map them to a file system location. Tag them with the "env-ns"
		// namespace to reserve them for this plugin.
		build.onResolve({ filter: /^common$/ }, () => ({
			path: resolveRoot('src', 'common'),
			namespace: 'blocks',
		}))

		// Load paths tagged with the "env-ns" namespace and behave as if
		// they point to a JSON file containing the environment variables.
		build.onLoad({ filter: /.+/, namespace: 'blocks' }, (args) => {
			console.log(args)
			const entryClass = new Entries();
			const files = entryClass.getRecursiveFiles(args.path)
			const importSting = entryClass.toImportString(files)
			console.log(importSting)

			return {
				contents: importSting,
				loader: 'js',
			}
		})
	},
}