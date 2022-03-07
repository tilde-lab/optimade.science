const { dev } = require('./app.config.js');

module.exports = {
	map: dev,
	plugins: [
		require('postcss-url')(),
		require('postcss-easy-import')({
			prefix: '_',
			extensions: ['.scss', '.css']
		}),
		require('postcss-preset-env'),
		require('postcss-flexbugs-fixes'),
		!dev && require('autoprefixer'),
	]
};
