<script setup lang="ts">
import IconCaretLeft from '~icons/ph/caret-left-bold'
import IconCaretRight from '~icons/ph/caret-right-bold'
import { type Component, computed, nextTick, ref, watch } from 'vue'
import { useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { type Validatable } from '../composables/Validation'
import { type Day, day } from '../support/Day'
import SInputBase, { type Color, type Size } from './SInputBase.vue'

export type { Color, Size }

type PickerType = 'single' | 'range'
type ViewMode = 'date' | 'month' | 'year' | 'multi-year'
type RangeValue = [Day | null, Day | null]

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  block?: boolean
  disabled?: boolean
  tabindex?: -1 | 0 | number
  modelValue: Day | RangeValue | null
  type?: PickerType
  min?: Day | string | null
  max?: Day | string | null
  placeholder?: string
  closeOnSelect?: boolean
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  'update:model-value': [value: Day | RangeValue | null]
}>()

const mode = computed<PickerType>(() => props.type ?? 'single')

const classes = computed(() => [
  props.size ?? 'small'
])

const minDay = computed(() => normalizeDay(props.min)?.startOf('day') ?? null)
const maxDay = computed(() => normalizeDay(props.max)?.startOf('day') ?? null)

const container = ref<HTMLDivElement>()
const grid = ref<HTMLDivElement>()
const navPrev = ref<HTMLButtonElement>()
const navNext = ref<HTMLButtonElement>()
const titleBtn = ref<HTMLButtonElement>()
const input = ref<HTMLInputElement>()

const { isOpen, open, close } = useFlyout(container)
const { inset, update: updatePosition } = useManualDropdownPosition(container)

const viewMode = ref<ViewMode>('date')
const viewCursor = ref(day().startOf('month'))
const focusedDate = ref(day().startOf('day'))
const hoverDate = ref<Day | null>(null)

const singleValue = ref<Day | null>(null)
const rangeValue = ref<RangeValue>([null, null])
const inputText = ref('')

const today = day().startOf('day')
const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

watch(() => props.modelValue, syncFromModel, { immediate: true })

watch(isOpen, async (value) => {
  if (value) {
    await nextTick()
    grid.value?.focus()
  } else {
    hoverDate.value = null
  }
})

function syncFromModel() {
  if (mode.value === 'range') {
    const normalized = normalizeRange(props.modelValue)
    rangeValue.value = normalized
    singleValue.value = null
    focusedDate.value = clampDate(normalized[0] ?? normalized[1] ?? day())
    viewCursor.value = focusedDate.value.startOf('month')
    inputText.value = formatRange(normalized)
    return
  }

  const normalized = normalizeDay(props.modelValue as any)
  singleValue.value = normalized
  rangeValue.value = [null, null]
  focusedDate.value = clampDate(normalized ?? day())
  viewCursor.value = focusedDate.value.startOf('month')
  inputText.value = formatDate(normalized)
}

function normalizeDay(value: Day | string | null | undefined): Day | null {
  if (value == null) {
    return null
  }

  const d = day(value)
  return d.isValid() ? d : null
}

function normalizeRange(value: any): RangeValue {
  if (Array.isArray(value)) {
    const start = normalizeDay(value[0])
    const end = normalizeDay(value[1])
    return sortRange([start, end])
  }

  return [null, null]
}

function sortRange(range: RangeValue): RangeValue {
  const [start, end] = range

  if (start && end && start.isAfter(end, 'day')) {
    return [end, start]
  }

  return [start ?? null, end ?? null]
}

function clampDate(value: Day): Day {
  if (minDay.value && value.isBefore(minDay.value, 'day')) {
    return minDay.value
  }

  if (maxDay.value && value.isAfter(maxDay.value, 'day')) {
    return maxDay.value
  }

  return value
}

function formatDate(value: Day | null): string {
  return value ? value.format('YYYY-MM-DD') : ''
}

function formatRange(range: RangeValue): string {
  const [start, end] = sortRange(range)

  if (start && end) {
    return `${formatDate(start)} \u2013 ${formatDate(end)}`
  }

  if (start) {
    return `${formatDate(start)} \u2013`
  }

  return ''
}

