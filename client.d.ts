/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue3" />
/// <reference path="shared.d.ts" />

// this file contains public types which are exposed to external modules

declare module 'v-calendar' {
  export type * from 'v-calendar/dist/types/src/index.d.ts'
  export type { default } from 'v-calendar/dist/types/src/index.d.ts'
}
