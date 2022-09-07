<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { TableDropdownSection } from '../composables/Table'
import { useFlyout } from '../composables/Flyout'
import STableDropdownSection from './STableDropdownSection.vue'
import SIconMoreHorizontal from './icons/SIconMoreHorizontal.vue'

const props = defineProps<{
  name: string
  label: string
  className?: string
  dropdown?: TableDropdownSection[]
}>()

const emit = defineEmits<{
  (e: 'resize', value: string): void
}>()

const { container, isOpen, toggle } = useFlyout()

let startWidth = 0
let startPoint = 0

const column = ref<HTMLElement | null>(null)
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
  startWidth = column.value?.offsetWidth ?? 0
  startPoint = e.pageX

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', done)
}

function resize(e: MouseEvent) {
  const movedWidth = e.pageX - startPoint

  emit('resize', `${startWidth + movedWidth}px`)
}

function done() {
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', done)
}

watch(isOpen, async (value) => {
  if (!props.dropdown || !value) {
    return
  }

  const rect = container.value.getBoundingClientRect()

  position.value = (window.innerWidth - rect.right) < 304 ? 'left' : 'right'
})
</script>

<template>
  <th class="STableColumn STableCell" :class="[{ active }, position, className ?? name]" ref="column">
    <div class="container">
      <p class="label">{{ label }}</p>

      <div v-if="dropdown" class="action" ref="container">
        <button class="button" :class="{ active: buttonActive }" @click="toggle">
          <SIconMoreHorizontal class="icon" />
        </button>

        <transition name="fade">
          <div v-if="isOpen" class="dialog">
            <STableDropdownSection :sections="dropdown" />
          </div>
        </transition>
      </div>

      <div class="grip" @mousedown="grip" />
    </div>
  </th>
</template>

<style scoped lang="postcss">
.STableColumn {
  position: relative;
  border-right: 1px solid var(--c-divider-light);
  max-width: 0;
  background-color: var(--c-bg-soft);

  &:first-child {
    padding-left: var(--table-padding-left);
  }

  &:last-child {
    border-right: 0;
    padding-right: var(--table-padding-right);
  }
}

.container {
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
}

.label {
  flex-grow: 1;
  line-height: 40px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--c-text-2);
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
  padding-right: 6px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 6px 0;
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

  .STableColumn.left &  { right: 4px; }
  .STableColumn.right & { left: 4px; }
}

.dialog.fade-enter-from,
.dialog.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.grip {
  position: relative;
  right: -8px;
  top: 0px;
  bottom: 0px;
  width: 16px;
  z-index: 1;
  position: absolute;
  cursor: col-resize;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 8px;
    width: 1px;
    content: "";
    transition: background-color 0.25s;
  }

  &:hover::before {
    background-color: var(--c-info);
  }

  .STableColumn:last-child & {
    right: 0;
    width: 8px;
  }

  .STableColumn:last-child &::before {
    left: 7px;
  }
}
</style>
