<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

if (import.meta.env.DEV) {
  const target = document.getElementById('sefirot-modals')
  if (!target) {
    const div = document.createElement('div')
    div.id = 'sefirot-modals'
    document.body.appendChild(div)
  }
}
</script>

<template>
  <DefaultTheme.Layout />
</template>
