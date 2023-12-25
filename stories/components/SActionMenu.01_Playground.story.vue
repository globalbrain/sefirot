<script setup lang="ts">
import IconActivity from '@iconify-icons/ph/activity-bold'
import IconEye from '@iconify-icons/ph/eye-bold'
import IconTrash from '@iconify-icons/ph/trash-bold'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import { createDropdownMenu } from 'sefirot/composables/Dropdown'

const title = 'Components / SActionMenu / 01. Playground'

const options = [
  createDropdownMenu({
    options: [
      { leadIcon: IconActivity, text: 'Show activity' },
      { leadIcon: IconEye, text: 'Preview' },
      { leadIcon: IconTrash, text: 'Delete item' }
    ]
  })
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SActionMenu
        label="Open menu"
        :options="options"
      />
    </Board>
  </Story>
</template>
