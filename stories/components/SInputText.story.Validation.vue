<script setup lang="ts">
import SInputText from 'sefirot/components/SInputText.vue'
import SButton from 'sefirot/components/SButton.vue'
import SSnackbars from 'sefirot/components/SSnackbars.vue'
import { useForm } from 'sefirot/composables/Form'
import { required } from 'sefirot/validation/rules'

interface Data {
  name: string | null
}

const { data, validation, init, validateAndNotify } = useForm<Data>({
  data: {
    name: null
  },
  rules: {
    name: {
      required: required()
    }
  }
})
</script>

<template>
  <div>
    <SInputText
      name="name"
      label="Label"
      note="Required"
      help="Please fill in your name."
      placeholder="John Doe"
      v-model="data.name"
      :validation="validation.name"
    />

    <div class="actions">
      <SButton mode="info" label="Submit" @click="validateAndNotify" />
      <SButton mode="mute" label="Reset" @click="init" />
    </div>

    <SSnackbars />
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
}
</style>
