/**
 * Запуск esbuild-а в режиме сборки
 */

// Импортируем "интерфейс" esbuild-а
const esbuild = require('esbuild');
const path = require('path')
const fs = require('fs');
var tmpfile = []


function resolveRoot(...segments) {
	return path.resolve(__dirname, '..', ...segments)
}

function resolveEsPath(...segments) {
	return resolveRoot('esbuild', ...segments)
}

const listObjects = (path, fullEntry) => {
	fs.readdir(path, (err, files) => {
		if (err) throw err;
		for (let fileName of files) {
			const fullPath = path + '/' + fileName
			fs.stat(fullPath, (errStat, status) => {
				if (errStat) throw errStat;

				if (status.isDirectory()) {
					listObjects(fullPath, fullEntry); // продолжаем рекурсию
				} else {
					if (/(.js|.scss)$/.test(fileName)) {
						const entry = fullEntry.split('/').pop()
						const tmpPath = '/tmp/esbuild';
						const tmpEntry = tmpPath + '/' + entry
						console.log(tmpEntry)
						fs.stat(tmpPath, (errStat, status) => {
							if (errStat) {
								fs.mkdir(tmpPath, (err) => {
									if(err) throw err
								})
								fs.writeFile(tmpEntry, 'import \'' + fullPath + '\'', (err) => {
									if(err) throw err
								})
							} else {
								fs.stat(tmpEntry, (errStat, status) => {
									if (errStat) {
										fs.writeFile(tmpEntry, 'import \'' + fullPath + '\'', err => {
											if(err) throw err
										})
									}
									fs.appendFile(tmpEntry, ',\nimport \'' + fullPath + '\'', (err) => {
										if(err) throw err
									})
								})
							}
						})
					}
				}
			});
		}
	});
}
let EntryPlugin = {
	name: 'EntryPlugin',
	setup(build) {
		build.onStart(() => {
			const entries = build.initialOptions.entryPoints;
			entries.forEach(entry => {
				fs.readFile(entry, 'utf8', (error, file) => {
					if (error) throw error; // ошибка чтения файла, если есть
					const content = file.split('\n')
					content.forEach(rawLine => {
						const line = rawLine.replace(/'|"|,|\r/g, '');
						listObjects(resolveRoot('src', line), entry)
					});
					// console.log(fileContent); // содержимое файла
				});
			});
		})
	},
}

// Импортируем настройки проекта для esbuild-а
// import config from './config.mjs';

// Запускае6м сборку файлов проекта
const result = esbuild.build({
	entryPoints: [resolveEsPath('entry', 'home.js')],
	bundle: true,
	write: true,
	outdir: resolveEsPath('out'),
	plugins: [
		EntryPlugin,
	],
});

console.log(result);