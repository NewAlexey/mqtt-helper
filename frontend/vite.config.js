import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";

dotenv.config();

export default defineConfig({
    define: {
        "process.env": process.env,
    },
    plugins: [
        checker({
            typescript: true,
        }),
        react(),
        svgr(),
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
