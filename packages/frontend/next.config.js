// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
    /* Ref: https://github.com/nrwl/nx/issues/15214 */
    // distDir: ['..', '..', 'dist', 'packages', 'frontend', '.next'].join(path.sep),

    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
};

// @ts-ignore
module.exports = withNx(nextConfig);
