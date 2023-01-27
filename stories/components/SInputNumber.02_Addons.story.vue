<script setup lang="ts">
import IconDotsThree from '@iconify-icons/ph/dots-three'
import IconLightbulb from '@iconify-icons/ph/lightbulb'
import SButton from 'sefirot/components/SButton.vue'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { useForm } from 'sefirot/composables/Form'
import { maxValue, minValue, required } from 'sefirot/validation/rules'
import { ref } from 'vue'

interface Data {
  amount1: number | null
  amount2: number | null
  amount3: number | null
  lottery1: number | null
  lottery2: number | null
  currency: number | null
}

const { data, validation, init, validateAndNotify } = useForm<Data>({
  data: {
    amount1: null,
    amount2: null,
    amount3: null,
    lottery1: null,
    lottery2: null,
    currency: null
  },
  rules: {
    amount1: {
      required: required()
    },
    amount2: {
      required: required()
    },
    amount3: {
      required: required()
    },
    lottery1: {
      required: required(),
      minValue: minValue(1_000_000),
      maxValue: maxValue(9_999_999)
    },
    lottery2: {
      required: required(),
      minValue: minValue(1_000_000),
      maxValue: maxValue(9_999_999)
    },
    currency: {
      required: required()
    }
  }
})

function generate7DigitNumbers() {
  const min = Math.ceil(1_000_000)
  const max = Math.floor(9_999_999)

  return Math.floor(Math.random() * (max - min + 1) + min)
}

const dropdown1SelectedValue = ref(1)
const dropdown1 = createDropdown([
  {
    type: 'filter',
    search: true,
    selected: dropdown1SelectedValue,
    options: [
      { label: '¥', value: 1, onClick: (value: number) => dropdown1SelectedValue.value = value },
      { label: '$', value: 2, onClick: (value: number) => dropdown1SelectedValue.value = value }
    ]
  }
])

const dropdown2 = createDropdown([
  {
    type: 'menu',
    options: [
      { label: 'Generate', onClick: () => data.amount3 = generate7DigitNumbers() },
      { label: 'Reset', onClick: () => init() },
      { label: 'Submit', onClick: () => validateAndNotify() }
    ]
  }
])
</script>

<template>
  <Board
    title="Components / SInputNumber / 02. Addons"
  >
    <div class="root">
      <div class="group">
        <div class="title">Addon Text (Before)</div>
        <div class="grid">
          <SInputNumber
            name="amount1"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in amount."
            placeholder="1000"
            :validation="validation.amount1"
            v-model="data.amount1"
            separator
          >
            <template #addon-before>
              <SInputAddon label="¥" unclickable />
            </template>
          </SInputNumber>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Text (After)</div>
        <div class="grid">
          <SInputNumber
            name="amount2"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in amount."
            placeholder="1000"
            :validation="validation.amount2"
            v-model="data.amount2"
            separator
          >
            <template #addon-after>
              <SInputAddon label="yen" unclickable />
            </template>
          </SInputNumber>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Button (Before / Text)</div>
        <div class="grid">
          <SInputNumber
            name="lottery1"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in 7-digit numbers"
            placeholder="1000000"
            :validation="validation.lottery1"
            v-model="data.lottery1"
          >
            <template #addon-before>
              <SInputAddon label="Generate" @click="data.lottery1 = generate7DigitNumbers()" />
            </template>
          </SInputNumber>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Button (After / Icon)</div>
        <div class="grid">
          <SInputNumber
            name="lottery2"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in 7-digit numbers"
            placeholder="1000000"
            :validation="validation.lottery2"
            v-model="data.lottery2"
          >
            <template #addon-after>
              <SInputAddon :label="IconLightbulb" @click="data.lottery2 = generate7DigitNumbers()" />
            </template>
          </SInputNumber>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Dropdown (Before / Single Select Dropdown)</div>
        <div class="grid">
          <SInputNumber
            name="currency"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in currency and amount."
            placeholder="1000000"
            :validation="validation.currency"
            v-model="data.currency"
            separator
          >
            <template #addon-before>
              <SInputAddon :dropdown="dropdown1" />
            </template>
          </SInputNumber>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Dropdown (After / Dropdown Menu)</div>
        <div class="grid">
          <SInputNumber
            name="amount3"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in amount."
            placeholder="1000000"
            :validation="validation.amount3"
            v-model="data.amount3"
            separator
          >
            <template #addon-after>
              <SInputAddon :label="IconDotsThree" :dropdown="dropdown2" no-dropdown-arrow />
            </template>
          </SInputNumber>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Dropdown (Before / After / Disabled)</div>
        <div class="grid">
          <SInputText
            name="amount3"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in amount."
            placeholder="1000000"
            :validation="validation.amount3"
            v-model="data.amount3"
            separator
          >
            <template #addon-before>
              <SInputAddon :label="IconDotsThree" disabled />
            </template>
            <template #addon-after>
              <SInputAddon :label="IconDotsThree" disabled />
            </template>
          </SInputText>
        </div>
      </div>
    </div>
  </Board>
</template>

<style scoped>
.root {
  display: grid;
  gap: 32px;
}

.group {
  display: grid;
  gap: 12px;
}

.title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-2);
}

.actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
}
</style>
