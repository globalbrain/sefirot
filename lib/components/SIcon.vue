<template>
  <Icon :icon="icon" />
</template>

<script setup lang="ts">
import { Icon, IconifyIcon } from '@iconify/vue/dist/offline'

defineProps<{ icon: IconifyIcon }>()
</script>
