import path = require('path');

const coverage = Object.freeze({
    statements: 0,
    branches: 0,
    functions: 0,
    lines: 0,
});
const packageName = __dirname.split(path.sep).slice(-1).join(path.sep);

export default {
    rootDir: __dirname,
    preset: ['..', '..', 'jest-preset.js'].join(path.sep),
    displayName: packageName || 'unknown',
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: path.join('reports', 'test', packageName) }],
    ],
    coverageDirectory: path.join('..', '..', 'reports', 'coverage', packageName),
    coverageThreshold: {
        global: coverage,
    },
};
