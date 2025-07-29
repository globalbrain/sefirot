<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  href?: string | null
  external?: boolean | null
}>(), {
  external: null
})

const OUTBOUND_REGEX = /^[a-z]+:/i

const isExternal = computed(() => {
  if (!props.href) {
    return false
  }

  if (props.external != null) {
    return props.external
  }

  return OUTBOUND_REGEX.test(props.href)
})

const component = computed(() => {
  if (!props.href) {
    return 'span'
  }

  return isExternal.value ? 'a' : 'router-link'
})

const target = computed(() => isExternal.value ? '_blank' : null)
const rel = computed(() => isExternal.value ? 'noopener noreferrer' : null)
</script>

<template>
  <component
    :is="component"
    class="SLink"
    :class="{ link: href }"
    :href
    :to="href"
    :target
    :rel
  >
    <slot />
  </component>
</template>
