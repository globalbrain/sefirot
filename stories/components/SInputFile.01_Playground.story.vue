<script setup lang="ts">
import SInputFile from 'sefirot/components/SInputFile.vue'
import { useForm } from 'sefirot/composables/Form'
import { fileExtension, required } from 'sefirot/validation/rules'

const { data, validation } = useForm({
  data: {
    file: null
  },
  rules: {
    file: {
      required,
      fileExtension: fileExtension(['jpg', 'png'])
    }
  }
})
</script>

<template>
  <Board
    title="Components / SInputFile / 01. Playground"
  >
    <SInputFile
      v-model="data.file"
      label="Upload file"
      note="Required"
      help="PNG or JPG"
      placeholder="No file chosen"
      :validation="validation.file"
    />
  </Board>
</template>
