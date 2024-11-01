import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv("all", process.cwd());

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/": {
                target:
                    env.VITE_ENV === "dev"
                        ? env.VITE_APU_URL_DEV
                        : env.VITE_APU_URL_PROD,
                changeOrigin: true,
            },
        },
    },
});
