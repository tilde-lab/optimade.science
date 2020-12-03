const preprocess = require('svelte-preprocess');

const { dev, legacy } = require('./app.config.js');

module.exports = {
    compilerOptions: {
        immutable: true,
        legacy,
        dev
    },
    preprocess: preprocess({
        sourceMap: dev,
        scss: true,
        postcss: true,
        typescript: true
    }),
};