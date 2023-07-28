const { build } = require('esbuild')

let exampleOnResolvePlugin = {
	name: 'example',
	setup(build) {
	  // Redirect all paths starting with "images/" to "./public/images/"
	  build.onResolve({ filter: /^images\// }, args => {
		return { path: path.join(args.resolveDir, 'public', args.path) }
	  })
  
	  // Mark all paths starting with "http://" or "https://" as external
	  build.onResolve({ filter: /^https?:\/\// }, args => {
		return { path: args.path, external: true }
	  })
	},
  }
  