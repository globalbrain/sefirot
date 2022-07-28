<script setup lang="ts">
import SInputYMD from 'sefirot/components/SInputYMD.vue'
import { useForm } from 'sefirot/composables/Form'
import { required } from 'sefirot/validation/rules'

const { data, validation } = useForm({
      data: {
        ymd: null
      },
      rules: {
        ymd: [
          required
        ]
      }
    })
</script>

<template>
  <Story title="Components/SInputYMD" :layout="{ type: 'single', iframe: false }">
    <SInputYMD
      v-model="data.ymd"
      label="YMD input"
      note="Required"
      help="Please fill in date."
      :validation="validation"
    />
  </Story>
</template>

<docs lang="md">
# SInputYMD


</docs>
