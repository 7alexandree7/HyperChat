import "dotenv/config"

export const ENV_VARIABLES = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    ORIGIN: process.env.ORIGIN
}

const requiredEnvVariables = [
    'DB_URL',
    'PORT',
    'CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'ORIGIN'
];

requiredEnvVariables.forEach((envVar) => {
    if (!ENV_VARIABLES[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
    }
})