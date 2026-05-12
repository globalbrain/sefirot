<script setup lang="ts" generic="T extends DecimalFieldData | NumberFieldData">
import { reactive } from 'vue'
import SInputCheckbox from '../../../components/SInputCheckbox.vue'
import SInputNumber from '../../../components/SInputNumber.vue'
import SInputSelect from '../../../components/SInputSelect.vue'
import { useTrans } from '../../../composables/Lang'
import { type DecimalFieldData, type NumberFieldData } from '../FieldData'
import LensFormOverrideBase from './LensFormOverrideBase.vue'

const props = defineProps<{
  name: string
  field: T
  override: T
}>()

const emit = defineEmits<{
  cancel: []
  saved: [field: Partial<T>]
}>()

const { t } = useTrans({
  en: {
    i_align_label: 'Alignment',
    i_separator_text: 'Separate by comma',
    i_abbr_label: 'Abbreviation',
    i_fraction_digits: 'Fraction digits'
  },
  ja: {
    i_align_label: '配置',
    i_separator_text: 'カンマで区切る',
    i_abbr_label: '省略表記',
    i_fraction_digits: '小数点以下の桁数'
  }
})

// Local state for the number-specific inputs. Base inputs
// (label, width, freeze) keep their own state inside
// `LensFormOverrideBase`; we receive their changes via the `saved`
// event and merge in our four extras here.
const data = reactive({
  align: props.override.align,
  separator: props.override.separator ?? false,
  abbr: props.override.abbr,
  fractionDigits: props.override.fractionDigits
})

const { t: alignOptions } = useTrans({
  en: [
    { label: 'Left', value: 'left' },
    { label: 'Center', value: 'center' },
    { label: 'Right', value: 'right' }
  ],
  ja: [
    { label: '左寄せ', value: 'left' },
    { label: '中央寄せ', value: 'center' },
    { label: '右寄せ', value: 'right' }
  ]
})

// `null` represents "no abbreviation". We expose it as a real option
// so users can switch back to plain rendering after picking a locale.
// `SInputSelect` accepts `null` values when the option carries
// `value: null`.
const { t: abbrOptions } = useTrans({
  en: [
    { label: 'None', value: null },
    { label: 'English (1K, 1M, 1B)', value: 'en' },
    { label: 'Japanese (1万, 1億, 1兆)', value: 'ja' }
  ],
  ja: [
    { label: 'なし', value: null },
    { label: '英語スタイル (1K, 1M, 1B)', value: 'en' },
    { label: '日本語スタイル (1万, 1億, 1兆)', value: 'ja' }
  ]
})

function onSaved(override: Partial<T>): void {
  // Only include keys whose value diverged from the underlying field
  // definition — matches what `LensFormOverrideBase` does for the
  // base inputs.
  const o = override as Record<string, any>
  if (data.align !== props.field.align) {
    o.align = data.align
  }
  if (data.separator !== props.field.separator) {
    o.separator = data.separator
  }
  if (data.abbr !== props.field.abbr) {
    o.abbr = data.abbr
  }
  if (data.fractionDigits !== props.field.fractionDigits) {
    o.fractionDigits = data.fractionDigits
  }
  emit('saved', override)
}
</script>

<template>
  <LensFormOverrideBase
    class="LensFormOverrideNumber"
    :name
    :field
    :label-en="override.labelEn"
    :label-ja="override.labelJa"
    :width="override.width"
    :freeze="override.freeze"
    @cancel="$emit('cancel')"
    @saved="onSaved"
  >
    <div class="item">
      <div class="key">{{ t.i_align_label }}</div>
      <div class="value">
        <SInputSelect
          v-model="data.align"
          size="mini"
          :options="alignOptions"
        />
      </div>
    </div>
    <div class="item">
      <div class="key">{{ t.i_separator_text }}</div>
      <div class="value">
        <SInputCheckbox v-model="data.separator" />
      </div>
    </div>
    <div class="item">
      <div class="key">{{ t.i_abbr_label }}</div>
      <div class="value">
        <SInputSelect
          v-model="data.abbr"
          size="mini"
          :options="abbrOptions"
        />
      </div>
    </div>
    <div class="item">
      <div class="key">{{ t.i_fraction_digits }}</div>
      <div class="value">
        <SInputNumber v-model="data.fractionDigits" size="mini" />
      </div>
    </div>
  </LensFormOverrideBase>
</template>
