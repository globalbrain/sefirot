<script setup lang="ts">
import { Icon, IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent } from 'vue'

export interface SIconProps {
  icon: IconifyIcon | DefineComponent
}

defineProps<{
  icon: SIconProps['icon']
}>()
</script>

<template>
  <Icon v-if="typeof icon.body === 'string'" :icon="icon as IconifyIcon" />
  <component v-else :is="icon" />
</template>
