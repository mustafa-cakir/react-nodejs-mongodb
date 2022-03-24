const {
    PORT,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
    REFRESH_TOKEN_COOKIE_MAX_AGE_MS,
    DATABASE_URI,
} = process.env || {};

const ENV = {
    port: PORT,
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    refreshTokenSecret: REFRESH_TOKEN_SECRET,
    accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    refreshTokenExpiration: REFRESH_TOKEN_EXPIRATION,
    refreshTokenCookieMaxAgeMs: REFRESH_TOKEN_COOKIE_MAX_AGE_MS,
    databasesUri: DATABASE_URI,
};

export default ENV;
