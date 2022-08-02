<script setup lang="ts">
import SInputDate from 'sefirot/components/SInputDate.vue'
import { useForm } from 'sefirot/composables/Form'
import { required } from 'sefirot/validation/rules'

const { data, validation } = useForm({
  data: {
    date: null
  },
  rules: {
    date: {
      required
    }
  }
})
</script>

<template>
  <Story title="Components/SInputDate" :layout="{ type: 'single', iframe: false }">
    <SInputDate
      name="birthday"
      label="Birthday"
      note="Required"
      help="Please fill in your birthday."
      :validation="validation.date"
      v-model="data.date"
    />
  </Story>
</template>

<docs lang="md">
# SInputDate


</docs>
