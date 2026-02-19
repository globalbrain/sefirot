<script setup lang="ts">
import IconBook from '~icons/ph/book'
import IconBookOpenText from '~icons/ph/book-open-text'
import IconFunnelSimple from '~icons/ph/funnel-simple'
import IconLightning from '~icons/ph/lightning'
import IconMagnifyingGlass from '~icons/ph/magnifying-glass'
import IconSlidersHorizontal from '~icons/ph/sliders-horizontal'
import IconX from '~icons/ph/x'
import { computed } from 'vue'
import { type ActionList } from '../../../components/SActionList.vue'
import SActionMenu from '../../../components/SActionMenu.vue'
import SButton from '../../../components/SButton.vue'
import SInputText from '../../../components/SInputText.vue'
import { type DropdownSectionMenu } from '../../../composables/Dropdown'
import { useTrans } from '../../../composables/Lang'

export interface Props {
  queryPh?: string
  filterPresets?: FilterPresets[]
  selected?: number[]
  showQuery?: boolean
  showFilters?: boolean
  isConditionActive?: boolean
  isConditionDisabled?: boolean
}

export interface FilterPresets {
  label: string
  filters: any[]
}

const props = defineProps<Props>()

const query = defineModel<string | null>('query', { required: true })

const emit = defineEmits<{
  'search': [query: string | null]
  'filter': []
  'filter-preset-selected': [filters: any[]]
  'view': []
  'reset-selection': []
  'toggle-conditions': []
}>()

const { t } = useTrans({
  en: {
    i_query_ph: 'Search records',
    a_filter_preset: 'Quick filters',
    a_filter: 'Filters',
    a_view: 'View',
    a_conditions: 'View current conditions',
    selected_text: (c: number) => `${c} selected`
  },
  ja: {
    i_query_ph: 'レコードを検索',
    a_filter_preset: 'クイックフィルター',
    a_conditions: '現在の検索条件を表示',
    a_filter: '詳細検索',
    a_view: '表示',
    selected_text: (c: number) => `${c}件選択中`
  }
})

const presetOptions = computed<DropdownSectionMenu[]>(() => {
  return [
    {
      type: 'menu',
      options: createFilterPresetOptions()
    }
  ]
})

function createFilterPresetOptions(): ActionList {
  return props.filterPresets?.map((preset) => {
    return {
      label: preset.label,
      onClick: () => { emit('filter-preset-selected', preset.filters) }
    }
  }) || []
}
</script>

<template>
  <SCardBlock class="LensCatalogControl">
    <template v-if="!selected || selected.length === 0">
      <div class="main">
        <SInputText
          v-if="showQuery"
          class="s-w-320"
          size="sm"
          :unit-before="IconMagnifyingGlass"
          :placeholder="queryPh ?? t.i_query_ph"
          :model-value="query"
          @enter="$emit('search', $event)"
        />
        <SActionMenu
          v-if="filterPresets?.length"
          type="outline"
          size="sm"
          :icon="IconLightning"
          :label="t.a_filter_preset"
          :options="presetOptions"
        />
        <SButton
          v-if="showFilters"
          type="outline"
          size="sm"
          :icon="IconFunnelSimple"
          :label="t.a_filter"
          @click="$emit('filter')"
        />
        <SButton
          type="outline"
          size="sm"
          :icon="IconSlidersHorizontal"
          :label="t.a_view"
          @click="$emit('view')"
        />
      </div>
      <div class="sub">
        <slot name="sub-left" />
        <SButton
          type="outline"
          size="sm"
          :icon="isConditionActive ? IconBookOpenText : IconBook"
          :disabled="isConditionDisabled"
          :tooltip="t.a_conditions"
          @click="$emit('toggle-conditions')"
        />
        <slot name="sub-right" />
      </div>
    </template>
    <template v-else>
      <div class="selected">
        <div class="selected-box">
          <div class="selected-text">
            {{ t.selected_text(selected.length) }}
          </div>
          <button class="selected-reset" @click="$emit('reset-selection')">
            <IconX class="selected-reset-icon" />
          </button>
        </div>
      </div>
    </template>
  </SCardBlock>
</template>

<style scoped lang="postcss">
.LensCatalogControl {
  display: flex;
  align-items: center;
  border-radius: 5px 5px 0 0;
  padding: var(--lens-catalog-control-padding, 0 12px);
  height: 48px;
}

.main {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 8px;
}

.selected {
  display: flex;
  align-items: center;
  gap: 8px;
}

.selected-box {
  display: flex;
  align-items: center;
  border: 1px dashed var(--c-divider);
  border-radius: 6px;
  height: 32px;
  overflow: hidden;
}

.selected-text {
  border-right: 1px dashed var(--c-divider);
  padding: 0 10px;
  font-size: 12px;
  font-feature-settings: "tnum";
}

.selected-reset {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  transition: background-color 0.25s;

  &:hover {
    background-color: var(--c-bg-2);
  }

  &:active {
    background-color: var(--c-bg-3);
    transition: background-color 0.1s;
  }
}

.selected-reset-icon {
  width: 14px;
  height: 14px;
}

.selected-divider {
  width: 1px;
  height: 24px;
  background-color: var(--c-divider);
}

.sub {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
