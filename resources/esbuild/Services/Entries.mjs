import fs from 'fs';
import os from 'os';
import path from 'path';
import config from '../../config.mjs';
import { recreateDir, resolveRoot } from '../utils/fs.mjs';

export default class Entries {

	#tmpDir = os.tmpdir + '/esbuild';
	#entryPath = 'entry';
	#viewPath = 'src'

	#createEntryIntoTmp = (arr, entryName) => {
		let content = ''
		arr.forEach(line => {
			if (/\.(js|scss)$/.test(line)) {
				content += 'import \'' + line + '\';\n';
			}
		})
		fs.writeFileSync(path.join(this.#tmpDir, entryName), content, err => {
			if (err) throw err;
		})
	}

	#getRecursiveFiles = (entry, arrFiles = []) => {
		if (fs.statSync(entry, errStat => {
			if (errStat) throw errStat;
		}).isFile()) {
			return entry;
		}
		const dirs = fs.readdirSync(entry, (err) => {
			if (err) { throw err }
		});
		dirs.forEach(file => {
			const filePath = path.join(entry, file)
			if (fs.statSync(filePath, errStat => {
				if (errStat) throw errStat;
			}).isDirectory())
				arrFiles = this.#getRecursiveFiles(filePath, arrFiles);
			else {
				arrFiles.push(filePath);
			}
		})
		return arrFiles
	}

	getAll = () => {
		if (!config.entryList) return console.error('Необходимо подключить entry в файле resources/config.js')
		let newEntries = [];
		recreateDir(this.#tmpDir)
		config.entryList.forEach(async entryName => {
			this.getOne(entryName)
			newEntries.push(path.join(this.#tmpDir, entryName));
		})
		return newEntries
	}

	getOne = (entryName) => {
		const file = fs.readFileSync(resolveRoot(this.#entryPath, entryName), 'utf8', (error, file) => {
			if (error) throw `В директории ${this.#entryPath} остутсвует файл: ${entryName}`;
			return file
		})
		let arrFiles = []
		file.split('\n').forEach(rawLine => {
			const line = rawLine.replace(/'|"|,|\r/g, '');
			arrFiles = arrFiles.concat(this.#getRecursiveFiles(resolveRoot(this.#viewPath, line)))
		})
		this.#createEntryIntoTmp(arrFiles, entryName)
		return path.join(this.#tmpDir, entryName);
	}

	get = () => {
		if (!config.entryList) return console.error('Необходимо подключить entry в файле resources/config.js')
		let newEntries = [];
		recreateDir(this.#tmpDir)
		config.entryList.forEach(async entryName => {
			const file = fs.readFileSync(resolveRoot(this.#entryPath, entryName), 'utf8', (error, file) => {
				if (error) throw `В директории ${this.#entryPath} остутсвует файл: ${entryName}`;
				return file
			})
			let arrFiles = []
			file.split('\n').forEach(rawLine => {
				const line = rawLine.replace(/'|"|,|\r/g, '');
				arrFiles = arrFiles.concat(this.#getRecursiveFiles(resolveRoot(this.#viewPath, line)))
			})
			this.#createEntryIntoTmp(arrFiles, entryName)
			newEntries.push(path.join(this.#tmpDir, entryName));
		})
		return newEntries
	}
}