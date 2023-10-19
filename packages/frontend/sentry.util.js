const _candidateDSNValues = [
    process.env.FRONTEND_SENTRY_DSN,
    process.env.NEXT_PUBLIC_FRONTEND_SENTRY_DSN,
    process.env.SENTRY_DSN,
];

/* Find value which is not null or zero length */
const _DSNValue = String(_candidateDSNValues.find(x => Boolean(x) && String(x).length > 1));

module.exports = {
    dsn: _DSNValue,
};
