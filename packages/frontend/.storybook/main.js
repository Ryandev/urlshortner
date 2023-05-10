const path = require('path');

module.exports = {
    core: { builder: 'webpack5' },
    stories: [
        path.resolve(__dirname, '..', 'src', 'components', '**', '*.stories.mdx'),
        path.resolve(__dirname, '..', 'src', 'components', '**', '*.stories.@(js|jsx|ts|tsx)'),
        path.resolve(__dirname, '..', 'src', 'pages', '**', '*.stories.mdx'),
        path.resolve(__dirname, '..', 'src', 'pages', '**', '*.stories.@(js|jsx|ts|tsx)'),
    ],
    addons: [
        '@storybook/addon-essentials',
        '@nrwl/react/plugins/storybook',

        'storybook-addon-swc',
        {
            name: 'storybook-addon-next',
            options: {
                nextConfigPath: path.resolve(__dirname, '..', 'next.config.js'),
            },
        },
    ],
    webpackFinal: async (config, { configType }) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                fallback: {
                    ...config.resolve?.fallback,
                    /* Needed for MUI Theme */
                    crypto: require.resolve('crypto-browserify'),
                    stream: require.resolve('stream-browserify'),
                },
            },
        };
    },
};
