/// <reference types="vite/client" />
/// <reference types="@histoire/plugin-vue/components.d.ts" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __STORY_HOST__: string
declare const __DOCS_HOST__: string
