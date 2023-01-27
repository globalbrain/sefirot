<script setup lang="ts">
import IconCheckCircle from '@iconify-icons/ph/check-circle-bold'
import IconXCircle from '@iconify-icons/ph/x-circle-bold'
import SButton from 'sefirot/components/SButton.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import SSpinner from 'sefirot/components/SSpinner.vue'
import { useForm } from 'sefirot/composables/Form'
import { required } from 'sefirot/validation/rules'
import { DefineComponent, computed, ref } from 'vue'

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

const state = ref<'loading' | 'success' | 'failure'>()

const check = computed(() => {
  if (state.value === 'loading') {
    return { icon: SSpinner as DefineComponent, text: 'Saving...', color: 'mute' as const }
  }
  if (state.value === 'success') {
    return { icon: IconCheckCircle, text: 'Saved', color: 'success' as const }
  }
  if (state.value === 'failure') {
    return { icon: IconXCircle, text: 'Failed', color: 'danger' as const }
  }
  return null
})

let timeout: number

async function submit() {
  clearTimeout(timeout)
  state.value = 'loading'
  const valid = await validateAndNotify()
  if (valid) {
    timeout = setTimeout(() => {
      state.value = 'success'
    }, 2000) as any
  } else {
    state.value = 'failure'
  }
}

function reset() {
  init()
  clearTimeout(timeout)
  state.value = undefined
}
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
      :check-icon="check?.icon"
      :check-text="check?.text"
      :check-color="check?.color"
    />

    <div class="actions">
      <SButton size="small" mode="info" label="Submit" @click="submit" />
      <SButton size="small" mode="mute" label="Reset" @click="reset" />
    </div>
  </Board>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
}

:deep(.SSpinner) {
  width: 13px;
}
</style>
