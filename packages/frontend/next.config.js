const path = require('node:path');
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { withSentryConfig } = require('@sentry/nextjs');
const { dsn } = require('./sentry.util');

const CONFIG_WEBPACK_SENTRY = {
    silent: true,
    org: 'ryandev',
    project: 'urlshortner-frontend',
};

/* Ref: https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/ */
const CONFIG_SETTINGS_SENTRY = {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
};

const nextConfig = {
    /* Ref: https://github.com/nrwl/nx/issues/15214 */
    distDir: ['..', '..', 'dist', 'packages', 'frontend', '.next'].join(path.sep),
    eslint: {
        ignoreDuringBuilds: true,
    },
    nx: {
        svgr: false,
    },
    publicRuntimeConfig: {
        SENTRY_DSN: dsn,
        NEXT_PUBLIC_SENTRY_DSN: dsn,
    },
};

if (nextConfig.publicRuntimeConfig?.length <= 0) {
    throw new Error('Invalid SentryDSN value. Missing!');
}

const modifiers = [
    configIn => withNx(configIn),
    /* Must be last such that any source-map changes are reflected in Sentry */
    configIn => withSentryConfig(configIn, CONFIG_WEBPACK_SENTRY, CONFIG_SETTINGS_SENTRY),
    /* Add ENV */
    configIn => ({
        ...configIn,
        env: {
            SENTRY_DSN: dsn,
            NEXT_PUBLIC_SENTRY_DSN: dsn,
        },
    }),
];

module.exports = modifiers.reduce((configIn, modifier) => modifier(configIn), nextConfig);
