const nxPreset = require('@nrwl/jest/preset');
const path = require('path');

module.exports = {
    ...(nxPreset?.default ?? {}),
    rootDir: __dirname,
    moduleNameMapper: {
        ...(nxPreset?.moduleNameMapper ?? {}),
        /* Handle CSS imports (with CSS modules) https://jestjs.io/docs/webpack#mocking-css-modules */
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: [...(nxPreset?.testPathIgnorePatterns ?? []), '.*/helper.test.ts[x]?$'],
    reporters: ['default', 'jest-junit'],
    collectCoverage: true,
    coverageDirectory: path.join('reports', 'coverage'),
    coverageReporters: ['json', 'lcov', 'text-summary', 'cobertura'],
    collectCoverageFrom: ['**/*.{ts,tsx}'],
    coverageThreshold: {
        global: {
            statements: 100.0,
            branches: 100.0,
            functions: 100.0,
            lines: 100.0,
        },
    },
    globals: {
        ...(nxPreset?.globals ?? {}),
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'node',
    testTimeout: 20 * 1000,
    setupFilesAfterEnv: [...(nxPreset?.setupFiles ?? [])],
};
