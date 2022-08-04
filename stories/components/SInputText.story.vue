<script setup lang="ts">
import SInputText from 'sefirot/components/SInputText.vue'
import { useForm } from 'sefirot/composables/Form'
import { required } from 'sefirot/validation/rules'

const { data, validation } = useForm({
  data: {
    name: null
  },
  rules: {
    name: {
      required
    }
  }
})
</script>

<template>
  <Story title="Components/SInputText" :layout="{ type: 'single', iframe: false }">
    <SInputText
      v-model="data.name"
      name="name"
      label="Label"
      note="Required"
      help="Please fill in your name."
      placeholder="John Doe"
      :validation="validation.name"
    />
  </Story>
</template>

<docs lang="md">
# SInputText


</docs>
