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
        scss: {
            prependData: `
                @import './node_modules/spectre.css/src/variables';
                @import './node_modules/spectre.css/src/mixins';
            `,
        },
        postcss: true,
        typescript: true
    }),
};