import { build } from 'esbuild';
import { derver } from 'derver';
import svelte from 'esbuild-svelte';
import preprocess from 'svelte-preprocess';
import { eslintPlugin } from 'esbuild-plugin-eslinter';
import copy from './copy.js';
import html from './html.js';

const DEV = process.argv.includes('--dev');

build({
	bundle: true,
	entryPoints: ['src/main.ts'],
	outfile: 'dist/build/bundle.js',
	write: DEV,
	minify: !DEV,
	incremental: DEV,
	sourcemap: DEV && 'inline',
	loader: { '.png': 'dataurl' },
	legalComments: 'none',
	logLevel: 'debug',
	mainFields: [
		'svelte',
		'browser',
		'module',
		'main'
	],
	plugins: [
		svelte({
			compileOptions: {
				dev: DEV,
				css: false,
				immutable: true,
				legacy: false
			},
			preprocess: [
				preprocess({
					sourceMap: DEV,
					typescript: true,
					scss: {
						quietDeps: true,
						renderSync: true,
					}
				})
			]

		}),
		eslintPlugin(),
		copy({ from: './src/assets/logo.svg', to: '../logo.svg' }),
		html({ in: 'src/index.html', out: 'dist/index.html', dev: DEV }),
	]

}).then(bundle => {
	DEV && derver({
		dir: 'dist',
		host: 'localhost',
		port: 5555,
		watch: ['dist', 'src'],
		onwatch: async (lr, item) => {
			if (item == 'src') {
				lr.prevent();
				bundle.rebuild().catch(err => lr.error(err.message, 'Svelte compile error'));
			}
		}
	});
}).catch(e => console.log(e.errors));

