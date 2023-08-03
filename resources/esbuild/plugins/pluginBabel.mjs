import babelCore from '@babel/core';
import fs from 'fs';
import path from 'path';

const babel = () => ({
	name: 'babel',
	setup(build, { transform } = {}) {
		const transformContents = ({ args, contents }) => {
			const babelOptions = babelCore.loadOptions({
				filename: args.path,
				caller: {
					name: 'babel',
					supportsStaticESM: true
				}
			});
			if (!babelOptions) return { contents };

			if (babelOptions.sourceMaps) {
				const filename = path.relative(process.cwd(), args.path);

				babelOptions.sourceFileName = filename;
			}

			return new Promise((resolve, reject) => {
				babelCore.transform(contents, babelOptions, (error, result) => {
					error ? reject(error) : resolve({ contents: result.code });
				});
			});
		};

		if (transform) return transformContents(transform);

		build.onLoad({ filter: /.js$/, namespace: 'file' }, (args) => {
			const contents = fs.promises.readFile(args.path, 'utf8');

			return transformContents({ args, contents });
		});
	}
});

export default babel;