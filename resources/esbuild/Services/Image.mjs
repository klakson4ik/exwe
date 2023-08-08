import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export default class Image {

	static async convertToWebp(path) {
		const result = await imagemin([path + '/*.{jpg,png}'], {
			destination: path,
			plugins: [
				imageminWebp({quality: 70})
			]
		});
		console.log(result)
	}
}