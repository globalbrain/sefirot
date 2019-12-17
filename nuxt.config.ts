import { Configuration } from '@nuxt/types'
import MarkdownItHighlight from 'markdown-it-highlight'

require('dotenv').config()

const config: Configuration = {
  env: {
    app_env: process.env.APP_ENV ?? 'local'
  },

  srcDir: 'docs/',

  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-css-variables': {},
      }
    }
  },

  head: {
    titleTemplate: '%s | Sefirot',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'yMPlObazxr4NRELSI_8Cxz-Qtejfr5Bypvxstk8ZULQ' }
    ],

    link: [
      { rel: 'icon', href: '/favicon-32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: 'rgb(0, 0, 0)' },
      { rel: 'stylesheet', href: process.env.ADOBE_TYPEKIT },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Inconsolata&display=swap' }
    ]
  },

  css: [
    'normalize.css',
    '@/assets/styles/bootstrap.css'
  ],

  modules: [
    ['@nuxtjs/dotenv', { path: __dirname }],
    '@nuxtjs/markdownit',
    '@nuxtjs/google-analytics'
  ],

  plugins: [
    '@/plugins/vuelidate.js',
    { src: '@/plugins/v-calendar.js', ssr: false },
    '@/plugins/portal-vue.js'
  ],

  loading: false,

  markdownit: {
    use: [MarkdownItHighlight]
  },

  googleAnalytics: {
    id: 'UA-122636981-4',
    debug: {
      sendHitTask: process.env.NODE_ENV === 'production'
    }
  }
}

export default config
