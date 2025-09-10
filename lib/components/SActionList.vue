<script setup lang="ts">
import SActionListItem, { type ActionListItem } from './SActionListItem.vue'

export type ActionList = ActionListItem[]
export type { ActionListItem }

defineProps<{
  list: ActionList
}>()
</script>

<template>
  <div class="SActionList">
    <SActionListItem
      v-for="(item, i) in list"
      :key="i"
      :lead-icon="item.leadIcon"
      :label="item.label"
      :link="item.link"
      :disabled="item.disabled"
      :tooltip="item.tooltip"
      :on-click="item.onClick"
    />
  </div>
</template>
