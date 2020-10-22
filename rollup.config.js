import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import importResolver from 'rollup-plugin-import-resolver';
import visualizer from 'rollup-plugin-visualizer';
import html from 'rollup-plugin-bundle-html-thomzz';
import svg from 'rollup-plugin-inline-svg';

const {
	dev,
	name,
	alias,
	input,
	legacy,
	output,
	extensions,
} = require('./app.config.js');

const svelteConfig = require('./svelte.config.js');

export default {
	input,
	output: {
		inlineDynamicImports: true,
		file: `${output}/bundle.js`,
		sourcemap: dev,
		format: 'iife',
		name,
	},
	plugins: [
		svelte(svelteConfig),
		svg(),
		json(),
		importResolver({ extensions, alias, }),
		resolve({ browser: true, dedupe: ['svelte'], extensions, }),
		commonjs({ sourceMap: dev, }),
		typescript({ sourceMap: dev, inlineSources: dev, }),
		!dev && legacy && babel({
			extensions,
			babelHelpers: 'runtime',
			exclude: ['node_modules/@babel/**'],
			presets: [
				['@babel/preset-env', {
					useBuiltIns: 'usage',
					corejs: 3,
				}],
			],
			plugins: [
				'@babel/plugin-proposal-optional-chaining',
				['@babel/plugin-transform-runtime', {
					useESModules: true,
				}],
			],
		}),
		!dev && terser(),
		!dev && visualizer({ filename: `${output}/stats.html`, }),
		html({
			template: 'src/index.html',
			dest: output,
			clean: !dev,
			inline: !dev,
			minifyCss: !dev,
		}),
		dev && serve(),
		dev && livereload(output),
	],
	watch: { clearScreen: false, }
};

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--single', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}
