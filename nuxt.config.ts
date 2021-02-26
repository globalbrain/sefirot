import { NuxtConfig } from '@nuxt/types'
import { highlight } from './docs/markdown/Highlight'
import { preWrapper } from './docs/markdown/PreWrapper'

require('dotenv').config()

const config: NuxtConfig = {
  target: 'static',

  ssr: false,

  srcDir: 'docs/',

  build: {
    transpile: ['@juggle/resize-observer'],

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-custom-properties': {}
      }
    },

    extractCSS: process.env.NODE_ENV === 'production'
  },

  buildModules: ['@nuxt/typescript-build'],

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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700|Inconsolata&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,500;1,400;1,500&display=swap' }
    ]
  },

  css: [
    'normalize.css',
    '@/assets/styles/bootstrap.css'
  ],

  modules: [
    ['@nuxtjs/dotenv', { path: __dirname }],
    '@nuxtjs/composition-api',
    '@nuxtjs/markdownit',
    '@nuxtjs/google-analytics'
  ],

  plugins: [
    { src: '@/plugins/portal-vue' },
    { src: '@/plugins/v-calendar', mode: 'client' }
  ],

  loading: false,

  markdownit: {
    highlight,
    use: [preWrapper]
  },

  googleAnalytics: {
    id: 'UA-122636981-4',
    debug: {
      sendHitTask: process.env.NODE_ENV === 'production'
    }
  }
}

export default config
