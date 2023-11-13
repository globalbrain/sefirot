import { type DefaultTheme, defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Sefirot',
  description: 'Vue Components for Global Brain Design System.',

  cleanUrls: true,
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
      pattern: 'https://github.com/globalbrain/sefirot/edit/main/docs/:path'
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

function sidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Styles',
      collapsed: false,
      items: [
        { text: 'Colors', link: '/styles/colors' },
        { text: 'Shared Input Styles', link: '/styles/input-styles' },
        { text: 'Utility Classes', link: '/styles/utility-classes' }
      ]
    },
    {
      text: 'Components',
      collapsed: false,
      items: [
        { text: 'SActionList', link: '/components/action-list' },
        { text: 'SAvatar', link: '/components/avatar' },
        { text: 'SButton', link: '/components/button' },
        { text: 'SButtonGroup', link: '/components/button-group' },
        { text: 'SCard', link: '/components/card' },
        { text: 'SContent', link: '/components/content' },
        { text: 'SDesc', link: '/components/desc' },
        { text: 'SFragment', link: '/components/fragment' },
        { text: 'SGrid', link: '/components/grid' },
        { text: 'SHead', link: '/components/head' },
        { text: 'SInputAddon', link: '/components/input-addon' },
        { text: 'SInputCheckbox', link: '/components/input-checkbox' },
        { text: 'SInputCheckboxes', link: '/components/input-checkboxes' },
        { text: 'SInputFile', link: '/components/input-file' },
        { text: 'SInputHMS', link: '/components/input-hms' },
        { text: 'SInputImage', link: '/components/input-image' },
        { text: 'SInputNumber', link: '/components/input-number' },
        { text: 'SInputRadios', link: '/components/input-radios' },
        { text: 'SInputSelect', link: '/components/input-select' },
        { text: 'SInputSegments', link: '/components/input-segments' },
        { text: 'SInputSwitch', link: '/components/input-switch' },
        { text: 'SInputTextarea', link: '/components/input-textarea' },
        { text: 'SInputYMD', link: '/components/input-ymd' },
        { text: 'SLink', link: '/components/link' },
        { text: 'SM', link: '/components/m' },
        { text: 'SPill', link: '/components/pill' },
        { text: 'SState', link: '/components/state' },
        { text: 'STable', link: '/components/table' },
        { text: 'STooltip', link: '/components/tooltip' },
        { text: 'SW', link: '/components/w' },
      ]
    },
    {
      text: 'Composables',
      collapsed: false,
      items: [
        { text: 'Image', link: '/composables/image' },
        { text: 'Utils', link: '/composables/utils' }
      ]
    },
    {
      text: 'Validation',
      collapsed: false,
      items: [
        { text: 'Validators', link: '/validation/validators' }
      ]
    },
    {
      text: 'Support',
      collapsed: false,
      items: [
        { text: 'Day', link: '/support/day' },
        { text: 'File', link: '/support/file' },
        { text: 'Num', link: '/support/num' },
        { text: 'Time', link: '/support/time' },
        { text: 'Utils', link: '/support/utils' }
      ]
    }
  ]
}
