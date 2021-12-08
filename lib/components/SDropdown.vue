<template>
  <div class="SDropdown">
    <div v-if="options.title" class="header">
      <p class="title">{{ options.title }}</p>
      <button class="close" @click="$emit('close')">
        <SIconX class="close-icon" />
      </button>
    </div>

    <div v-if="options.search" class="search">
      <SInputText
        size="mini"
        mode="outlined"
        :placeholder="options.search.placeholder"
        :model-value="options.search.value.value"
        @update:model-value="v => options.search?.onInput(v)"
      />
    </div>

    <div class="container">
      <ul v-if="options.items.value.length > 0" class="list">
        <li
          v-for="(item, index) in options.items.value"
          :key="index"
          class="item"
          tabindex="0"
          @keydown.up.prevent
          @keydown.down.prevent
          @keyup.up.prevent="focusPrev"
          @keyup.down.prevent="focusNext"
          @keyup.enter="onClick(item)"
          @keyup.escape="$emit('close')"
          @click="onClick(item)"
        >
          <SDropdownItem :selected="options.selected" :item="item" />
        </li>
      </ul>

      <p v-else class="item-missing">{{ options.search?.missing }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Dropdown, Item } from '../composables/Dropdown'
import SIconX from './icons/SIconX.vue'
import SInputText from './SInputText.vue'
import SDropdownItem from './SDropdownItem.vue'

const props = defineProps({
  round: { type: Number, default: 8 },
  options: { type: Object as PropType<Dropdown>, required: true }
})

const emit = defineEmits(['close'])

function focusFirstItem(): void {
  const el = document.querySelector('.SDropdown .item:first-child') as HTMLElement | null
  el?.focus?.()
}

function focusPrev(event: any): void {
  event.target.previousSibling?.focus()
}

function focusNext(event: any): void {
  event.target.nextSibling?.focus()
}

function onClick(item: Item): void {
  if (item.callback) {
    item.callback()
  } else if (props.options.callback) {
    props.options.callback(item)
  }

  if (props.options.closeOnClick) {
    emit('close')
  }
}
</script>

<style lang="postcss" scoped>
.SDropdown {
  display: inline-block;
  overflow: hidden;
  min-width: 192px;
  border: 1px solid var(--c-divider-light);
  border-radius: 8px;
  background-color: var(--c-white);
  box-shadow: var(--shadow-depth-3);
  transition: background-color .25s;
}

.dark .SDropdown {
  background-color: var(--c-black-soft);
}

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--c-divider-light);
  padding: 0 0 0 16px;
}

.title {
  padding: 4px 0 3px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 31px;
  color: var(--c-text-2);

  &:hover {
    color: var(--c-text-1);
  }
}

.close-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.search {
  padding: 8px 8px 7px;
  border-bottom: 1px solid var(--c-divider-light);
}

.container {
  max-height: 304px;
  overflow-y: auto;
}

.item {
  &:hover,
  &:focus {
    background-color: var(--dropdown-item-hover-bg);
    outline: none;
  }
}

.item:first-child {
  padding-top: 1px;
}

.item + .item {
  border-top: 1px solid var(--c-divider-light);
}

.item-missing {
  margin: 0;
  padding: 8px 16px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}
</style>
