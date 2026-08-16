export const ENV_VARIABLES = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT
}

const requiredEnvVariables = [
    'DB_URL',
    'PORT'
];

requiredEnvVariables.forEach((envVar) => {
    if (!Env_VARIABLES[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
    }
})