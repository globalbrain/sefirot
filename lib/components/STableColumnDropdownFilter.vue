<script setup lang="ts">
import Fuse from 'fuse.js'
import { ref, computed } from 'vue'
import SIconCheck from './icons/SIconCheck.vue'

export interface TableColumnDropdownItemFilterOption {
  label: string
  value: string
  onClick(value: string): void
}

const props = defineProps<{
  search?: boolean
  selected: string[]
  options: TableColumnDropdownItemFilterOption[]
}>()

const query = ref('')

const fuse = computed(() => {
  return new Fuse(props.options, { keys: ['label'] })
})

const filteredOptions = computed(() => {
  if (!props.search || !query.value) {
    return props.options
  }

  return fuse.value.search(query.value).map((r) => r.item)
})

function focusPrev(event: any): void {
  event.target.parentNode.previousElementSibling?.firstElementChild?.focus()
}

function focusNext(event: any): void {
  event.target.parentNode.nextElementSibling?.firstElementChild?.focus()
}
</script>

<template>
  <div class="STableColumnDropdownFilter">
    <div v-if="search" class="search">
      <input class="input" placeholder="Filter options" v-model="query">
    </div>

    <ul v-if="filteredOptions.length" class="list">
      <li
        v-for="option in filteredOptions"
        :key="option.label"
        class="item"
      >
        <button
          class="button"
          :class="{ active: selected.some((s) => s === option.value) }"
          tabindex="0"
          @keyup.up.prevent="focusPrev"
          @keyup.down.prevent="focusNext"
          @click="option.onClick(option.value)"
        >
          <span class="checkbox">
            <span class="checkbox-box">
              <SIconCheck class="checkbox-icon" />
            </span>
          </span>
          <span class="label">{{ option.label }}</span>
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
  padding: 8px;
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

  .search + & {
    border-top: 1px solid var(--c-divider-light);
  }
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
  fill: var(--c-white);
  opacity: 0;
  transition: opacity 0.25s;

  .button.active & {
    opacity: 1;
  }
}

.label {
  padding-left: 8px;
  line-height: 32px;
  font-size: 12px;
  font-weight: 500;
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
