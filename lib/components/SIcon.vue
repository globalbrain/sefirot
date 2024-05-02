<script setup lang="ts">
import { Icon, type IconifyIcon } from '@iconify/vue/dist/offline'
import { type DefineComponent } from 'vue'

defineProps<{
  icon: IconifyIcon | DefineComponent
}>()
</script>

<template>
  <Icon v-if="typeof icon.body === 'string'" :icon="(icon as IconifyIcon)" />
  <component v-else :is="icon" />
</template>
