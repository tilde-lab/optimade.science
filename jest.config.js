const {
    extensions: moduleFileExtensions,
} = require('./app.config.js');

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