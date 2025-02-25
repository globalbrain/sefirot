import { defineRoutes } from 'vitepress'

export default defineRoutes({
  paths(watchedFiles) {
    return watchedFiles.map((file) => ({
      params: {
        id: normalizePath(file)
      },
      content: `\
<Comp />

<script setup lang="ts">
import Comp from '../../${file}'
</script>
`
    }))
  },
  watch: 'stories/components/**/*.story.vue'
})

function normalizePath(path: string): string {
  return path
    .replace(/\\/g, '/')
    .replace(/[A-Z]/g, '-$&')
    .toLowerCase()
    .slice(22, -10)
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
}
