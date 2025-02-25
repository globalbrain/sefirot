import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'
import { type PluginOption } from 'vite'
import { type DefaultTheme } from 'vitepress'

export function storyPlugin(): PluginOption {
  let themeConfig: DefaultTheme.Config

  return [
    {
      name: 'sefirot-story'
      // configResolved(config) {
      //   themeConfig = (config as any).vitepress.userConfig.themeConfig
      //   if (Array.isArray(themeConfig.sidebar)) {
      //     themeConfig.sidebar.push({
      //       text: 'Storybook',
      //       items: [
      //         { text: 'Introduction', link: '/stories/introduction' },
      //         { text: 'Components', link: '/stories/components' },
      //         { text: 'Design Tokens', link: '/stories/design-tokens' }
      //       ]
      //     })
      //   }
      // },
      // hotUpdate() {
      //   if (this.environment.name !== 'client') { return }

      //   if (Array.isArray(themeConfig.sidebar)) {
      //     themeConfig.sidebar.push({
      //       text: 'Test HMR',
      //       items: [
      //         { text: 'Introduction', link: '/stories/introduction' },
      //         { text: 'Components', link: '/stories/components' },
      //         { text: 'Design Tokens', link: '/stories/design-tokens' }
      //       ]
      //     })

      //     return [this.environment.moduleGraph.getModuleById('/@siteData')!]
      //   }
      // }
    },
    whyframe({ defaultSrc: '/stories/_frame', components: [{ name: 'Story' }] }),
    whyframeVue({ include: /\.(?:vue|md)$/ })
  ]
}
