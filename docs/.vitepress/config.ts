import { defineConfig, type DefaultTheme } from 'vitepress'
import { baseConfig } from '../../config/vite'

function getStoryHost(): string {
  if (process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL) {
    return new URL(process.env.DEPLOY_PRIME_URL).host.replace('-docs', '-story')
  }
  return 'story.sefirot.globalbrains.com'
}

export default defineConfig({
  lang: 'en-US',
  title: 'Sefirot',
  description: 'Vue Components for Global Brain Design System.',

  cleanUrls: true,
  lastUpdated: true,

  vite: {
    ...baseConfig as any,
    define: {
      __STORY_HOST__: JSON.stringify(getStoryHost())
    }
  },

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/globalbrain/sefirot/edit/main/docs/:path'
    },

    nav: [
      { text: 'Playground', link: `https://${getStoryHost()}` },
    ],

    outline: [2, 3],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/globalbrain/sefirot' }
    ],

    sidebar: sidebar()
  },

  postRender(context) {
    const html = context.teleports?.['#sefirot-modals'] || ''
    context.teleports = {
      ...context.teleports,
      body: (context.teleports?.['body'] || '') + `<div id="sefirot-modals">${html}</div>`
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
        { text: 'SAlert', link: '/components/alert' },
        { text: 'SAvatar', link: '/components/avatar' },
        { text: 'SAvatarStack', link: '/components/avatar-stack' },
        { text: 'SButton', link: '/components/button' },
        { text: 'SButtonGroup', link: '/components/button-group' },
        { text: 'SCard', link: '/components/card' },
        { text: 'SContent', link: '/components/content' },
        { text: 'SControl', link: '/components/control' },
        { text: 'SDesc', link: '/components/desc' },
        { text: 'SDivider', link: '/components/divider' },
        { text: 'SDoc', link: '/components/doc' },
        { text: 'SErrorBoundary', link: '/components/error-boundary' },
        { text: 'SFragment', link: '/components/fragment' },
        { text: 'SGrid', link: '/components/grid' },
        { text: 'SHead', link: '/components/head' },
        { text: 'SIndicator', link: '/components/indicator' },
        { text: 'SInputAddon', link: '/components/input-addon' },
        { text: 'SInputCheckbox', link: '/components/input-checkbox' },
        { text: 'SInputCheckboxes', link: '/components/input-checkboxes' },
        { text: 'SInputFile', link: '/components/input-file' },
        { text: 'SInputFileUpload', link: '/components/input-file-upload' },
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
        { text: 'SLocalNav', link: '/components/local-nav' },
        { text: 'SLoginPage', link: '/components/login-page' },
        { text: 'SM', link: '/components/m' },
        { text: 'SPill', link: '/components/pill' },
        { text: 'SState', link: '/components/state' },
        { text: 'STable', link: '/components/table' },
        { text: 'STooltip', link: '/components/tooltip' },
        { text: 'SW', link: '/components/w' }
      ]
    },
    {
      text: 'Composables',
      collapsed: false,
      items: [
        { text: 'Api', link: '/composables/api' },
        { text: 'Image', link: '/composables/image' },
        { text: 'Power', link: '/composables/power' },
        { text: 'Url', link: '/composables/url' },
        { text: 'Utils', link: '/composables/utils' }
      ]
    },
    {
      text: 'Network Requests',
      collapsed: false,
      items: [
        { text: 'Http', link: '/network-requests/http' }
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