function handleOpen() {
  if (props.disabled) {
    return
  }

  updatePosition()
  viewMode.value = 'date'
  focusedDate.value = clampDate(getActiveDate())
  viewCursor.value = focusedDate.value.startOf('month')
  open()
}

function getActiveDate(): Day {
  if (mode.value === 'range') {
    const [start, end] = rangeValue.value
    if (end) {
      return end
    }
    if (start) {
      return start
    }
  } else if (singleValue.value) {
    return singleValue.value
  }

  return clampDate(today)
}

function handleInputChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  inputText.value = value

  if (!value.trim()) {
    clearValue()
    return
  }

  if (mode.value === 'range') {
    const parsed = parseRangeInput(value)
    if (parsed) {
      applyRange(parsed, true)
    }
    return
  }

  const parsed = normalizeDay(value)
  if (parsed && !isDisabled(parsed)) {
    applySingle(parsed)
  }
}

function parseRangeInput(value: string): RangeValue | null {
  const parts = value.split(/\s*[–-]\s*/)

  if (parts.length < 2) {
    return null
  }

  const start = normalizeDay(parts[0])
  const end = normalizeDay(parts[1])

  if (!start || !end) {
    return null
  }

  if (isDisabled(start) || isDisabled(end)) {
    return null
  }

  return sortRange([start, end])
}

function clearValue() {
  singleValue.value = null
  rangeValue.value = [null, null]
  emit('update:model-value', null)
}

function isDisabled(date: Day): boolean {
  if (minDay.value && date.isBefore(minDay.value, 'day')) {
    return true
  }

  if (maxDay.value && date.isAfter(maxDay.value, 'day')) {
    return true
  }

  return false
}

function isMonthDisabled(month: Day): boolean {
  const start = month.startOf('month')
  const end = month.endOf('month')

  if (minDay.value && end.isBefore(minDay.value, 'day')) {
    return true
  }

  if (maxDay.value && start.isAfter(maxDay.value, 'day')) {
    return true
  }

  return false
}

function isYearDisabled(year: Day): boolean {
  const start = year.startOf('year')
  const end = year.endOf('year')

  if (minDay.value && end.isBefore(minDay.value, 'day')) {
    return true
  }

  if (maxDay.value && start.isAfter(maxDay.value, 'day')) {
    return true
  }

  return false
}

function handleDateSelect(date: Day) {
  if (isDisabled(date)) {
    return
  }

  if (mode.value === 'range') {
    selectRangeDate(date)
    return
  }

  applySingle(date)
  closeIfNeeded()
}

function applySingle(date: Day, emitChange = true) {
  const normalized = clampDate(date.startOf('day'))
  singleValue.value = normalized
  rangeValue.value = [null, null]
  inputText.value = formatDate(normalized)
  focusedDate.value = normalized
  viewCursor.value = normalized.startOf('month')

  if (emitChange) {
    emit('update:model-value', normalized)
  }
}

function selectRangeDate(date: Day) {
  const [start, end] = rangeValue.value
  const normalized = clampDate(date.startOf('day'))

  if (start && !end) {
    applyRange(sortRange([start, normalized]), true)
    closeIfNeeded()
    return
  }

  applyRange([normalized, null], true)
}

function applyRange(range: RangeValue, emitChange: boolean) {
  const sorted = sortRange(range)
  rangeValue.value = sorted
  singleValue.value = null
  focusedDate.value = clampDate(sorted[0] ?? sorted[1] ?? focusedDate.value)
  viewCursor.value = focusedDate.value.startOf('month')
  inputText.value = formatRange(sorted)

  if (emitChange) {
    const value = sorted[0] || sorted[1] ? sorted : null
    emit('update:model-value', value)
  }
}

function closeIfNeeded() {
  const shouldClose = props.closeOnSelect ?? mode.value === 'single'

  if (shouldClose) {
    close()
  }
}

function emitBlur() {
  setTimeout(() => {
    props.validation && props.validation.$touch()
  }, 100)
}

