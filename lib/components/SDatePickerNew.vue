<script setup lang="ts">
import { reactive, ref } from 'vue'
import { now } from '../support/Now'
import SDatePickerBase from './SDatePickerBase.vue'

const selected = reactive({ ...now })
const focused = reactive({ ...selected })

const mode = ref<'days' | 'months' | 'years'>('days')

function onZoomIn() {
  if (mode.value === 'years') {
    mode.value = 'months'
  } else if (mode.value === 'months') {
    mode.value = 'days'
  }
}

function onZoomOut() {
  if (mode.value === 'days') {
    mode.value = 'months'
  } else if (mode.value === 'months') {
    mode.value = 'years'
  }
}
</script>

<template>
  <SDatePickerBase
    :mode="mode"
    v-model:selected="selected"
    v-model:focused="focused"
    @zoom-in="onZoomIn"
    @zoom-out="onZoomOut"
  />
</template>
