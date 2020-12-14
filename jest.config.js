const { extensions } = require('./app.config.js');

const moduleFileExtensions = extensions.map(ext => ext.substring(1));

module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.svelte$': [
            'svelte-jester',
            {
                preprocess: true
            }
        ],
        '^.+\\.ts$': 'ts-jest'
    },
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect'
    ],
    moduleFileExtensions,
};