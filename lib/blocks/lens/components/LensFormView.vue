<script setup lang="ts">
import IconCheck from '~icons/ph/check'
import IconDotsSixVertical from '~icons/ph/dots-six-vertical'
import IconGear from '~icons/ph/gear'
import IconMinus from '~icons/ph/minus'
import IconTrash from '~icons/ph/trash'
import { cloneDeep } from 'lodash-es'
import { computed, ref } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import SButton from '../../../components/SButton.vue'
import SInputCheckbox from '../../../components/SInputCheckbox.vue'
import { useLang, useTrans } from '../../../composables/Lang'
import { usePower } from '../../../composables/Power'
import { type FieldData } from '../FieldData'
import LensFormOverride from './LensFormOverride.vue'

interface Props {
  select: string[]
  selectable: string[]
  fields: Record<string, FieldData>
  overrides: Record<string, Partial<FieldData>>
}

interface SelectOption {
  uid: number
  key: string
  value: boolean
  isEmpty: boolean
  field: FieldData | null
  override: Partial<FieldData>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  cancel: []
  apply: [select: string[], selectable: string[], overrides: Record<string, Partial<FieldData>>]
}>()

const lang = useLang()

const { t } = useTrans({
  en: {
    title: 'Manage table view',
    a_select_all: 'Select all',
    a_clear_all: 'Clear all',
    a_cancel: 'Cancel',
    a_apply: 'Apply changes'
  },
  ja: {
    title: 'テーブルの表示を更新する',
    a_select_all: 'すべて選択',
    a_clear_all: 'すべて解除',
    a_cancel: 'キャンセル',
    a_apply: '変更を適用'
  }
})

const editDialog = usePower()

let _uid = 0

const el = ref<HTMLElement | null>(null)

const _select = ref(cloneDeep(props.select))
const _selectable = ref(cloneDeep(props.selectable))

const _selectDict = computed(() => {
  return _select.value.reduce((acc, s) => {
    acc[s] = true
    return acc
  }, {} as Record<string, boolean>)
})

const _overrides = cloneDeep(props.overrides) ?? {}

const selectOptions = ref(createSelectOptions())

const selectedOption = ref<SelectOption | null>(null)

useDraggable(el, selectOptions, {
  handle: '.handle'
})

function createSelectOptions(): SelectOption[] {
  return _selectable.value.map((s) => {
    return {
      uid: _uid++,
      key: s,
      value: _selectDict.value[s],
      isEmpty: s === '__empty__',
      field: props.fields[s],
      override: _overrides[s] || {}
    }
  })
}

function getName(s: SelectOption): string {
  return lang === 'ja'
    ? s.override.labelJa || s.field?.labelJa || ''
    : s.override.labelEn || s.field?.labelEn || ''
}

function onEdit(option: SelectOption) {
  selectedOption.value = option
  editDialog.on()
}

function onEdited(field: Partial<FieldData>) {
  selectedOption.value!.override = field
  editDialog.off()
  selectedOption.value = null
}

function onSelectAll() {
  selectOptions.value.forEach((s) => {
    s.value = true
  })
}

function onClearAll() {
  selectOptions.value.forEach((s) => {
    s.value = false
  })
}

function onRemove(uid: number) {
  const index = selectOptions.value.findIndex((s) => s.uid === uid)
  if (index !== -1) {
    selectOptions.value.splice(index, 1)
  }
}

async function onApply() {
  const select = selectOptions.value.filter((s) => s.value).map((s) => s.key)

  const selectable = selectOptions.value.map((s) => s.key)

  const overrides = selectOptions.value.reduce<Record<string, Partial<FieldData>>>((acc, s) => {
    if (s.override && Object.keys(s.override).length > 0) {
      acc[s.key] = s.override
    }
    return acc
  }, {} as Record<string, Partial<FieldData>>)

  emit('apply', select, selectable, overrides)
}
</script>

<template>
  <SCard class="LensFormView" size="medium">
    <SCardBlock class="s-p-32">
      <SDoc>
        <SContent>
          <h2>{{ t.title }}</h2>
        </SContent>
        <div class="main">
          <div class="actions">
            <SButton
              type="outline"
              size="small"
              mode="mute"
              :icon="IconCheck"
              :label="t.a_select_all"
              @click="onSelectAll"
            />
            <SButton
              type="outline"
              size="small"
              mode="mute"
              :icon="IconMinus"
              :label="t.a_clear_all"
              @click="onClearAll"
            />
          </div>
          <div ref="el" class="list">
            <div
              v-for="s, i in selectOptions"
              :key="s.uid"
              class="item"
              :class="{ selected: s.value, empty: s.isEmpty }"
            >
              <div class="input" role="button" @click="selectOptions[i].value = !s.value">
                <div class="handle">
                  <IconDotsSixVertical class="handle-svg" />
                </div>
                <div class="body">
                  <SInputCheckbox
                    :model-value="s.value"
                  />
                  <div class="key">
                    {{ getName(s) }}
                  </div>
                </div>
              </div>
              <div class="remove">
                <SButton
                  v-if="!s.isEmpty"
                  type="text"
                  size="small"
                  mode="mute"
                  :icon="IconGear"
                  @click="onEdit(s)"
                />
                <SButton
                  v-if="s.isEmpty"
                  type="text"
                  size="small"
                  mode="mute"
                  :icon="IconTrash"
                  @click="onRemove(s.uid)"
                />
              </div>
            </div>
          </div>
          <div class="actions" />
        </div>
      </SDoc>
    </SCardBlock>
    <SCardBlock class="s-py-16 s-px-32">
      <SControl size="md">
        <SControlRight>
          <SControlButton
            :label="t.a_cancel"
            @click="$emit('cancel')"
          />
          <SControlButton
            mode="info"
            :label="t.a_apply"
            @click="onApply"
          />
        </SControlRight>
      </SControl>
    </SCardBlock>

    <SModal :open="editDialog.state.value" @close="editDialog.off()">
      <LensFormOverride
        v-if="selectedOption?.field && selectedOption?.override"
        :name="selectedOption.key"
        :field="selectedOption.field"
        :override="selectedOption.override"
        @cancel="editDialog.off()"
        @saved="onEdited"
      />
    </SModal>
  </SCard>
</template>

<style scoped lang="postcss">
.LensFormView {
  --c-bg-elv-2: var(--c-bg-1);
  --c-bg-elv-3: var(--c-bg-1);
}

.main {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;

  &.selected .key {
    color: var(--c-text-1);
  }

  &.selected.empty .key {
    color: var(--c-text-2);
  }

  &.empty .key {
    color: var(--c-text-3);
  }
}

.input {
  display: flex;
  flex-grow: 1;
  gap: 1px;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  background-color: var(--c-gutter);
  overflow: hidden;
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--c-border-mute-2);
  }
}

.handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--c-bg-1);
  cursor: grab;
}

.handle-svg {
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
}

.body {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 0 8px;
  background-color: var(--c-bg-1);
}

.key {
  flex-grow: 1;
  padding: 0 8px;
  line-height: 32px;
  font-size: 14px;
  color: var(--c-text-3);
  transition: color 0.25s;
}

.remove {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 32px;
}

.actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
}
</style>
