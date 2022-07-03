import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/resources/js',
            '~': '/resources/js/Components',
        },
    },
    plugins: [
        eslint(),
        laravel(['resources/js/app.ts', 'resources/css/app.css']),
        {
            name: 'blade',
            handleHotUpdate({ file, server }) {
                if (file.endsWith('.blade.php')) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*',
                    });
                }
            },
        },
    ],
});
