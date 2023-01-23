/* reference: https://github.com/GoogleChrome/lighthouse/blob/v5.5.0/lighthouse-core/config/default-config.js#L375-L407 */

module.exports = {
    ci: {
        collect: {
            staticDistDir: '.',
            isSinglePageApplication: false,
            numberOfRuns: 3,
            settings: {
                output: ['html'],
                useThrottling: 'false',
            },
        },
        upload: {},
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                'categories:accessibility': [
                    'error',
                    {
                        minScore: 0.9,
                    },
                ],
                'categories:best-practices': [
                    'error',
                    {
                        minScore: 0.9,
                    },
                ],
                'categories:seo': [
                    'error',
                    {
                        minScore: 0.9,
                    },
                ],
            },
        },
    },
};
