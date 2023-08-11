import Image from '../Services/Image.mjs';
import { resolveRoot } from '../utils/fs.mjs';
import { tmpdir } from 'node:os';
import fs from 'node:fs';

import path from 'path'

const pluginImages = (config) => ({
	name: 'images',
	setup(build) {
		build.onResolve({ filter: /^img\/.*$/ }, (args) => {
			return {
				path: resolveRoot('src', args.path),
				namespace: 'img'
			}
		})
		build.onLoad({ filter: /.+/, namespace: 'img' }, async (args) => {
			const result = await Image.convertToWebp(path.join(args.path), config)
			const entryName = args.path.split('/').pop()
			const dir = path.join(tmpdir(), 'esbuild', 'img', entryName)

			if (result.length > 0) {
				fs.mkdirSync(dir, { recursive: true }, (err) => {
					if (err) throw err;
				});
				result.forEach(el => {
					fs.rename(el.sourcePath, path.join(dir, path.basename(el.sourcePath)), (err) => {
						if (err) throw err;
					});
				})
			}
			return {
				loader : 'empty' 
			}
		});
	}
});

export default pluginImages;