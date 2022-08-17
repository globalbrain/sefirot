<script setup lang="ts">
import SInputHMS from 'sefirot/components/SInputHMS.vue'
import { useForm } from 'sefirot/composables/Form'
import { required, requiredHms, hms } from 'sefirot/validation/rules'

const { data, validation } = useForm({
  data: {
    time: null
  },
  rules: {
    time: {
      required,
      requiredHms: requiredHms(),
      hms: hms()
    }
  }
})
</script>

<template>
  <Story title="Components/SInputHMS" :layout="{ type: 'single', iframe: false }">
    <SInputHMS
      v-model="data.time"
      label="HMS input"
      help="Please fill in time."
      :validation="validation.time"
    />
  </Story>
</template>

<docs lang="md">
# SInputHMS


</docs>
