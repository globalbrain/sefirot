import { resolve } from 'node:path'
import { defineRoutes } from 'vitepress'

export default defineRoutes({
  paths(watchedFiles) {
    return watchedFiles.map((file) => ({
      params: {
        id: normalizePath(file),
        title: getTitle(file)
      },
      content: `\
<Comp />

<script setup lang="ts">
import Comp from '/@fs/${resolve(file)}'
</script>
`
    }))
  },
  watch: './components/*.story.vue'
})

function normalizePath(path: string): string {
  return path
    .replace(/\\/g, '/')
    .replace(/[A-Z]/g, '-$&')
    .toLowerCase()
    .slice(27, -10)
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
}

function getTitle(path: string): string {
  return path
    .split('/')
    .pop()
    ?.replace('.story.vue', '')
    .replace(/[^a-z]+/gi, ' - ') ?? ''
}
