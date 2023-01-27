<script setup lang="ts">
import IconDotsThree from '@iconify-icons/ph/dots-three'
import IconLightbulb from '@iconify-icons/ph/lightbulb'
import SButton from 'sefirot/components/SButton.vue'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import { createDropdown } from 'sefirot/composables/Dropdown'
import { useForm } from 'sefirot/composables/Form'
import { required } from 'sefirot/validation/rules'
import { ref } from 'vue'

interface Data {
  name: string | null
  domain: string | null
  password1: string | null
  password2: string | null
  password3: string | null
  currency: string | null
  regularExpression: string | null
}

const { data, validation, init, validateAndNotify } = useForm<Data>({
  data: {
    name: null,
    domain: null,
    password1: null,
    password2: null,
    password3: null,
    currency: null,
    regularExpression: null
  },
  rules: {
    name: {
      required: required()
    },
    domain: {
      required: required()
    },
    password1: {
      required: required()
    },
    password2: {
      required: required()
    },
    password3: {
      required: required()
    },
    currency: {
      required: required()
    },
    regularExpression: {
      required: required()
    }
  }
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
      { label: 'Reset', onClick: () => init() },
      { label: 'Submit', onClick: () => validateAndNotify() }
    ]
  }
])
</script>

<template>
  <Board
    title="Components / SInputText / 02. Addons"
  >
    <div class="root">
      <div class="group">
        <div class="title">Addon Text (Before)</div>
        <div class="grid">
          <SInputText
            name="name"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in your name."
            placeholder="John Doe"
            :validation="validation.name"
            v-model="data.name"
          >
            <template #addon-before>
              <SInputAddon label="@" unclickable />
            </template>
          </SInputText>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Text (After)</div>
        <div class="grid">
          <SInputText
            name="domain"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in your domain."
            placeholder="sample"
            :validation="validation.domain"
            v-model="data.domain"
          >
            <template #addon-after>
              <SInputAddon label=".com" unclickable />
            </template>
          </SInputText>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Button (Before / Text)</div>
        <div class="grid">
          <SInputText
            name="pasword1"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in your pasword."
            placeholder="mypassword"
            :validation="validation.password1"
            v-model="data.password1"
          >
            <template #addon-before>
              <SInputAddon label="Generate" @click="data.password1 = generatePassword()" />
            </template>
          </SInputText>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Button (After / Icon)</div>
        <div class="grid">
          <SInputText
            name="password2"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in your pasword."
            placeholder="mypassword"
            :validation="validation.password2"
            v-model="data.password2"
          >
            <template #addon-after>
              <SInputAddon :label="IconLightbulb" @click="data.password2 = generatePassword()" />
            </template>
          </SInputText>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Dropdown (Before / Single Select Dropdown)</div>
        <div class="grid">
          <SInputText
            name="currency"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in currency and amount."
            placeholder="1000"
            :validation="validation.currency"
            v-model="data.currency"
          >
            <template #addon-before>
              <SInputAddon :dropdown="dropdown1" />
            </template>
          </SInputText>

          <div class="actions">
            <SButton size="small" mode="info" label="Submit" @click="validateAndNotify" />
            <SButton size="small" mode="mute" label="Reset" @click="init" />
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Dropdown (After / Dropdown Menu)</div>
        <div class="grid">
          <SInputText
            name="password3"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in amount."
            placeholder="mypassword"
            :validation="validation.password3"
            v-model="data.password3"
          >
            <template #addon-after>
              <SInputAddon :label="IconDotsThree" :dropdown="dropdown2" no-dropdown-arrow />
            </template>
          </SInputText>
        </div>
      </div>
      <div class="group">
        <div class="title">Addon Dropdown (Before / After / Disabled)</div>
        <div class="grid">
          <SInputText
            name="password3"
            label="Label"
            info="Some helpful information."
            note="Required"
            help="Please fill in amount."
            placeholder="mypassword"
            :validation="validation.password3"
            v-model="data.password3"
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
