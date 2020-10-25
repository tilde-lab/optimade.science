const preprocess = require('svelte-preprocess');

const { dev, legacy } = require('./app.config.js');

module.exports = {
    css: css => {
        css.write('bundle.css', dev);
    },
    preprocess: preprocess({
        sourceMap: dev,
        scss: true,
        postcss: true,
        typescript: true
    }),
    immutable: true,
    legacy,
    dev
};