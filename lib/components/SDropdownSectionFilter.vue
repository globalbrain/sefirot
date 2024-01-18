<script setup lang="ts">
import IconCheck from '@iconify-icons/ph/check'
import Fuse from 'fuse.js'
import { type MaybeRef, computed, onMounted, ref, unref } from 'vue'
import { type DropdownSectionFilterOption, type DropdownSectionFilterSelectedValue } from '../composables/Dropdown'
import { isArray } from '../support/Utils'
import SDropdownSectionFilterItem from './SDropdownSectionFilterItem.vue'
import SIcon from './SIcon.vue'

const props = defineProps<{
  search?: boolean
  selected: MaybeRef<DropdownSectionFilterSelectedValue>
  options: MaybeRef<DropdownSectionFilterOption[]>
  onClick?(value: any): void
}>()

const input = ref<HTMLElement | null>(null)
const query = ref('')

const enabledOptions = computed(() => {
  return unref(props.options).filter((o) => !o.disabled)
})

const fuse = computed(() => {
  return new Fuse(unref(enabledOptions), { keys: ['label'] })
})

const filteredOptions = computed(() => {
  return (!props.search || !query.value)
    ? unref(enabledOptions)
    : fuse.value.search(query.value).map((r) => r.item)
})

onMounted(() => {
  input.value?.focus()
})

function isActive(value: any) {
  const selected = unref(props.selected)

  return isArray(selected)
    ? selected.includes(value)
    : selected === value
}

function focusPrev(event: any) {
  event.target.parentNode.previousElementSibling?.firstElementChild?.focus()
}

function focusNext(event: any) {
  event.target.parentNode.nextElementSibling?.firstElementChild?.focus()
}

function handleClick(option: DropdownSectionFilterOption, value: any) {
  option.onClick && option.onClick(value)
  props.onClick && props.onClick(value)
}
</script>

<template>
  <div class="SDropdownSectionFilter">
    <div v-if="search" class="search">
      <input class="input" placeholder="Filter options" ref="input" v-model="query">
    </div>

    <ul v-if="filteredOptions.length" class="list">
      <li v-for="option in filteredOptions" :key="option.label" class="item">
        <button
          class="button"
          :class="{ active: isActive(option.value) }"
          tabindex="0"
          @keyup.up.prevent="focusPrev"
          @keyup.down.prevent="focusNext"
          @click="handleClick(option, option.value)"
        >
          <span v-if="isArray(unref(selected))" class="checkbox">
            <span class="checkbox-box">
              <SIcon :icon="IconCheck" class="checkbox-icon" />
            </span>
          </span>
          <span v-else class="radio">
            <span class="radio-dot" />
          </span>
          <span class="option-item">
            <SDropdownSectionFilterItem :option="option" />
          </span>
        </button>
      </li>
    </ul>

    <p v-else class="empty">
      No options found.
    </p>
  </div>
</template>

<style scoped lang="postcss">
.SDropdownSectionFilter {
  background-color: var(--c-bg-elv-3);
}

.search {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--c-gutter);
  padding: 8px;
}

.input {
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  font-size: 14px;
  font-family: var(--input-value-font-family);
  line-height: 32px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  &:hover { border-color: var(--input-hover-border-color); }
  &:focus { border-color: var(--input-focus-border-color); }
}

.list {
  padding: 8px;
}

.button {
  display: flex;
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  text-align: left;
  transition: color 0.25s, background-color 0.25s;

  &:hover,
  &:focus {
    background-color: var(--c-bg-mute-1);
  }
}

.checkbox {
  display: block;
  padding-top: 8px;
  padding-bottom: 8px;
}

.checkbox-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--c-border-mute-1);
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.1s, background-color 0.1s;

  .button.active & {
    border-color: var(--c-fg-info-1);
    background-color: var(--c-fg-info-1);
  }
}

.checkbox-icon {
  display: block;
  width: 10px;
  height: 10px;
  color: var(--c-white);
  opacity: 0;
  transition: opacity 0.25s;

  .button.active & {
    opacity: 1;
  }
}

.radio {
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--c-border-mute-1);
  border-radius: 50%;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;

  .button.active & {
    border-color: var(--c-border-info-1);
  }
}

.radio-dot {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  background-color: var(--c-fg-info-1);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.25s, transform 0.1s;

  .button.active & {
    opacity: 1;
    transform: scale(0.6);
  }
}

.option-item {
  padding-left: 12px;
  width: 100%;
}

.empty {
  padding: 14px 16px;
  font-size: 12px;
  color: var(--c-text-2);
}
</style>
