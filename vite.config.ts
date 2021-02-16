import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  alias: {
    '@/': `${path.resolve(__dirname, 'src')}/`,
  },
  plugins: [
    vue(),
    ...WindiCSS(),
    Pages(),
    ViteComponents({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    VitePWA({
      inlineRegister: false,
      manifest: {
        name: 'Jeu',
        short_name: 'jeu',
        theme_color: '#121212',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
