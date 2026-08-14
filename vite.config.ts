import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), svgr()],

        base: '/',

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },

        build: {
            target: 'esnext',
            outDir: 'build',
        },

        server: {
            port: 3000,
            open: true,
            host: true,

            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false,

                    configure: (proxy) => {
                        proxy.on('error', (err) => {
                            console.log('Proxy error:', err);
                        });

                        proxy.on('proxyReq', (_, req) => {
                            console.log('→', req.method, req.url);
                        });

                        proxy.on('proxyRes', (proxyRes, req) => {
                            console.log('←', proxyRes.statusCode, req.url);
                        });
                    },
                },
            },
        },
    };
});