/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue3" />

// this file contains public types which are exposed to external modules

declare module 'v-calendar' {
  export * from 'v-calendar/dist/types/src/index.d.ts'
  export { default } from 'v-calendar/dist/types/src/index.d.ts'
}

interface NumberConstructor {
  isFinite(value: unknown): value is number
}
