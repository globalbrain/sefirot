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

function initState() {
  return {
    xAxis: 32,
    yAxis: 32,
    dropdownAlign: 'left'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstNumber
        title="X Axis"
        v-model="state.xAxis"
        :min="0"
      />
      <HstNumber
        title="Y Axis"
        v-model="state.yAxis"
        :min="0"
      />
      <HstSelect
        title="dropdown-align"
        :options="{
          left: 'left',
          right: 'right'
        }"
        v-model="state.dropdownAlign"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <div
          class="position-container"
          :style="{
            position: 'absolute',
            left: `${state.xAxis}px`,
            top: `${state.yAxis}px`
          }"
        >
          <SActionMenu
            label="Open menu"
            :options
            :dropdown-align="state.dropdownAlign"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>

<style lang="postcss">
.b-page {
  position: relative;
}
</style>
