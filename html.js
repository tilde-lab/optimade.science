import { readFile, mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';
import { constants } from 'fs';

export default function html(options = {}) {
	return {
		name: 'html',
		setup(build) {
			build.onEnd(async (result) => {
				let html = await readFile(options.in);

				html = html.toString();

				if (options.dev) {
					const linkedReplace = `\t<link rel='stylesheet' href='build/bundle.css'>\n\t<script defer src='build/bundle.js'></script>\n</head>`;
					html = html.replace('</head>', linkedReplace);
				} else {
					let [js, css] = result.outputFiles;

					html = html
						.replace('</head>', () => `<style>\n${css.text}</style>\n</head>`)
						.replace('</body>', () => `<script>\n${js.text}</script>\n</body>`);
				}

				const dirpath = dirname(options.out);
				try {
					await access(dirpath, constants.R_OK | constants.W_OK);
				} catch {
					mkdir(dirpath);
				}

				await writeFile(options.out, html, { encoding: 'utf8' });
			});
		},
	};
}
