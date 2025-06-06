<script setup lang="ts">
import IconDotsThree from '~icons/ph/dots-three'
import { computed, nextTick, ref, unref, watch } from 'vue'
import { type DropdownSection } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import SDropdown from './SDropdown.vue'

const props = withDefaults(defineProps<{
  name: string
  label?: string
  className?: string
  dropdown?: DropdownSection[]
  hasHeader: boolean
  resizable?: boolean
}>(), {
  resizable: true
})

const emit = defineEmits<{
  resize: [value: string]
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

    if (!Array.isArray(selected)) {
      return selected != null
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

const classes = computed(() => [
  { active: active.value },
  { 'has-header': props.hasHeader },
  props.className,
  `col-${props.name}`
])

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
  const rect = container.value?.getBoundingClientRect()

  if (!props.dropdown || !isOpen.value || !rect) {
    return
  }

  startDialogPositionListener()

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
  <div class="STableColumn STableCell" :class="classes" ref="column">
    <div class="container">
      <slot>
        <p class="label">{{ label }}</p>

        <div v-if="dropdown" class="action" ref="container">
          <button class="button" :class="{ active: buttonActive }" @click="toggle">
            <IconDotsThree class="icon" />
          </button>

          <transition name="fade">
            <div v-if="isOpen" class="dialog" :style="{ top, left }" ref="dialog">
              <SDropdown :sections="dropdown" />
            </div>
          </transition>
        </div>

        <div v-if="resizable" class="grip" @mousedown="grip" />
      </slot>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableColumn {
  background-color: var(--c-bg-elv-3);

  &.has-header {
    border-top: 1px solid var(--c-gutter);
  }

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
  min-height: 40px;
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
    color: var(--c-text-info-1);
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
    background-color: var(--c-bg-mute-1);
  }

  &.active {
    color: var(--c-text-info-1);
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
  position: absolute;
  right: -8px;
  top: 0px;
  bottom: 0px;
  width: 16px;
  z-index: 1;
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
    background-color: var(--c-border-info-1);
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
