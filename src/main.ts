import routes from 'pages-generated'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import './styles/index.css'
import 'windi.css'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  },
)
