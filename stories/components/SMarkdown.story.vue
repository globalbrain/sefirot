<script setup lang="ts">
import SMarkdown from 'sefirot/components/SMarkdown.vue'
</script>

<template>
  <Story title="Components/SMarkdown">
    <SMarkdown
      class="markdown"
      content="**We** shape our **buildings**. Thereafter, **they** shape **us**."
    />
  </Story>
</template>

<style scoped>
.markdown {
  line-height: 24px;
  font-size: 16px;
}

.markdown :deep(strong) {
  font-weight: 600;
}
</style>
