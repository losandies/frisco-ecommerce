import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "127.0.0.1",
        strictPort: true,
        port: 5173,
        proxy: {
            "/api": {
                target: `http://127.0.0.1:${process.env.PORT || 5001}`,
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        rolldownOptions: {
            output: {
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name]-[hash].js",

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
                        return "assets/[name]-[hash][extname]";
                    }

                    if (/\.css$/.test(name ?? "")) {
                        return "assets/css/[name]-[hash][extname]";
                    }

                    // default value
                    // ref: https://rollupjs.org/guide/en/#outputassetfilenames
                    return "assets/[name]-[hash][extname]";
                },
            },
        },
    },
});
