import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import MarkdownIt from 'markdown-it'

declare module '@nuxt/types' {
  interface Context {
    $md: MarkdownIt
  }
  interface NuxtAppOptions {
    $md: MarkdownIt
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt
  }
}

export default defineNuxtPlugin((_, inject) => {
  const md = new MarkdownIt({
    linkify: true,
    breaks: true
  })

  inject('md', md)
})
