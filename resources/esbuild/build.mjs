/**
 * Запуск esbuild-а в режиме сборки
 */

// Импортируем "интерфейс" esbuild-а
import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const entry = [
	'.home.mjs', 'about.mjs'
]

// Импортируем настройки проекта для esbuild-а
// import config from './config.mjs';

// Запускае6м сборку файлов проекта
const result = await esbuild.build({
	entryPoints: ['esbuild/entry/home.js'],
	bundle: true,
	write: true,
	outdir: 'esbuild/out/'
});

console.log(result);