function focusElement(el?: HTMLElement | null): boolean {
  if (!el) {
    return false
  }

  if ((el as HTMLButtonElement).disabled) {
    return false
  }

  el.focus()
  return true
}

function handleGridKeydown(event: KeyboardEvent) {
  if (event.key === 'Tab') {
    event.preventDefault()

    if (event.shiftKey) {
      if (focusElement(navNext.value) || focusElement(titleBtn.value) || focusElement(navPrev.value)) {
        return
      }
      focusElement(grid.value)
      return
    }

    if (focusElement(navPrev.value) || focusElement(titleBtn.value) || focusElement(navNext.value)) {
      return
    }

    focusElement(grid.value)
    return
  }

  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape', 'Home', 'End'].includes(event.key)) {
    event.preventDefault()
  }

  switch (event.key) {
    case 'ArrowLeft':
      moveFocus(-1)
      break
    case 'ArrowRight':
      moveFocus(1)
      break
    case 'ArrowUp':
      moveFocus(-getColumns())
      break
    case 'ArrowDown':
      moveFocus(getColumns())
      break
    case 'Home':
      focusRangeEdge('start')
      break
    case 'End':
      focusRangeEdge('end')
      break
    case 'Enter':
    case ' ':
      selectFocused()
      break
    case 'Escape':
      close()
      break
  }
}

function moveFocus(delta: number) {
  const unit = getUnit()
  let next = focusedDate.value.add(delta, unit)

  if (unit === 'year' && viewMode.value === 'multi-year') {
    next = focusedDate.value.add(delta * 20, 'year')
  }

  const clamped = clampDate(next)
  focusedDate.value = clamped
  ensureCursorVisible(clamped)
}

function focusRangeEdge(position: 'start' | 'end') {
  if (viewMode.value === 'date') {
    const month = viewCursor.value
    const target = position === 'start' ? month.startOf('month') : month.endOf('month')
    focusedDate.value = clampDate(target)
  }
}

function selectFocused() {
  if (viewMode.value === 'date') {
    handleDateSelect(focusedDate.value)
    return
  }

  if (viewMode.value === 'month') {
    handleMonthSelect(focusedDate.value.month())
    return
  }

  if (viewMode.value === 'year') {
    handleYearSelect(focusedDate.value.year())
    return
  }

  handleMultiYearSelect(focusedDate.value.year())
}

function handleMonthSelect(monthIndex: number) {
  const target = viewCursor.value.month(monthIndex).startOf('month')

  if (isMonthDisabled(target)) {
    return
  }

  viewCursor.value = target
  focusedDate.value = clampDate(target)
  viewMode.value = 'date'
}

function handleYearSelect(year: number) {
  const target = viewCursor.value.year(year).startOf('month')

  if (isYearDisabled(target)) {
    return
  }

  viewCursor.value = target
  focusedDate.value = clampDate(target)
  viewMode.value = 'month'
}

function handleMultiYearSelect(year: number) {
  const target = viewCursor.value.year(year).startOf('month')
  viewCursor.value = target
  focusedDate.value = clampDate(target)
  viewMode.value = 'year'
}

function ensureCursorVisible(date: Day) {
  if (viewMode.value === 'date' && !date.isSame(viewCursor.value, 'month')) {
    viewCursor.value = date.startOf('month')
  }

  if (viewMode.value === 'month' && date.year() !== viewCursor.value.year()) {
    viewCursor.value = date.startOf('month')
  }

  if (viewMode.value === 'year') {
    const { start, end } = getYearRange(viewCursor.value.year())
    if (date.year() < start || date.year() > end) {
      viewCursor.value = date.startOf('month')
    }
  }

  if (viewMode.value === 'multi-year') {
    const { start, end } = getMultiYearRange(viewCursor.value.year())
    if (date.year() < start || date.year() > end) {
      viewCursor.value = date.startOf('month')
    }
  }
}

function getColumns(): number {
  return viewMode.value === 'date' ? 7 : 4
}

function getUnit(): 'day' | 'month' | 'year' {
  if (viewMode.value === 'date') {
    return 'day'
  }

  if (viewMode.value === 'month') {
    return 'month'
  }

  return 'year'
}

