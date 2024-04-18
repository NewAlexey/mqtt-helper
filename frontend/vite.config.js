import { defineConfig } from "vite";
import dotenv from "dotenv";
import checker from "vite-plugin-checker";

dotenv.config();

export default defineConfig({
    define: {
        "process.env": process.env,
    },
    plugins: [
        checker({
            typescript: true,
        }),
    ],
    server: {
        port: process.env.FRONTEND_PORT,
    },
    resolve: {
        alias: {
            src: "/src",
        },
    },
});
