<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SInputText from 'sefirot/components/SInputText.vue'
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
  <Board
    title="Components / SInputText / 01. Playground"
  >
    <SInputText
      name="name"
      label="Label"
      info="Some helpful information."
      note="Required"
      help="Please fill in your name."
      placeholder="John Doe"
      v-model="data.name"
      :validation="validation.name"
    />

    <div class="actions">
      <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
      <SButton size="small" mode="mute" label="Reset" @click="init" />
    </div>
  </Board>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
}
</style>
