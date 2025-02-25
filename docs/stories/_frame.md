---
layout: false
---

<div id="vp-app" ref="el"></div>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createApp } from 'whyframe:app'
import styles from 'sefirot/styles/bootstrap.css?inline'

const el = ref<HTMLDivElement>()

onMounted(() => {
  if (!el.value || !window.frameElement) return
  createApp(el.value)
  ;(window.frameElement as HTMLIFrameElement).style.visibility = 'visible'
})
</script>

<style scoped>
</style>
