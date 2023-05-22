<script setup lang="ts">
import IconArrowsInLineVertical from '@iconify-icons/ph/arrows-in-line-vertical-bold'
import IconArrowsOutLineVertical from '@iconify-icons/ph/arrows-out-line-vertical-bold'
import { computed, ref, shallowRef, watchEffect } from 'vue'
import SButton from './SButton.vue'

const props = defineProps<{
  collapsed?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()

const el = shallowRef<HTMLElement | null>(null)
const isCollapsed = ref(props.collapsed)

const icon = computed(() => {
  return isCollapsed.value
    ? IconArrowsOutLineVertical
    : IconArrowsInLineVertical
})

watchEffect(() => {
  if (!el.value) {
    return
  }

  const parentCardEl = el.value.closest('.SCard')

  isCollapsed.value
    ? parentCardEl?.classList.add('collapsed')
    : parentCardEl?.classList.remove('collapsed')
})
</script>

<template>
  <div
    class="SCardHeaderActionCollapse"
    :class="{ collapsed: isCollapsed }"
    ref="el"
  >
    <SButton
      type="text"
      mode="mute"
      size="small"
      :icon="icon"
      :disabled="disabled"
      @click="isCollapsed = !isCollapsed"
    />
  </div>
</template>
