<script setup lang="ts">
import IconCheck from '@iconify-icons/ph/check'
import type { MaybeRef } from '@vueuse/core'
import Fuse from 'fuse.js'
import { ref, computed, unref, onMounted } from 'vue'
import { DropdownSectionFilterSelectedValue, DropdownSectionFilterOption } from '../composables/Dropdown'
import { isArray } from '../support/Utils'
import SDropdownSectionFilterItem from './SDropdownSectionFilterItem.vue'
import SIcon from './SIcon.vue'

const props = defineProps<{
  search?: boolean
  selected: MaybeRef<DropdownSectionFilterSelectedValue>
  options: DropdownSectionFilterOption[]
  onClick?(value: string | number | boolean): void
}>()

const input = ref<HTMLElement | null>(null)
const query = ref('')

const fuse = computed(() => {
  return new Fuse(props.options, { keys: ['label'] })
})

const filteredOptions = computed(() => {
  return !props.search || !query.value
    ? props.options
    : fuse.value.search(query.value).map((r) => r.item)
})

onMounted(() => {
  input.value?.focus()
})

function isActive(value: string | number | boolean) {
  const selected = unref(props.selected)

  return isArray(selected)
    ? selected.some((sv) => sv === value)
    : selected === value
}

function focusPrev(event: any) {
  event.target.parentNode.previousElementSibling?.firstElementChild?.focus()
}

function focusNext(event: any) {
  event.target.parentNode.nextElementSibling?.firstElementChild?.focus()
}

function handleClick(option: DropdownSectionFilterOption, value: string | number | boolean) {
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
          <span class="checkbox">
            <span class="checkbox-box">
              <SIcon :icon="IconCheck" class="checkbox-icon" />
            </span>
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
.search {
  position: sticky;
  top: 0;
  border-bottom: 1px solid var(--c-divider-light);
  padding: 8px;
  background-color: var(--c-bg-elv-up);
}

.input {
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  font-size: 12px;
  line-height: 32px;
  background-color: var(--c-bg);
  transition: border-color 0.25s;

  &::placeholder {
    font-weight: 500;
    color: var(--c-text-3);
  }

  &:hover { border-color: var(--c-black); }
  &:focus { border-color: var(--c-info); }

  .dark &:hover { border-color: var(--c-gray); }
  .dark &:focus { border-color: var(--c-info); }
}

.list {
  padding: 8px;
}

.button {
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  text-align: left;
  transition: color 0.25s, background-color 0.25s;

  &:hover,
  &:focus {
    background-color: var(--c-bg-mute);
  }

  .dark &:hover,
  .dark &:focus {
    background-color: var(--c-bg);
  }
}

.checkbox {
  display: block;
}

.checkbox-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--c-divider);
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--c-bg);
  transition: border-color 0.1s, background-color 0.1s;

  .button.active & {
    border-color: var(--c-info);
    background-color: var(--c-info);
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

.empty {
  padding: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);

  .search + & {
    border-top: 1px solid var(--c-divider-light);
  }
}
</style>
