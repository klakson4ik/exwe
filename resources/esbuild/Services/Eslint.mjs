import { ESLint } from 'eslint';
import chalk from 'chalk'

export default class Eslint {
	static #files = './src/**/*.js'

	static async lint(config) {
		const eslint = new ESLint({
			fix: config.auto_fix || true,
			cache: config.cache || true
		});

		const results = await eslint.lintFiles([this.#files]);

		if (config.auto_fix)
			await ESLint.outputFixes(results);

		const formatter = await eslint.loadFormatter("stylish");
		return {
			isErrors: results.length > 0 ? true : false,
			errors: formatter.format(results)
		}
	}

	static #log(data) {
		data.results.forEach(el => {
			if (el.errored) {
				console.log('\n' + chalk.green(el.source))
				el.warnings.forEach(wr => {
					console.log(`${chalk.green(wr.line)} ${chalk.red('x')} ${chalk.green(wr.column)}\t\t${wr.text}`)
				})
			}
		})
	}
}