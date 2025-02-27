import { whyframe } from '@whyframe/core'
import { whyframeVue } from '@whyframe/vue'
import { type PluginOption } from 'vite'
import { type DefaultTheme, type SiteConfig } from 'vitepress'

export function storyPlugin(): PluginOption {
  let themeConfig: DefaultTheme.Config

  return [
    {
      name: 'sefirot-story',
      configResolved(config) {
        const siteConfig = ((config as any).vitepress as SiteConfig)
        const stories = siteConfig.dynamicRoutes.filter((page) => page.route === 'stories/[id].md')
          .map((page) => ({ text: page.params.title, link: `/${page.path.slice(0, -3)}` }))
        // console.log('stories', stories)
        siteConfig.userConfig.themeConfig.sidebar = {
          '/': [...siteConfig.userConfig.themeConfig.sidebar],
          '/stories/': stories
        }
        // themeConfig = (config as any).vitepress.userConfig.themeConfig
        // if (Array.isArray(themeConfig.sidebar)) {
        //   themeConfig.sidebar.push({
        //     text: 'Storybook',
        //     items: [
        //       { text: 'Introduction', link: '/stories/introduction' },
        //       { text: 'Components', link: '/stories/components' },
        //       { text: 'Design Tokens', link: '/stories/design-tokens' }
        //     ]
        //   })
        // }
      }
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
