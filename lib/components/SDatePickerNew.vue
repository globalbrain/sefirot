<script setup lang="ts">
// import { reactive } from 'vue'
import SDatePickerBase from './SDatePickerBase.vue'

// const now = new Date()

// const today = {
//   day: now.getDate(),
//   month: now.getMonth() + 1,
//   year: now.getFullYear()
// }

// const selected = reactive({ ...today })
</script>

<template>
  <SDatePickerBase mode="days" />
  <br>
  <SDatePickerBase mode="months" />
  <br>
  <SDatePickerBase mode="years" />
</template>
