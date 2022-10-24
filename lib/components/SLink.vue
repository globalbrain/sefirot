<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  href: { type: String, default: null }
})

const OUTBOUND_REGEX = /^[a-z]+:/i

const isExternal = computed(() => OUTBOUND_REGEX.test(props.href))

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
    :href="href"
    :to="href"
    :target="target"
    :rel="rel"
  >
    <slot />
  </component>
</template>
