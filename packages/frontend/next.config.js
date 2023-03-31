const { withNx } = require('@nrwl/next/plugins/with-nx');
const { withSentryConfig } = require('@sentry/nextjs');
const nextConfig = {
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    publicRuntimeConfig: {
        SentryDSN: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
};

const modifiers = [
    configIn => withNx(configIn),
    /* Must be last such that any source-map changes are reflected in Sentry */
    configIn =>
        withSentryConfig(configIn, {
            // Additional config options for the Sentry Webpack plugin. Keep in mind that
            // the following options are set automatically, and overriding them is not
            // recommended:
            //   release, url, org, project, authToken, configFile, stripPrefix,
            //   urlPrefix, include, ignore
            silent: true, // Suppresses all logs
            // For all available options, see:
            // https://github.com/getsentry/sentry-webpack-plugin#options.
        }),
];

module.exports = modifiers.reduce((configIn, modifier) => modifier(configIn), nextConfig);
