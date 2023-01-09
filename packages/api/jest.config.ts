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
});
