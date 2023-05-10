import { type Vue3StorySetupHandler } from '@histoire/plugin-vue'
import { createMemoryHistory, createRouter, routerKey } from 'vue-router'

export function setupRouter({ app }: Parameters<Vue3StorySetupHandler>[number]) {
  app.provide(routerKey, createRouter({
    history: createMemoryHistory(),
    routes: [{
      path: '/',
      component: { render: () => null }
    }]
  }))
}
