import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'CASHFLOW_BASEURL': JSON.stringify('https://open-api.delcom.org/api/v1'),
    'AUTH_BASEURL': JSON.stringify('https://open-api.delcom.org/api/v1/auth') // URL khusus Auth
  }
})