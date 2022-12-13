
//Init the .env file config vars.
import * as dotenv from "dotenv";

dotenv.config();

const config = {
    environnement: process.env.ENVIRONNEMENT || "development",
    isProduction: process.env.ENVIRONNEMENT === 'production',
    isStaging: process.env.ENVIRONNEMENT === 'staging',
    isDevelopment: process.env.ENVIRONNEMENT === 'development',
    port: process.env.PORT ?? 3999,
};

export default config;