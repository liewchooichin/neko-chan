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
//     cors: false,
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
