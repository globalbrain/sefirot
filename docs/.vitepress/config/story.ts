import { type Plugin } from 'vite'
import { type DefaultTheme } from 'vitepress'

export function storyPlugin(): Plugin {
  let themeConfig: DefaultTheme.Config

  return {
    name: 'sefirot-story'
    // configResolved(config) {
    //   themeConfig = (config as any).vitepress.userConfig.themeConfig
    //   if (Array.isArray(themeConfig.sidebar)) {
    //     themeConfig.sidebar.push({
    //       text: 'Storybook',
    //       items: [
    //         { text: 'Introduction', link: '/story/introduction' },
    //         { text: 'Components', link: '/story/components' },
    //         { text: 'Design Tokens', link: '/story/design-tokens' }
    //       ]
    //     })
    //   }
    // },
    // // hotUpdate() {
    // //   if (this.environment.name !== 'client') { return }

    // //   if (Array.isArray(themeConfig.sidebar)) {
    // //     themeConfig.sidebar.push({
    // //       text: 'Test HMR',
    // //       items: [
    // //         { text: 'Introduction', link: '/story/introduction' },
    // //         { text: 'Components', link: '/story/components' },
    // //         { text: 'Design Tokens', link: '/story/design-tokens' }
    // //       ]
    // //     })

    // //     return [this.environment.moduleGraph.getModuleById('/@siteData')!]
    // //   }
    // // }
  }
}