function handleTitleClick() {
  if (viewMode.value === 'date') {
    viewMode.value = 'month'
    return
  }

  if (viewMode.value === 'month') {
    viewMode.value = 'year'
    return
  }

  if (viewMode.value === 'year') {
    viewMode.value = 'multi-year'
  }
}

function shiftView(direction: -1 | 1) {
  if (!canShift(direction)) {
    return
  }

  if (viewMode.value === 'date') {
    viewCursor.value = viewCursor.value.add(direction, 'month')
    focusedDate.value = clampDate(viewCursor.value.startOf('month'))
    return
  }

  if (viewMode.value === 'month') {
    viewCursor.value = viewCursor.value.add(direction, 'year')
    focusedDate.value = clampDate(viewCursor.value.startOf('month'))
    return
  }

  if (viewMode.value === 'year') {
    viewCursor.value = viewCursor.value.add(direction * 12, 'year')
    focusedDate.value = clampDate(viewCursor.value.startOf('year'))
    return
  }

  viewCursor.value = viewCursor.value.add(direction * 20, 'year')
  focusedDate.value = clampDate(viewCursor.value.startOf('year'))
}

function canShift(direction: -1 | 1): boolean {
  if (!minDay.value && !maxDay.value) {
    return true
  }

  const target = getShiftedCursor(direction)
  const { start, end } = getViewRange(target)

  if (minDay.value && end.isBefore(minDay.value, 'day')) {
    return false
  }

  if (maxDay.value && start.isAfter(maxDay.value, 'day')) {
    return false
  }

  return true
}

function getShiftedCursor(direction: -1 | 1): Day {
  if (viewMode.value === 'date') {
    return viewCursor.value.add(direction, 'month')
  }

  if (viewMode.value === 'month') {
    return viewCursor.value.add(direction, 'year')
  }

  if (viewMode.value === 'year') {
    return viewCursor.value.add(direction * 12, 'year')
  }

  return viewCursor.value.add(direction * 20, 'year')
}

function getViewRange(cursor: Day) {
  if (viewMode.value === 'date') {
    const start = cursor.startOf('month')
    const end = cursor.endOf('month')
    return { start, end }
  }

  if (viewMode.value === 'month') {
    const start = cursor.startOf('year')
    const end = cursor.endOf('year')
    return { start, end }
  }

  if (viewMode.value === 'year') {
    const { start, end } = getYearRange(cursor.year())
    return {
      start: day().year(start).startOf('year'),
      end: day().year(end).endOf('year')
    }
  }

  const { start, end } = getMultiYearRange(cursor.year())
  return {
    start: day().year(start).startOf('year'),
    end: day().year(end).endOf('year')
  }
}

function getYearRange(baseYear: number) {
  const start = baseYear - (baseYear % 12)
  return { start, end: start + 11 }
}

function getMultiYearRange(baseYear: number) {
  const start = Math.floor(baseYear / 20) * 20
  return { start, end: start + 19 }
}

function handleHover(date: Day | null) {
  if (mode.value !== 'range') {
    hoverDate.value = null
    return
  }

  if (rangeValue.value[0] && !rangeValue.value[1]) {
    hoverDate.value = date
    return
  }

  hoverDate.value = null
}

function isFocused(date: Day): boolean {
  if (viewMode.value === 'date') {
    return date.isSame(focusedDate.value, 'day')
  }

  if (viewMode.value === 'month') {
    return date.isSame(focusedDate.value, 'month')
  }

  return date.year() === focusedDate.value.year()
}

function isToday(date: Day): boolean {
  return date.isSame(today, 'day')
}

function isSelected(date: Day): boolean {
  if (mode.value === 'range') {
    const [start, end] = rangeValue.value
    return !!(start && date.isSame(start, 'day')) || !!(end && date.isSame(end, 'day'))
  }

  return !!(singleValue.value && date.isSame(singleValue.value, 'day'))
}

function isInRange(date: Day): boolean {
  const range = displayRange()

  if (!range) {
    return false
  }

  const [start, end] = range
  return !date.isBefore(start, 'day') && !date.isAfter(end, 'day')
}

