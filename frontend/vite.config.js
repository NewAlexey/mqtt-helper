import { defineConfig } from "vite";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    define: {
        'process.env': process.env,
    },
    server: {
        port: process.env.FRONTEND_PORT,
    },
});