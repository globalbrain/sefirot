<script setup lang="ts">
import IconActivity from '~icons/ph/activity-bold'
import IconEye from '~icons/ph/eye-bold'
import IconTrash from '~icons/ph/trash-bold'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import { createDropdownMenu } from 'sefirot/composables/Dropdown'

const title = 'Components / SActionMenu / 01. Playground'

const options = [
  createDropdownMenu({
    options: [
      { leadIcon: IconActivity, label: 'Show activity' },
      { leadIcon: IconEye, label: 'Preview' },
      { leadIcon: IconTrash, label: 'Delete item' }
    ]
  })
]
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title>
      <SActionMenu
        label="Open menu"
        :options
      />
    </Board>
  </Story>
</template>
