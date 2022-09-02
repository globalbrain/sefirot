<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import SIconMoreHorizontal from './icons/SIconMoreHorizontal.vue'
import { useFlyout } from '../composables/Flyout'
import STableColumnDropdown, { TableColumnDropdownItem } from './STableColumnDropdown.vue'

const props = defineProps<{
  label: string
  dropdown?: TableColumnDropdownItem[]
}>()

const { container, isOpen, toggle } = useFlyout()

let startWidth = 0
let startPoint = 0

const columnWidth = ref('auto')
const position = ref('')

const active = computed(() => {
  return props.dropdown?.some((item) => {
    if (item.type !== 'filter') {
      return false
    }

    if (!item.selected.length) {
      return false
    }

    return item.options.some((option) => {
      return item.selected.includes(option.value)
    })
  })
})

const buttonActive = computed(() => {
  return isOpen.value || active.value
})

function grip(e: any) {
  startWidth = e.target.parentElement.parentElement.offsetWidth
  startPoint = e.pageX

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', done)
}

function resize(e: MouseEvent) {
  const movedWidth = e.pageX - startPoint
  columnWidth.value = `${startWidth + movedWidth}px`
}

function done() {
  document.removeEventListener('mousemove', resize)
}

watch(isOpen, async (value) => {
  if (!props.dropdown || !value) {
    return
  }

  const rect = container.value.getBoundingClientRect()

  position.value = (window.innerWidth - rect.right) < 304 ? 'left' : 'right'

  await nextTick()

  const el = document.querySelector<HTMLInputElement>('.STableColumnDropdown .STableColumnDropdownFilter .search input')

  el && el.focus()
})
</script>

<template>
  <th class="STableColumn" :class="[{ active }, position]">
    <div class="content">
      <p class="label">{{ label }}</p>

      <div v-if="dropdown" class="action" ref="container">
        <button class="button" :class="{ active: buttonActive }" @click="toggle">
          <SIconMoreHorizontal class="icon" />
        </button>

        <transition name="fade">
          <div v-if="isOpen" class="dialog">
            <STableColumnDropdown :dropdown="dropdown" />
          </div>
        </transition>
      </div>

      <div class="resizer" @mousedown="grip"/>
    </div>
  </th>
</template>

<style scoped lang="postcss">
.STableColumn {
  width: v-bind(columnWidth);
  min-width: v-bind(columnWidth);
  max-width: v-bind(columnWidth);
  position: relative;
  padding: 0 16px;
  background-color: var(--c-bg-soft);

  & + & {
    border-left: 1px solid var(--c-divider-light);
  }

  .STableRow:first-child &:first-child {
    border-radius: 12px 0 0 0;
  }

  .STableRow:first-child &:last-child {
    border-radius: 0 12px 0 0;
  }
}

.content {
  display: flex;
  justify-content: space-between;
}

.label {
  flex-grow: 1;
  line-height: 40px;
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-2);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  .STableColumn.active & {
    color: var(--c-info);
  }
}

.action {
  position: relative;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 6px -10px 6px 0;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  color: var(--c-text-2);
  transition: background-color 0.25s, color 0.25s;

  &:hover {
    color: var(--c-text-1);
    background-color: var(--c-bg-mute);
  }

  &.active {
    color: var(--c-info);
  }

  .dark &:hover {
    background-color: var(--c-bg);
  }
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.dialog {
  position: absolute;
  top: 32px;
  z-index: var(--z-index-dropdown);
  border-radius: 12px;
  box-shadow: var(--shadow-depth-3);
  transition: opacity 0.25s, transform 0.25s;

  .STableColumn.left &  { right: -12px; }
  .STableColumn.right & { left: -4px; }
}

.dialog.fade-enter-from,
.dialog.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.resizer {
  padding-left: 8px;
  right: -8px;
  top: 0px;
  bottom: 0px;
  width: 16px;
  z-index: 1;
  position: absolute;

  cursor: col-resize;
}
</style>
