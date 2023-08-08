import Image from '../Services/Image.mjs';
import { getFiles, resolveRoot } from '../utils/fs.mjs';

import path from 'path'

const pluginImages = () => ({
	name: 'images',
	setup(build) {
		build.onResolve({ filter: /^img\/.*$/ }, (args) => {
			return {
				path: resolveRoot('src', args.path),
				namespace: 'img'
			}
		})
		build.onLoad({ filter: /.+/, namespace: 'img' }, (args) => {
			Image.convertToWebp(path.join(args.path, 'photo'))
		});
	}
});

export default pluginImages;