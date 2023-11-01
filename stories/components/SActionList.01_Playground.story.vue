<script setup lang="ts">
import IconActivity from '@iconify-icons/ph/activity-bold'
import IconEye from '@iconify-icons/ph/eye-bold'
import IconTrash from '@iconify-icons/ph/trash-bold'
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'

const title = 'Components / SActionList / 01. Playground'
const docs = '/components/action-list'

const list: ActionList = [
  { leadIcon: IconActivity, text: 'Show activity' },
  { leadIcon: IconEye, text: 'Preview' },
  { leadIcon: IconTrash, text: 'Delete item' }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title" :docs="docs">
      <SActionList :list="list" />
    </Board>
  </Story>
</template>
