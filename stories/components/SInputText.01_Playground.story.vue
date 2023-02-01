<script setup lang="ts">
import IconCheckCircle from '@iconify-icons/ph/check-circle-bold'
import IconFileSearch from '@iconify-icons/ph/file-search-bold'
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
    unitBeforeIcon: false,
    unitBeforeText: '',
    unitAfterIcon: false,
    unitAfterText: '',
    help: 'Please fill in your name.',
    align: 'left',
    separator: true,
    disabled: false,
    error: false
  } as const
}

function updateUnitBefore(value: string | boolean, state: any) {
  if (typeof value === 'string') {
    state.unitBeforeIcon = false
    state.unitBeforeText = value
  } else {
    state.unitBeforeIcon = value
  }
}

function updateUnitAfter(value: string | boolean, state: any) {
  if (typeof value === 'string') {
    state.unitAfterIcon = false
    state.unitAfterText = value
  } else {
    state.unitAfterIcon = value
  }
}
</script>

<template>
  <Board
    title="Components / SInputText / 01. Playground"
    :state="state"
  >
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
      <HstCheckbox
        title="unit-before (icon)"
        :model-value="state.unitBeforeIcon"
        @update:model-value="updateUnitBefore($event, state)"
      />
      <HstText
        title="unit-before (text)"
        :model-value="state.unitBeforeText"
        @update:model-value="updateUnitBefore($event, state)"
      />
      <HstCheckbox
        title="unit-after (icon)"
        :model-value="state.unitAfterIcon"
        @update:model-value="updateUnitAfter($event, state)"
      />
      <HstText
        title="unit-after (text)"
        :model-value="state.unitAfterText"
        @update:model-value="updateUnitAfter($event, state)"
      />
      <HstText
        title="help"
        v-model="state.help"
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
      <SInputText
        name="name"
        :label="state.label"
        :info="state.info"
        :note="state.note"
        :help="state.help"
        :placeholder="state.placeholder"
        :unit-before="state.unitBeforeIcon ? IconFileSearch : state.unitBeforeText ? state.unitBeforeText : null"
        :unit-after="state.unitAfterIcon ? IconCheckCircle : state.unitAfterText ? state.unitAfterText : null"
        :size="state.size"
        :check-icon="check?.icon"
        :check-text="check?.text"
        :check-color="check?.color"
        :validation="validation.name"
        v-model="data.name"
      />

      <div class="actions">
        <SButton size="small" mode="info" label="Submit" @click="submit" />
        <SButton size="small" mode="mute" label="Reset" @click="reset" />
      </div>
    </template>
  </Board>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
}
</style>
