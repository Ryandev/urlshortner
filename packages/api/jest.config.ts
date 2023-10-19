import { Config } from 'jest';
import * as path from 'path';

const coverage: Readonly<Required<Required<Config>['coverageThreshold']['global']>> =
    Object.freeze({
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
    });

const packageName = __dirname.split(path.sep).slice(-1).join(path.sep) || 'unknown';

const config: Partial<Config> = {
    maxConcurrency: 1,
    setupFiles: ['<rootDir>/jest.setup.js'],
    preset: ['..', '..', 'jest.preset.js'].join(path.sep),
    rootDir: __dirname,
    displayName: packageName,
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: path.join('reports', 'test', packageName) }],
    ],
    coverageDirectory: path.join('..', '..', 'reports', 'coverage', packageName),
    coverageThreshold: {
        global: coverage,
    },
};

export default config;
