require('dotenv').config()

export default {
  env: {
    app_env: process.env.APP_ENV
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],

    link: [
      { rel: 'icon', href: '/favicon-32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: 'rgb(0, 0, 0)' },
      { rel: 'stylesheet', href: process.env.ADOBE_TYPEKIT },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inconsolata&display=swap' }
    ]
  },

  css: [
    'normalize.css',
    '@/assets/styles/bootstrap.css'
  ],

  modules: [
    '@nuxtjs/dotenv'
  ],

  loading: false
}
