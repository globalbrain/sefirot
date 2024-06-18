<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import SSpinner from 'sefirot/components/SSpinner.vue'
import { useD } from 'sefirot/composables/D'
import { useV } from 'sefirot/composables/V'
import { required } from 'sefirot/validation/rules'
import { type DefineComponent, computed, ref } from 'vue'
import IconCheckCircle from '~icons/ph/check-circle-bold'
import IconXCircle from '~icons/ph/x-circle-bold'

const title = 'Components / SInputText / 01. Playground'

const { data, init } = useD({
  name: null as string | null
})

const { validation, validateAndNotify } = useV(data, {
  name: {
    required: required()
  }
})

const inputState = ref<'loading' | 'success' | 'failure'>()

const check = computed(() => {
  if (inputState.value === 'loading') {
    return { icon: SSpinner as DefineComponent, text: 'Saving...', color: 'mute' as const }
  } else if (inputState.value === 'success') {
    return { icon: IconCheckCircle, text: 'Saved', color: 'success' as const }
  } else if (inputState.value === 'failure') {
    return { icon: IconXCircle, text: 'Failed', color: 'danger' as const }
  } else {
    return null
  }
})

let timeout: number

async function submit() {
  clearTimeout(timeout)

  inputState.value = 'loading'

  const valid = await validateAndNotify()

  if (valid) {
    timeout = setTimeout(() => {
      inputState.value = 'success'
    }, 2000) as any
  } else {
    inputState.value = 'failure'
  }
}

function reset() {
  init()
  clearTimeout(timeout)
  inputState.value = undefined
}

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Required',
    placeholder: 'John Doe',
    unitBefore: '',
    unitAfter: '',
    help: 'Please fill in your name.',
    textColor: 'neutral',
    align: 'left',
    separator: true,
    disabled: false,
    error: false
  } as const
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium'
        }"
        v-model="state.size"
      />
      <HstText
        title="label"
        v-model="state.label"
      />
      <HstText
        title="info"
        v-model="state.info"
      />
      <HstText
        title="note"
        v-model="state.note"
      />
      <HstText
        title="placeholder"
        v-model="state.placeholder"
      />
      <HstText
        title="unit-before"
        v-model="state.unitBefore"
      />
      <HstText
        title="unit-after"
        v-model="state.unitAfter"
      />
      <HstText
        title="help"
        v-model="state.help"
      />
      <HstSelect
        title="text-color"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.textColor"
      />
      <HstSelect
        title="align"
        :options="{
          left: 'left',
          center: 'center',
          right: 'right'
        }"
        v-model="state.align"
      />
      <HstCheckbox
        title="separator"
        v-model="state.separator"
      />
      <HstCheckbox
        title="disabled"
        v-model="state.disabled"
      />
      <HstCheckbox
        title="error"
        v-model="state.error"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title">
        <SInputText
          :size="state.size"
          name="name"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :placeholder="state.placeholder"
          :unit-before="state.unitBefore"
          :unit-after="state.unitAfter"
          :check-icon="check?.icon"
          :check-text="check?.text"
          :check-color="check?.color"
          :text-color="state.textColor"
          v-model="data.name"
          :validation="validation.name"
        />

        <div class="actions">
          <SButton size="small" mode="info" label="Submit" @click="submit" />
          <SButton size="small" mode="mute" label="Reset" @click="reset" />
        </div>
      </Board>
    </template>
  </Story>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
}
</style>
