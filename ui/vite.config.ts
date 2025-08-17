import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/volatility': {
        target: 'https://www.deribit.com',
        changeOrigin: true,
        rewrite: (path) => {
          const url = new URL(path, 'http://localhost');
          const currency = url.searchParams.get('currency') || 'ETH';
          const days = parseInt(url.searchParams.get('days') || '30');
          const resolution = url.searchParams.get('resolution') || '86400';

          const endTimestamp = Date.now();
          const startTimestamp = endTimestamp - (days * 24 * 60 * 60 * 1000);

          return `/api/v2/public/get_volatility_index_data?currency=${currency}&start_timestamp=${startTimestamp}&end_timestamp=${endTimestamp}&resolution=${resolution}`;
        },
        secure: true,
      },
    },
  },
})
