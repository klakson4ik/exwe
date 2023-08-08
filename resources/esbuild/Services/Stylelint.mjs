import stylelint from "stylelint";
import chalk from 'chalk'

export default class Stylelint {
	static #files = './src/**/*.scss'

	static async lint(config) {
		return await stylelint.lint({
			files: this.#files,
			fix: config.auto_fix || true,
			cache: config.cache || false
		}).then(data => {
			const errors = this.#log(data)
			return {
				isErrors: data.errored,
				errors: errors
			}
		})
	}

	static #log(data) {
		let errors = ''
		data.results.forEach(el => {
			if (el.errored) {
				errors += '\n' + chalk.underline(el.source)
				el.warnings.forEach(wr => {
					errors += `\n  ${chalk.gray(wr.line)}${chalk.gray(':')}${chalk.gray(wr.column)}   ${chalk.red('error')}  ${wr.text}`
				})
			}
		})
		return errors
	}
}