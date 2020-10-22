const dev = !!process.env.ROLLUP_WATCH;

module.exports = {
    name: 'app',
    input: 'src/main.ts',
    output: 'dist',
    alias: {
        '@': './src',
        '@/*': './src/*'
    },
    extensions: [
        'mjs',
        'js',
        'ts',
        'svelte',
        'svg'
    ],
    legacy: false,
    dev,
};