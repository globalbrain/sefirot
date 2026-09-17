<script setup lang="ts">
import IconCheck from '~icons/ph/check'
import { useMediaQuery } from '@vueuse/core'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import SButton from 'sefirot/components/SButton.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlInputSearch from 'sefirot/components/SControlInputSearch.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import SDesc from 'sefirot/components/SDesc.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescLink from 'sefirot/components/SDescLink.vue'
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'
import SInputAsyncDropdown from 'sefirot/components/SInputAsyncDropdown.vue'
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import SInputDate from 'sefirot/components/SInputDate.vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import SInputHMS from 'sefirot/components/SInputHMS.vue'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import SInputRadio from 'sefirot/components/SInputRadio.vue'
import SInputSelect from 'sefirot/components/SInputSelect.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import STable from 'sefirot/components/STable.vue'
import { type Table } from 'sefirot/composables/Table'
import { day } from 'sefirot/support/Day'
import { computed, ref } from 'vue'
import { provideLayout } from '../../lib/composables/Layout'

// Breakpoint and preference belong to this example application.
const smallScreen = useMediaQuery('(max-width: 959px)')
const desktop = ref(false)
const mode = computed(() => smallScreen.value && !desktop.value ? 'mobile' : 'desktop')
provideLayout(mode)

const query = ref<string | null>('Populated search')
const text = ref<string | null>('A populated input')
const number = ref<number | null>(12345)
const date = ref(day('2026-09-16'))
const hms = ref({ hour: '09', minute: '30', second: '00' })
const checked = ref(true)
const selected = ref<string | null>('one')
const asyncSelected = ref<{ label: string; value: string } | null>(null)
const options = [
  { label: 'First choice with a long descriptive label', value: 'one' },
  { label: 'Second choice', value: 'two' },
  ...Array.from({ length: 20 }, (_, i) => ({ label: `Additional choice ${i + 1}`, value: `extra-${i}` }))
]
const url = 'https://example.com/a-long-unbroken-value-abcdefghijklmnopqrstuvwxyz0123456789'
const table: Table = {
  orders: ['name', 'value'],
  columns: {
    name: { label: 'Record', width: '200px' },
    value: { label: 'Long value', width: '280px' }
  },
  records: Array.from({ length: 100 }, (_, i) => ({ name: `Record ${i + 1}`, value: url })),
  footer: false
}
</script>

<template>
  <div class="example" :class="{ desktop: desktop && smallScreen }">
    <label><input v-model="desktop" type="checkbox"> Force desktop layout</label>
    <p>Resolved layout: {{ mode }}</p>
    <SCard>
      <SCardBlock size="medium" :padding="{ desktop: '8px 24px', mobile: 12 }">
        <SControl>
          <SControlLeft>
            <SControlInputSearch v-model="query" class="s-w-320" />
          </SControlLeft>
          <SControlRight>
            <SButton size="sm" label="Example action" />
            <SActionMenu size="sm" label="More options" :options="[{ type: 'menu', options: [{ label: 'Example option' }] }]" />
          </SControlRight>
        </SControl>
      </SCardBlock>
      <SCardBlock :padding="{ desktop: 24, mobile: 16 }">
        <SGrid :cols="{ desktop: 3, mobile: 1 }" :gap="{ desktop: 24, mobile: 12 }">
          <SGridItem :span="2"><SInputText v-model="text" name="example-text" size="mini" label="LongInputLabelWithoutSpacesABCDEFGHIJKLMNOPQRSTUVWXYZ" help="LongHelpTextWithoutSpacesABCDEFGHIJKLMNOPQRSTUVWXYZ" /></SGridItem>
          <SGridItem><SInputNumber v-model="number" name="example-number" size="mini" label="Number" /></SGridItem>
          <SGridItem><SInputSelect v-model="selected" size="mini" label="Native select" :options /></SGridItem>
          <SGridItem><SInputDate v-model="date" size="mini" label="Date" /></SGridItem>
          <SGridItem><SInputHMS v-model="hms" size="mini" label="Time" /></SGridItem>
          <SGridItem><SInputDropdown v-model="selected" size="mini" label="Dropdown" :options /></SGridItem>
          <SGridItem><SInputAsyncDropdown v-model="asyncSelected" size="mini" label="Async dropdown" :fetch="async () => options" :to-option="(item) => item" /></SGridItem>
          <SGridItem><SInputTextarea v-model="text" size="mini" label="Notes" /></SGridItem>
          <SGridItem><SInputCheckbox v-model="checked" text="A checkbox label that wraps over several lines on a narrow screen" /></SGridItem>
          <SGridItem><SInputRadio v-model="checked" text="A radio label that wraps over several lines on a narrow screen" /></SGridItem>
          <SGridItem><SButton size="sm" :icon="IconCheck" label="A long button label with an aligned icon" /></SGridItem>
        </SGrid>
        <SDesc :cols="{ desktop: 2, mobile: 1 }" :gap="{ desktop: 24, mobile: 12 }">
          <SDescItem><SDescLabel value="LongDescriptionLabelABCDEFGHIJKLMNOPQRSTUVWXYZ" /><SDescLink :value="url" /></SDescItem>
        </SDesc>
      </SCardBlock>
    </SCard>
    <STable :options="table" :text-lines="{ desktop: 1, mobile: 3 }" style="--table-max-height: 240px" />
  </div>
</template>

<style scoped>
.example { padding: 12px; display: grid; gap: 16px; }
.example.desktop { min-width: 1200px; }
.SDesc { margin-top: 24px; }
</style>
