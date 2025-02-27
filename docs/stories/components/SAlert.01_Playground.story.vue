<script setup lang="ts">
import SAlert from 'sefirot/components/SAlert.vue'

const title = 'Components / SAlert / 01. Playground'
const docs = '/components/alert'

function state() {
  return {
    mode: 'info'
  }
}
</script>

<template>
  <Story :init-state="state">
    <template #controls="{ state }">
      <HstSelect
        title="mode"
        :options="{
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.mode"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SAlert :mode="state.mode">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et <a href="#">dolore magna</a> aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </SAlert>
      </Board>
    </template>
  </Story>
</template>
