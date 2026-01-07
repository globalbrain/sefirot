/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue3" />

// this file contains public types which are exposed to external modules

interface NumberConstructor {
  isFinite(value: unknown): value is number
  isInteger(value: unknown): value is number
}
