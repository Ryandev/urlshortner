import path = require('path');

const coverage = {
    statements: 0,
    branches: 0,
    functions: 0,
    lines: 0,
};
const packageName = __dirname.split(path.sep).slice(-1).join(path.sep);

export default Object.freeze({
    preset: path.join('..', '..', 'jest.preset.js'),
    rootDir: __dirname,
    displayName: __dirname.split('/').pop() || 'unknown',
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: path.join('reports', 'test', packageName) }],
    ],
    coverageDirectory: path.join('..', '..', 'reports', 'coverage', packageName),
    coverageThreshold: {
        global: coverage,
    },
});
