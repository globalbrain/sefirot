<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

if (import.meta.env.DEV) {
  const target = document.getElementById('sefirot-modals')
  if (!target) {
    const el = document.createElement('div')
    el.id = 'sefirot-modals'
    document.body.appendChild(el)
  }
}
</script>

<template>
  <DefaultTheme.Layout />
</template>
