const coverage = {
    statements: 0,
    branches: 0,
    functions: 0,
    lines: 0,
};
const subPath = __dirname.split('/').slice(-2).join('/');

export default Object.freeze({
    preset: '../../jest.preset.js',
    rootDir: __dirname,
    displayName: __dirname.split('/').pop() ?? 'unknown',
    reporters: ['default', ['jest-junit', { outputDirectory: `reports/test/${subPath}` }]],
    coverageDirectory: `../../reports/coverage/${subPath}`,
    coverageThreshold: {
        global: coverage,
    },

    /* overrides */
    transform: {
        /* Use babel-jest to transpile tests with the next/babel preset
           https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
    testEnvironment: 'jsdom',
});

// const nxPreset = require('@nrwl/jest/preset');

// export default {
//     ...nxPreset.default,
//     testMatch: [
//         '<rootDir>/**/*.(test).{js,jsx,ts,tsx}',
//         '<rootDir>/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
//     ],
//     displayName: 'frontend',
//     // preset: '@nrwl/jest/preset',
//     transform: {
//         '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
//         '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
//     },
//     coverageDirectory: '../../coverage/packages/frontend',
//     setupFiles: [],
// };
