<script setup lang="ts">
import IconDotsThree from '~icons/ph/dots-three-bold'
import IconLightbulb from '~icons/ph/lightbulb-bold'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { reactive, ref } from 'vue'

const title = 'Components / SInputText / 02. Addons'

interface Data {
  name: string | null
  domain: string | null
  password1: string | null
  password2: string | null
  password3: string | null
  password4: string | null
  currency: string | null
  regularExpression: string | null
}

const data = reactive<Data>({
  name: null,
  domain: null,
  password1: null,
  password2: null,
  password3: null,
  password4: null,
  currency: null,
  regularExpression: null
})

function generatePassword() {
  return Math.random().toString(32).substring(2)
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
      { label: 'Generate', onClick: () => data.password3 = generatePassword() },
      { label: 'Reset', onClick: () => data.password3 = null }
    ]
  }
])

function initState() {
  return {
    size: 'small',
    unitBefore: '',
    unitAfter: ''
  } as const
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.size"
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium'
        }"
      />
      <HstText
        v-model="state.unitBefore"
        title="unit-before"
      />
      <HstText
        v-model="state.unitAfter"
        title="unit-after"
      />
    </template>

    <template #default="{ state }">
      <Board :title>
        <div class="root">
          <div class="group">
            <div class="title">Addon Text (Before)</div>
            <div class="grid">
              <SInputText
                v-model="data.name"
                :size="state.size"
                placeholder="John Doe"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
              >
                <template #addon-before>
                  <SInputAddon label="@" :clickable="false" />
                </template>
              </SInputText>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Text (After)</div>
            <div class="grid">
              <SInputText
                v-model="data.domain"
                :size="state.size"
                placeholder="sample"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
              >
                <template #addon-after>
                  <SInputAddon label=".com" :clickable="false" />
                </template>
              </SInputText>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Button (Before / Text)</div>
            <div class="grid">
              <SInputText
                v-model="data.password1"
                :size="state.size"
                placeholder="mypassword"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
              >
                <template #addon-before>
                  <SInputAddon label="Generate" @click="data.password1 = generatePassword()" />
                </template>
              </SInputText>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Button (After / Icon)</div>
            <div class="grid">
              <SInputText
                v-model="data.password2"
                :size="state.size"
                placeholder="mypassword"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
              >
                <template #addon-after>
                  <SInputAddon :label="IconLightbulb" @click="data.password2 = generatePassword()" />
                </template>
              </SInputText>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Dropdown (Before / Single Select Dropdown)</div>
            <div class="grid">
              <SInputText
                v-model="data.currency"
                :size="state.size"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                placeholder="1000"
              >
                <template #addon-before>
                  <SInputAddon :dropdown="dropdown1" />
                </template>
              </SInputText>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Dropdown (After / Dropdown Menu)</div>
            <div class="grid">
              <SInputText
                v-model="data.password3"
                :size="state.size"
                placeholder="mypassword"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
              >
                <template #addon-after>
                  <SInputAddon :label="IconDotsThree" :dropdown="dropdown2" :dropdown-caret="false" />
                </template>
              </SInputText>
            </div>
          </div>

          <div class="group">
            <div class="title">Addon Dropdown (Before / After / Disabled)</div>
            <div class="grid">
              <SInputText
                v-model="data.password4"
                :size="state.size"
                placeholder="mypassword"
                :unit-before="state.unitBefore"
                :unit-after="state.unitAfter"
                disabled
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
  </Story>
</template>

<style scoped lang="postcss">
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
