import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Gunakan URL dari dokumentasi Anda
    'CASHFLOW_BASEURL': JSON.stringify('https://open-api.delcom.org/api/v1')
  }
})