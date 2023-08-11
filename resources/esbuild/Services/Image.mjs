import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export default class Image {

	static async convertToWebp(path, config) {
		return await imagemin([path + '/*.{jpg,png}'], {
			destination: path,
			plugins: [
				imageminWebp({
					quality: config.quality || 75,
					preset: 'photo'
				})
			]
		});
	}
}