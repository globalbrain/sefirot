<script setup lang="ts">
import IconArrowsInLineVertical from '~icons/ph/arrows-in-line-vertical'
import IconArrowsOutLineVertical from '~icons/ph/arrows-out-line-vertical'
import { computed, shallowRef } from 'vue'
import { useCardState } from '../composables/Card'
import SControlActionBarButton from './SControlActionBarButton.vue'

const props = defineProps<{
  as?: string
  collapsed?: boolean
}>()

defineEmits<{
  click: []
}>()

const { isCollapsed, setCollapse, toggleCollapse } = useCardState()

setCollapse(props.collapsed)

const el = shallowRef<HTMLElement | null>(null)

const icon = computed(() => {
  return isCollapsed.value ? IconArrowsOutLineVertical : IconArrowsInLineVertical
})
</script>

<template>
  <div ref="el" class="SControlActionBarCollapse">
    <SControlActionBarButton
      :as
      :icon
      @click="toggleCollapse"
    />
  </div>
</template>
