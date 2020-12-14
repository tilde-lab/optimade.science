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
        '.js',
        '.mjs',
        '.ts',
        '.svelte',
        '.svg'
    ],
    mainFields: [
        'browser',
        'module',
        'main'
    ],
    legacy: false,
    dev,
};