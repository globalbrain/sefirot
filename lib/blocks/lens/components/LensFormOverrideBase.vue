<script setup lang="ts">
import SButton from '../../../components/SButton.vue'
import SCard from '../../../components/SCard.vue'
import SCardBlock from '../../../components/SCardBlock.vue'
import SCardClose from '../../../components/SCardClose.vue'
import SCardFooter from '../../../components/SCardFooter.vue'
import SContent from '../../../components/SContent.vue'
import SDoc from '../../../components/SDoc.vue'
import SInputCheckbox from '../../../components/SInputCheckbox.vue'
import SInputNumber from '../../../components/SInputNumber.vue'
import SInputText from '../../../components/SInputText.vue'
import { useTrans } from '../../../composables/Lang'
import { useValidation } from '../../../composables/Validation'
import { maxLength, maxValue } from '../../../validation/rules'
import { type FieldData } from '../FieldData'

const props = defineProps<{
  name: string
  field: FieldData
}>()

const labelEn = defineModel<string | null>('labelEn', { required: true })
const labelJa = defineModel<string | null>('labelJa', { required: true })
const width = defineModel<number | null>('width', { required: true })
const freeze = defineModel<boolean>('freeze', { required: true })

const emit = defineEmits<{
  cancel: []
  saved: [field: any]
}>()

const { t } = useTrans({
  en: {
    title: 'Configure field',
    d_key: 'Field key',
    d_type: 'Field type',
    i_label_en: 'Label (EN)',
    i_label_en_ph: props.field.labelEn,
    i_label_ja: 'Label (JA)',
    i_label_ja_ph: props.field.labelJa,
    i_width: 'Column width',
    i_width_ph: '128',
    i_freeze: 'Freeze column',
    a_cancel: 'Cancel',
    a_apply: 'Finish editing'
  },
  ja: {
    title: '項目情報を設定',
    d_key: '項目キー',
    d_type: '項目タイプ',
    i_label_en: 'ラベル (EN)',
    i_label_en_ph: props.field.labelEn,
    i_label_ja: 'ラベル (JA)',
    i_label_ja_ph: props.field.labelJa,
    i_width: '列の幅',
    i_width_ph: '128',
    i_freeze: '列をフリーズ',
    a_cancel: 'キャンセル',
    a_apply: '編集を完了'
  }
})

const { validation, validateAndNotify } = useValidation(() => ({
  labelEn: labelEn.value,
  labelJa: labelJa.value,
  width: width.value,
  freeze: freeze.value
}), {
  labelEn: { maxLength: maxLength(255) },
  labelJa: { maxLength: maxLength(255) },
  width: { maxValue: maxValue(10000) }
})

function isNotNullOrSame<T>(f: T | null, o: T) {
  return (f !== null && f !== o)
}

async function onSave() {
  if (!(await validateAndNotify())) {
    return
  }
  const data: Partial<FieldData> = {}
  if (isNotNullOrSame(labelEn.value, props.field.labelEn)) {
    data.labelEn = labelEn.value!
  }
  if (isNotNullOrSame(labelJa.value, props.field.labelJa)) {
    data.labelJa = labelJa.value!
  }
  if (isNotNullOrSame(width.value, props.field.width)) {
    data.width = width.value!
  }
  if (isNotNullOrSame(freeze.value, props.field.freeze)) {
    data.freeze = freeze.value!
  }
  emit('saved', data)
}
</script>

<template>
  <SCard class="LensFormOverrideBase" size="large">
    <SCardClose @click="$emit('cancel')" />
    <SCardBlock class="s-p-32">
      <SDoc>
        <SContent>
          <h2>{{ t.title }}</h2>
        </SContent>
        <div class="list">
          <div class="item">
            <div class="key">{{ t.d_key }}</div>
            <div class="value subtle">{{ name }}</div>
          </div>
          <div class="item">
            <div class="key">{{ t.d_type }}</div>
            <div class="value subtle">{{ field.type }}</div>
          </div>
          <div class="item">
            <div class="key">{{ t.i_label_en }}</div>
            <div class="value">
              <SInputText
                v-model="labelEn"
                size="mini"
                :placeholder="t.i_label_en_ph"
                :validation="validation.labelEn"
              />
            </div>
          </div>
          <div class="item">
            <div class="key">{{ t.i_label_ja }}</div>
            <div class="value">
              <SInputText
                v-model="labelJa"
                size="mini"
                :placeholder="t.i_label_ja_ph"
                :validation="validation.labelJa"
              />
            </div>
          </div>
          <div class="item">
            <div class="key">{{ t.i_width }}</div>
            <div class="value">
              <SInputNumber
                v-model="width"
                size="mini"
                :placeholder="t.i_width_ph"
                :validation="validation.width"
              />
            </div>
          </div>
          <div class="item">
            <div class="key">{{ t.i_freeze }}</div>
            <div class="value">
              <SInputCheckbox v-model="freeze" />
            </div>
          </div>
          <!--
            Default slot — field-specific override forms (e.g. number /
            decimal) inject their own `.item` rows here so they line up
            visually with the base inputs.
          -->
          <slot />
        </div>
      </SDoc>
    </SCardBlock>
    <SCardFooter class="s-py-16 s-px-32">
      <SButton
        size="md"
        :label="t.a_cancel"
        @click="$emit('cancel')"
      />
      <SButton
        size="md"
        mode="info"
        :label="t.a_apply"
        @click="onSave"
      />
    </SCardFooter>
  </SCard>
</template>

<style scoped>
.fieldset {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.list {
  display: flex;
  flex-direction: column;
}

:deep(.item) {
  display: grid;
  grid-template-columns: 168px 1fr;
  align-items: center;
  min-height: 48px;
}

:deep(.key) {
  font-size: 14px;
  color: var(--c-text-2);
}

:deep(.value) {
  font-size: 14px;

  &.subtle {
    color: var(--c-text-2);
  }
}
</style>
