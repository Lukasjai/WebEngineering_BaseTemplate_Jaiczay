import { defineConfig } from 'vite';

export default defineConfig({
    base: '/WebEngineering_BaseTemplate_Jaiczay_Vite_Project/',
    build: {
        rollupOptions: {
            input: './index.html',
        },
    },
});