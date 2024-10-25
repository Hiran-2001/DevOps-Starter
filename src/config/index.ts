import dotenv from 'dotenv'

dotenv.config();


export const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
    logLevel: process.env.LOG_LEVEL || 'info',
} as const;