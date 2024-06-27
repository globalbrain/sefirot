<script setup lang="ts">
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { reactive, ref } from 'vue'
import IconDotsThree from '~icons/ph/dots-three-bold'
import IconLightbulb from '~icons/ph/lightbulb-bold'

const title = 'Components / SInputNumber / 02. Addons'
const docs = '/components/input-number'

interface Data {
  amount1: number | null
  amount2: number | null
  amount3: number | null
  amount4: number | null
  lottery1: number | null
  lottery2: number | null
  currency: number | null
}

const data = reactive<Data>({
  amount1: null,
  amount2: null,
  amount3: null,
  amount4: null,
  lottery1: null,
  lottery2: null,
  currency: null
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
      { label: 'Reset', onClick: () => data.amount3 = null }
    ]
  }
])

function state() {
  return {
    size: 'small',
    unitBefore: '',
    unitAfter: ''
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
        title="unit-before"
        v-model="state.unitBefore"
      />
      <HstText
        title="unit-after"
        v-model="state.unitAfter"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <div class="root">
          <div class="group">
            <div class="title">Addon Text (Before)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                placeholder="1,000"
                separator
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                v-model="data.amount1"
              >
                <template #addon-before>
                  <SInputAddon label="¥" :clickable="false" />
                </template>
              </SInputNumber>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Text (After)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                placeholder="1,000"
                separator
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                v-model="data.amount2"
              >
                <template #addon-after>
                  <SInputAddon label="yen" :clickable="false" />
                </template>
              </SInputNumber>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Button (Before / Text)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                placeholder="1000000"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                v-model="data.lottery1"
              >
                <template #addon-before>
                  <SInputAddon label="Generate" @click="data.lottery1 = generate7DigitNumbers()" />
                </template>
              </SInputNumber>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Button (After / Icon)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                placeholder="1000000"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                v-model="data.lottery2"
              >
                <template #addon-after>
                  <SInputAddon :label="IconLightbulb" @click="data.lottery2 = generate7DigitNumbers()" />
                </template>
              </SInputNumber>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Dropdown (Before / Single Select Dropdown)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                separator
                placeholder="1,000,000"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                v-model="data.currency"
              >
                <template #addon-before>
                  <SInputAddon :dropdown="dropdown1" />
                </template>
              </SInputNumber>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Dropdown (After / Dropdown Menu)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                placeholder="1,000,000"
                separator
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                v-model="data.amount3"
              >
                <template #addon-after>
                  <SInputAddon :label="IconDotsThree" :dropdown="dropdown2" :dropdown-caret="false" />
                </template>
              </SInputNumber>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Dropdown (Before / After / Disabled)</div>
            <div class="grid">
              <SInputNumber
                :size="state.size"
                placeholder="1,000,000"
                separator
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                disabled
                v-model="data.amount4"
              >
                <template #addon-before>
                  <SInputAddon :label="IconDotsThree" disabled />
                </template>
                <template #addon-after>
                  <SInputAddon :label="IconDotsThree" disabled />
                </template>
              </SInputNumber>
            </div>
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>

<style scoped>
.root {
  display: grid;
  gap: 32px;
  padding-bottom: 96px;
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
</style>
