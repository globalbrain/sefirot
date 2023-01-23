<script setup lang="ts">
import IconDotsThree from '@iconify-icons/ph/dots-three'
import { computed, nextTick, ref, unref, watch } from 'vue'
import { DropdownSection } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { isArray } from '../support/Utils'
import SDropdown from './SDropdown.vue'
import SIcon from './SIcon.vue'

const props = defineProps<{
  name: string
  label: string
  className?: string
  dropdown?: DropdownSection[]
}>()

const emit = defineEmits<{
  (e: 'resize', value: string): void
}>()

const { container, isOpen, toggle } = useFlyout()

let startWidth = 0
let startPoint = 0

const column = ref<HTMLElement | null>(null)
const dialog = ref<HTMLElement | null>(null)
const top = ref('')
const left = ref('')

const active = computed(() => {
  return props.dropdown?.some((item) => {
    if (item.type !== 'filter') {
      return false
    }

    const selected = unref(item.selected)

    if (!isArray(selected)) {
      return selected !== null
    }

    if (!selected.length) {
      return false
    }

    return unref(item.options).some((option) => {
      return selected.includes(option.value)
    })
  })
})

const buttonActive = computed(() => {
  return isOpen.value || active.value
})

watch(isOpen, (value) => {
  value ? adjustDialogPosition() : stopDialogPositionListener()
})

function grip(e: any) {
  startWidth = column.value?.offsetWidth ?? 0
  startPoint = e.pageX

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResizeListener)
}

function resize(e: MouseEvent) {
  const movedWidth = e.pageX - startPoint
  const resized = startWidth + movedWidth

  emit('resize', resized > -1 ? `${resized}px` : 'var(--table-col-width)')
}

function stopResizeListener() {
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResizeListener)
}

async function adjustDialogPosition() {
  if (!props.dropdown || !isOpen.value) {
    return
  }

  startDialogPositionListener()

  const rect = container.value.getBoundingClientRect()

  await nextTick()

  const dialogWidth = dialog.value?.offsetWidth ?? 0
  const position = (window.innerWidth - rect.right) > dialogWidth ? 'right' : 'left'

  top.value = `${rect.top + rect.height - 8}px`
  left.value
    = `${Math.max(
      16,
      position === 'right' ? rect.left - 4 : rect.right - dialogWidth - 4
    )}px`
}

function startDialogPositionListener() {
  window.addEventListener('scroll', adjustDialogPosition)
  window.addEventListener('resize', adjustDialogPosition)
}

function stopDialogPositionListener() {
  window.removeEventListener('scroll', adjustDialogPosition)
  window.removeEventListener('resize', adjustDialogPosition)
}
</script>

<template>
  <div class="STableColumn STableCell" :class="[{ active }, className, `col-${name}`]" ref="column">
    <div class="container">
      <p class="label">{{ label }}</p>

      <div v-if="dropdown" class="action" ref="container">
        <button class="button" :class="{ active: buttonActive }" @click="toggle">
          <SIcon :icon="IconDotsThree" class="icon" />
        </button>

        <transition name="fade">
          <div v-if="isOpen" class="dialog" :style="{ top, left }" ref="dialog">
            <SDropdown :sections="dropdown" />
          </div>
        </transition>
      </div>

      <div class="grip" @mousedown="grip" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableColumn {
  border-top: 1px solid var(--c-divider-light);
  background-color: var(--c-bg-soft);

  .STableItem:first-child & {
    padding-left: var(--table-padding-left);
  }

  .STableItem:last-child & {
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
  margin: 0;
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
  width: 20px;
  height: 20px;
}

.dialog {
  position: fixed;
  z-index: var(--z-index-dropdown);
  border-radius: 12px;
  width: 256px;
  box-shadow: var(--shadow-depth-3);
  transition: opacity 0.25s, transform 0.25s;
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
    left: 7px;
    width: 3px;
    content: "";
    transition: background-color 0.25s;
  }

  &:hover::before {
    background-color: var(--c-info);
  }

  .STableItem:last-child .STableColumn & {
    right: 0;
    width: 8px;
  }

  .STableItem:last-child .STableColumn &::before {
    left: 6px;
    width: 2px;
  }
}
</style>
