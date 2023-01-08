import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Sefirot',
  description: 'Vue Components for Global Brain Design System.',

  cleanUrls: 'without-subfolders',
  lastUpdated: true,

  vite: {
    resolve: {
      alias: {
        'sefirot/': new URL('../../lib/', import.meta.url).pathname
      }
    }
  },

  themeConfig: {
    outline: [2, 3],

    editLink: {
      pattern: 'https://github.com/globalbrain/sefirot/edit/master/docs/:path'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/globalbrain/sefirot' }
    ],

    sidebar: {
      '/': sidebar(),
      'components': sidebar()
    }
  }
})

function sidebar() {
  return [
    {
      text: 'Styles',
      items: [
        { text: 'Shared Input Styles', link: '/styles/input-styles' }
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'SAvatar', link: '/components/avatar' },
        { text: 'SButton', link: '/components/button' },
        { text: 'SInputSelect', link: '/components/input-select' },
        { text: 'SPill', link: '/components/pill' }
      ]
    },
    {
      text: 'Composables',
      items: [
        { text: 'Utils', link: '/composables/utils' }
      ]
    },
    {
      text: 'Helpers',
      items: [
        { text: 'File', link: '/helpers/file' },
        { text: 'Num', link: '/helpers/num' },
        { text: 'Time', link: '/helpers/time' },
        { text: 'Utils', link: '/helpers/utils' }
      ]
    }
  ]
}
