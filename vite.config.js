import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Attempt to solve the datamall problem. But, not working.
// server: {
//   proxy: {
//     '/datamall': {
//       target: 'https://datamall2.mytransport.sg',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/datamall/, ''),
//     },
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-proxy': {
        // the actual API base domain that we want to call
        target: "https://datamall2.mytransport.sg",
        // hcnage the origin of the request to avoid CORS
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-proxy/, ""),
      }
    }
  }
})
