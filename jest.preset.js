const nxPreset = require('@nrwl/jest/preset');

module.exports = {
    ...(nxPreset?.default ?? {}),
    moduleNameMapper: {
        ...(nxPreset?.moduleNameMapper ?? {}),
        /* Handle CSS imports (with CSS modules) https://jestjs.io/docs/webpack#mocking-css-modules */
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    // transform: {
    //     ...(nxPreset?.transform ?? {}),
    //     '^.+\\.[tj]sx?$': 'ts-jest',
    // },
    // transform: {
    //     /* Use babel-jest to transpile tests with the next/babel preset
    //        https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    //     '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    // },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testPathIgnorePatterns: [...(nxPreset?.testPathIgnorePatterns ?? []), '.*/helper.test.ts[x]?$'],
    reporters: ['default', 'jest-junit'],
    collectCoverage: true,
    coverageDirectory: './reports/coverage',
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
    testTimeout: 10000,
    setupFilesAfterEnv: [...(nxPreset?.setupFiles ?? [])],
};
