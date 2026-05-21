<script setup lang="ts" generic="T extends DecimalFieldData | NumberFieldData">
import { computed, reactive } from 'vue'
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
//
// `separator` keeps its original `boolean | null` value so a no-op
// submit (user opens the modal and clicks Finish without touching
// the checkbox) doesn't promote `null` to `false`. The
// `separatorModel` computed below adapts `null` to `false` only for
// the `SInputCheckbox` v-model.
const data = reactive({
  align: props.override.align,
  separator: props.override.separator,
  abbr: props.override.abbr,
  fractionDigits: props.override.fractionDigits
})

// `SInputCheckbox` accepts `boolean | 'indeterminate' | undefined`
// (not `null`), so adapt at the binding boundary. The model writes
// the user's `true`/`false` straight into `data.separator`, while
// `null` from the field-level default stays `null` until the user
// actually flips the checkbox.
const separatorModel = computed({
  get: () => data.separator ?? false,
  set: (v) => { data.separator = v }
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
  // base inputs. We mutate the payload from the base in place rather
  // than re-allocating so any keys it already populated (label,
  // width, freeze) carry through unchanged.
  //
  // Plain `!==` (not the base's `isNotNullOrSame`) is intentional: the
  // four formatting options are tri-state, so clearing a previous
  // `align: 'right'` back to `null` must actually persist `align: null`
  // rather than silently inherit the field-level default.
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
  emit('saved', o as Partial<T>)
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
        <SInputCheckbox v-model="separatorModel" />
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
