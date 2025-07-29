<script setup lang="ts">
import IconActivity from '~icons/ph/activity-bold'
import IconEye from '~icons/ph/eye-bold'
import IconTrash from '~icons/ph/trash-bold'
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'

const title = 'Components / SActionList / 01. Playground'
const docs = '/components/action-list'

const list: ActionList = [
  { leadIcon: IconActivity, label: 'Show activity' },
  { leadIcon: IconEye, label: 'Preview' },
  { leadIcon: IconTrash, label: 'Delete item' }
]
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title :docs>
      <SActionList :list />
    </Board>
  </Story>
</template>