function isRangeEdge(date: Day): { start: boolean; end: boolean } {
  const [start, end] = rangeValue.value
  const display = displayRange()

  return {
    start: !!((start && date.isSame(start, 'day')) || (display && display[0] && date.isSame(display[0], 'day'))),
    end: !!((end && date.isSame(end, 'day')) || (display && display[1] && date.isSame(display[1], 'day')))
  }
}

function displayRange(): RangeValue | null {
  if (mode.value !== 'range') {
    return null
  }

  const [start, end] = rangeValue.value
  if (start && end) {
    return sortRange([start, end])
  }

  if (start && hoverDate.value) {
    return sortRange([start, hoverDate.value])
  }

  return null
}

function isMonthSelected(month: Day): boolean {
  if (mode.value === 'single') {
    return !!(singleValue.value && singleValue.value.isSame(month, 'month'))
  }

  const [start, end] = rangeValue.value
  return !!((start && start.isSame(month, 'month')) || (end && end.isSame(month, 'month')))
}

function isMonthInRange(month: Day): boolean {
  const range = displayRange() ?? (rangeValue.value[0] && rangeValue.value[1] ? sortRange(rangeValue.value) : null)

  if (!range) {
    return false
  }

  const start = month.startOf('month')
  const end = month.endOf('month')

  return !end.isBefore(range[0]!, 'day') && !start.isAfter(range[1]!, 'day')
}

function titleLabel(): string {
  if (viewMode.value === 'date') {
    return viewCursor.value.format('MMMM YYYY')
  }

  if (viewMode.value === 'month') {
    return viewCursor.value.format('YYYY')
  }

  if (viewMode.value === 'year') {
    const { start, end } = getYearRange(viewCursor.value.year())
    return `${start} \u2013 ${end}`
  }

  const { start, end } = getMultiYearRange(viewCursor.value.year())
  return `${start} \u2013 ${end}`
}

function buildMonthGrid() {
  const start = viewCursor.value.startOf('month')
  const end = viewCursor.value.endOf('month')
  const daysInMonth = end.date()
  const startOffset = start.day()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - startOffset + 1

    if (dayNumber < 1) {
      const date = start.subtract(startOffset - index, 'day')
      return date
    }

    if (dayNumber > daysInMonth) {
      const date = end.add(dayNumber - daysInMonth, 'day')
      return date
    }

    return start.date(dayNumber)
  })
}

const monthGrid = computed(() => {
  const cells = buildMonthGrid()
  const rows: Day[][] = []

  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return rows
})

const monthCells = computed(() => {
  return Array.from({ length: 12 }, (_, index) => {
    const date = viewCursor.value.month(index).startOf('month')
    return {
      date,
      label: date.format('MMM'),
      disabled: isMonthDisabled(date),
      focused: isFocused(date),
      selected: isMonthSelected(date),
      inRange: isMonthInRange(date),
      today: isToday(date.startOf('month'))
    }
  })
})

const yearCells = computed(() => {
  const { start } = getYearRange(viewCursor.value.year())

  return Array.from({ length: 12 }, (_, index) => {
    const year = start + index
    const date = viewCursor.value.year(year).startOf('year')

    return {
      date,
      label: `${year}`,
      disabled: isYearDisabled(date),
      focused: isFocused(date),
      selected: isMonthSelected(date),
      inRange: isMonthInRange(date),
      today: today.year() === year
    }
  })
})

const multiYearCells = computed(() => {
  const { start } = getMultiYearRange(viewCursor.value.year())

  return Array.from({ length: 20 }, (_, index) => {
    const year = start + index
    const date = viewCursor.value.year(year).startOf('year')

    return {
      date,
      label: `${year}`,
      disabled: isYearDisabled(date),
      focused: isFocused(date),
      selected: isMonthSelected(date),
      inRange: isMonthInRange(date),
      today: today.year() === year
    }
  })
})
</script>

