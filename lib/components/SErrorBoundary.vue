<script setup lang="ts">
import { onErrorCaptured, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  (e: 'error', value: any): void
}>()

const error = shallowRef<Error>()

onErrorCaptured((e) => {
  if (import.meta.env.DEV) {
    console.error(e)
  }
  if (!import.meta.env.SSR) {
    error.value = e
    emit('error', e)
    return false
  }
})

async function clearError(options: { redirect?: string } = {}) {
  if (options.redirect) {
    await useRouter().replace(options.redirect)
  }
  error.value = undefined
}
</script>

<template>
  <slot v-if="error != null" name="error" :error="error" :clear-error="clearError" />
  <slot v-else />
</template>
