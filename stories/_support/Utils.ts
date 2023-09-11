import { type App } from 'vue'
import { createMemoryHistory, createRouter, routerKey } from 'vue-router'

export function setupRouter({ app }: { app: App }) {
  app.provide(routerKey, createRouter({
    history: createMemoryHistory(),
    routes: [{
      path: '/',
      component: { render: () => null }
    }]
  }))
}