<template>
  <SInputBase
    class="SInputDate"
    :class="classes"
    :size
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :hide-error
    :validation
  >
    <div ref="container" class="container">
      <input
        :id="name"
        ref="input"
        class="input"
        :class="{ block, disabled }"
        type="text"
        :placeholder="placeholder ?? (mode === 'range' ? 'YYYY-MM-DD \u2013 YYYY-MM-DD' : 'YYYY-MM-DD')"
        autocomplete="off"
        :value="inputText"
        :disabled
        :tabindex
        @focus="handleOpen"
        @click="handleOpen"
        @input="handleInputChange"
        @keydown.down.prevent="handleOpen"
        @keydown.enter.prevent="handleOpen"
        @blur="emitBlur"
      >

      <div v-if="isOpen" class="dropdown" :style="inset">
        <div
          class="picker"
          role="dialog"
          aria-label="Date picker"
          @keydown.stop="handleGridKeydown"
        >
          <div class="picker-header">
            <button
              ref="navPrev"
              class="nav"
              type="button"
              :disabled="!canShift(-1)"
              aria-label="Previous"
              @click="shiftView(-1)"
            >
              <IconCaretLeft class="nav-icon" />
            </button>

            <button
              ref="titleBtn"
              class="title"
              type="button"
              @click="handleTitleClick"
            >
              {{ titleLabel() }}
            </button>

            <button
              ref="navNext"
              class="nav"
              type="button"
              :disabled="!canShift(1)"
              aria-label="Next"
              @click="shiftView(1)"
            >
              <IconCaretRight class="nav-icon" />
            </button>
          </div>

          <div v-if="viewMode === 'date'" class="picker-weekdays">
            <div v-for="weekday in weekdays" :key="weekday" class="picker-weekday">
              {{ weekday }}
            </div>
          </div>

          <div
            ref="grid"
            class="picker-grid"
            :class="viewMode"
            role="grid"
            tabindex="0"
          >
            <template v-if="viewMode === 'date'">
              <div v-for="(week, wi) in monthGrid" :key="wi" class="row" role="row">
                <button
                  v-for="date in week"
                  :key="date.valueOf()"
                  class="cell"
                  :class="{
                    'focused': isFocused(date),
                    'today': isToday(date),
                    'selected': isSelected(date),
                    'in-range': isInRange(date),
                    'range-start': isRangeEdge(date).start,
                    'range-end': isRangeEdge(date).end,
                    'outside': !date.isSame(viewCursor, 'month'),
                    'disabled': isDisabled(date)
                  }"
                  type="button"
                  role="gridcell"
                  :aria-selected="isSelected(date)"
                  :aria-disabled="isDisabled(date)"
                  :tabindex="isFocused(date) ? 0 : -1"
                  @click="handleDateSelect(date)"
                  @mouseenter="handleHover(date)"
                  @mouseleave="handleHover(null)"
                  @focus="focusedDate = date"
                >
                  {{ date.date() }}
                </button>
              </div>
            </template>

            <template v-else-if="viewMode === 'month'">
              <button
                v-for="month in monthCells"
                :key="month.label"
                class="cell month"
                :class="{
                  'focused': month.focused,
                  'today': month.today,
                  'selected': month.selected,
                  'in-range': month.inRange,
                  'disabled': month.disabled
                }"
                type="button"
                role="gridcell"
                :aria-selected="month.selected"
                :aria-disabled="month.disabled"
                :tabindex="month.focused ? 0 : -1"
                @click="handleMonthSelect(month.date.month())"
                @mouseenter="handleHover(month.date)"
                @mouseleave="handleHover(null)"
                @focus="focusedDate = month.date"
              >
                {{ month.label }}
              </button>
            </template>

            <template v-else-if="viewMode === 'year'">
              <button
                v-for="year in yearCells"
                :key="year.label"
                class="cell year"
                :class="{
                  'focused': year.focused,
                  'today': year.today,
                  'selected': year.selected,
                  'in-range': year.inRange,
                  'disabled': year.disabled
                }"
                type="button"
                role="gridcell"
                :aria-selected="year.selected"
                :aria-disabled="year.disabled"
                :tabindex="year.focused ? 0 : -1"
                @click="handleYearSelect(year.date.year())"
                @mouseenter="handleHover(year.date)"
                @mouseleave="handleHover(null)"
                @focus="focusedDate = year.date"
              >
                {{ year.label }}
              </button>
            </template>

            <template v-else>
              <button
                v-for="year in multiYearCells"
                :key="year.label"
                class="cell year"
                :class="{
                  'focused': year.focused,
                  'today': year.today,
                  'selected': year.selected,
                  'in-range': year.inRange,
                  'disabled': year.disabled
                }"
                type="button"
                role="gridcell"
                :aria-selected="year.selected"
                :aria-disabled="year.disabled"
                :tabindex="year.focused ? 0 : -1"
                @click="handleMultiYearSelect(year.date.year())"
                @mouseenter="handleHover(year.date)"
                @mouseleave="handleHover(null)"
                @focus="focusedDate = year.date"
              >
                {{ year.label }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputDate.sm,
.SInputDate.mini {
  .input {
    padding: 3px 8px;
    max-width: 114px;
    height: 32px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.md {
  .input {
    padding: 6px 10px;
    max-width: 120px;
    height: 36px;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.small {
  .input {
    padding: 5px 12px;
    max-width: 136px;
    height: 40px;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.medium {
  .input {
    padding: 11px 12px;
    max-width: 136px;
    height: 48px;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .input.block {
    max-width: 100%;
  }
}

.SInputDate.has-error {
  .input {
    border-color: var(--input-error-border-color);

    &:focus {
      border-color: var(--input-error-border-color);
    }
  }
}

.container {
  position: relative;
  width: 100%;
}

.input {
  display: block;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  width: 100%;
  font-weight: 400;
  font-feature-settings: 'tnum';
  background-color: var(--input-bg-color);
  transition: border-color 0.25s, background-color 0.25s;

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  &:hover {
    border-color: var(--input-hover-border-color);
  }

  &:focus {
    border-color: var(--input-focus-border-color);
  }

  &.disabled {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;
  }
}

.dropdown {
  position: fixed;
  z-index: var(--z-index-dropdown);
}

.picker {
  border: 1px solid var(--c-divider);
  border-radius: 10px;
  min-width: 288px;
  background-color: var(--c-bg-elv-3);
  box-shadow: var(--shadow-lg);
  user-select: none;
}

.picker-header {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.nav {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--c-divider);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  background-color: var(--c-bg-elv-1);
  color: var(--c-text-1);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:not(:disabled):hover {
    border-color: var(--c-text-2);
  }
}

.nav-icon {
  width: 16px;
  height: 16px;
}

.title {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 100%;
  height: 32px;
  font-weight: 600;
  color: var(--c-text-1);
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: var(--c-divider);
    background-color: var(--c-bg-elv-1);
  }
}

.picker-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0 12px 8px;
  color: var(--c-text-2);
  font-size: 12px;
  text-align: center;
}

.picker-weekday {
  line-height: 20px;
}

.picker-grid {
  display: grid;
  gap: 4px;
  padding: 0 12px 12px;

  &.date {
    grid-template-columns: repeat(7, minmax(36px, 1fr));
  }

  &.month,
  &.year,
  &.multi-year {
    grid-template-columns: repeat(4, minmax(60px, 1fr));
  }
}

.row {
  display: contents;
}

.cell {
  position: relative;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 100%;
  height: 36px;
  font-size: 14px;
  color: var(--c-text-1);
  background-color: transparent;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s, color 0.15s;

  &:hover {
    border-color: var(--c-divider);
    background-color: var(--c-bg-elv-1);
  }

  &.month,
  &.year {
    height: 44px;
  }

  &.focused {
    border-color: var(--c-text-2);
  }

  &.today::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--c-text-info-1);
    transform: translateX(-50%);
  }

  &.selected {
    color: var(--c-text-invert-1);
    background-color: var(--c-text-info-1);
  }

  &.selected:hover {
    border-color: transparent;
  }

  &.in-range {
    background-color: var(--c-bg-info-dimm-a1);
  }

  &.range-start {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &.range-end {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &.outside {
    color: var(--c-text-3);
  }

  &.disabled {
    color: var(--c-text-3);
    cursor: not-allowed;

    &:hover {
      border-color: transparent;
      background-color: transparent;
    }
  }
}
</style>
