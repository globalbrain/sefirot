<script setup lang="ts">
import IconCaretLeft from '~icons/ph/caret-left-bold'
import IconCaretRight from '~icons/ph/caret-right-bold'
import { computed, nextTick, ref } from 'vue'
import { type SDate, now } from '../support/Now'

const props = defineProps<{
  mode: 'days' | 'months' | 'years'
}>()

const emit = defineEmits<{
  'zoom-in': []
  'zoom-out': []
}>()

const selected = defineModel<SDate>('selected', { required: true })
const curr = defineModel<SDate>('focused', { required: true })

const el = ref<HTMLElement>()
const keys = ['Enter', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

const lang = undefined
const format = {
  my: getFormatter(new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' })),
  yy: getFormatter(new Intl.DateTimeFormat(lang, { year: 'numeric' }), 'range'),
  w: getFormatter(new Intl.DateTimeFormat(lang, { weekday: 'narrow' }), 'weekday'),
  d: getFormatter(new Intl.DateTimeFormat(lang, { day: 'numeric' }), 'day'),
  m: getFormatter(new Intl.DateTimeFormat(lang, { month: 'long' }), 'month'),
  y: getFormatter(new Intl.DateTimeFormat(lang, { year: 'numeric' }), 'year')
}

const weekdays = getWeekDays()

const key = computed(() => {
  if (props.mode === 'days') {
    return `${curr.value.month}-${curr.value.year}`
  }
  if (props.mode === 'months') {
    return `${curr.value.year}`
  }
  return `${getYearForIndex(1)}-${getYearForIndex(20)}`
})

const isSelectedVisible = computed(() => {
  if (props.mode === 'days') {
    return curr.value.month === selected.value.month && curr.value.year === selected.value.year
  }
  if (props.mode === 'months') {
    return curr.value.year === selected.value.year
  }
  return getYearForIndex(1) <= selected.value.year && selected.value.year <= getYearForIndex(20)
})

const isPrevDisabled = computed(() => {
  if (props.mode === 'days') {
    return curr.value.year <= 1900 && curr.value.month === 1
  }
  if (props.mode === 'months') {
    return curr.value.year <= 1900
  }
  return getYearForIndex(1) <= 1900
})

const isNextDisabled = computed(() => {
  if (props.mode === 'days') {
    return curr.value.year >= 2099 && curr.value.month === 12
  }
  if (props.mode === 'months') {
    return curr.value.year >= 2099
  }
  return getYearForIndex(20) >= 2099
})

const description = computed(() => {
  if (props.mode === 'days') {
    return format.my(new Date(curr.value.year, curr.value.month - 1))
  }
  if (props.mode === 'months') {
    return format.y(new Date(curr.value.year, 0))
  }
  return format.yy(new Date(getYearForIndex(1), 0), new Date(getYearForIndex(20), 0))
})

const offset = computed(() =>
  props.mode === 'days' ? new Date(curr.value.year, curr.value.month - 1, 1).getDay() : 0
)

const total = computed(() => {
  if (props.mode === 'days') {
    return new Date(curr.value.year, curr.value.month, 0).getDate()
  }
  if (props.mode === 'months') {
    return 12
  }
  return 20
})

function onSelected(/** 1-indexed */ i: number): void {
  if (props.mode === 'days') {
    selected.value.day = i
    selected.value.month = curr.value.month
    selected.value.year = curr.value.year
  } else if (props.mode === 'months') {
    selected.value.month = i
    selected.value.year = curr.value.year
  } else {
    selected.value.year = getYearForIndex(i)
  }
  emit('zoom-in')
}

function onFocused(/** 1-indexed */ i: number): void {
  if (props.mode === 'days') {
    curr.value.day = i
  } else if (props.mode === 'months') {
    curr.value.month = i
  } else {
    curr.value.year = getYearForIndex(i)
  }
}

const keyActions: Record<string, () => void> = {
  ArrowUp: prevRow,
  ArrowDown: nextRow,
  ArrowLeft: prevCol,
  ArrowRight: nextCol
}

async function onKeydown(e: KeyboardEvent): Promise<void> {
  const focused = document.activeElement?.closest<HTMLElement>('.SDatePickerBase .item')
  if (!focused || !keys.includes(e.key)) {
    return
  }

  e.preventDefault()

  if (e.key === 'Enter' || e.key === ' ') {
    focused.click()
    return
  }

  keyActions[e.key]()
  await nextTick()

  const index
    = props.mode === 'days'
      ? curr.value.day
      : props.mode === 'months'
        ? curr.value.month
        : (curr.value.year % 20) + 1

  const item = el.value?.children[offset.value + index - 1] as HTMLElement | null
  if (item) {
    item.focus()
  }
}

function prevRow(): void {
  if (props.mode === 'days') {
    if (curr.value.day <= 7) {
      prev(() => (curr.value.day += total.value - 7))
    } else {
      curr.value.day -= 7
    }
  } else if (props.mode === 'months') {
    if (curr.value.month <= 3) {
      prev(() => (curr.value.month += 9))
    } else {
      curr.value.month -= 3
    }
  } else {
    if (curr.value.year % 20 <= 3) {
      prev(() => (curr.value.year += 16))
    } else {
      curr.value.year -= 4
    }
  }
}

function nextRow(): void {
  if (props.mode === 'days') {
    const remainingDaysInMonth = total.value - curr.value.day

    if (remainingDaysInMonth <= 6) {
      next(() => (curr.value.day = 7 - remainingDaysInMonth))
    } else {
      curr.value.day += 7
    }
  } else if (props.mode === 'months') {
    if (curr.value.month >= 10) {
      next(() => (curr.value.month -= 9))
    } else {
      curr.value.month += 3
    }
  } else {
    if (curr.value.year % 20 >= 16) {
      next(() => (curr.value.year -= 16))
    } else {
      curr.value.year += 4
    }
  }
}

function prevCol(): void {
  if (props.mode === 'days') {
    if (curr.value.day === 1) {
      prev(() => (curr.value.day = total.value))
    } else {
      curr.value.day--
    }
  } else if (props.mode === 'months') {
    if (curr.value.month === 1) {
      prev(() => (curr.value.month = 12))
    } else {
      curr.value.month--
    }
  } else {
    if (curr.value.year % 20 === 0) {
      prev(() => (curr.value.year += 19))
    } else {
      curr.value.year--
    }
  }
}

function nextCol(): void {
  if (props.mode === 'days') {
    if (curr.value.day === total.value) {
      next(() => (curr.value.day = 1))
    } else {
      curr.value.day++
    }
  } else if (props.mode === 'months') {
    if (curr.value.month === 12) {
      next(() => (curr.value.month = 1))
    } else {
      curr.value.month++
    }
  } else {
    if (curr.value.year % 20 === 19) {
      next(() => (curr.value.year -= 19))
    } else {
      curr.value.year++
    }
  }
}

function prev(action?: () => void): void {
  if (isPrevDisabled.value) {
    return
  }
  if (props.mode === 'days') {
    curr.value.month--
    if (curr.value.month === 0) {
      curr.value.month = 12
      curr.value.year--
    }
  } else if (props.mode === 'months') {
    curr.value.year--
  } else {
    curr.value.year -= 20
  }
  action?.()
}

function next(action?: () => void): void {
  if (isNextDisabled.value) {
    return
  }
  if (props.mode === 'days') {
    curr.value.month++
    if (curr.value.month === 13) {
      curr.value.month = 1
      curr.value.year++
    }
  } else if (props.mode === 'months') {
    curr.value.year++
  } else {
    curr.value.year += 20
  }
  action?.()
}

function isToday(/** 1-indexed */ i: number): boolean {
  if (props.mode === 'days') {
    return now.day === i && curr.value.month === now.month && curr.value.year === now.year
  }
  return false
  // if (props.mode === 'months') {
  //   return today.month === i && curr.value.year === today.year
  // }
  // return getRange(i) === today.year
}

function isSelected(/** 1-indexed */ i: number): boolean {
  if (!isSelectedVisible.value) {
    return false
  }
  if (props.mode === 'days') {
    return i === selected.value.day
  }
  if (props.mode === 'months') {
    return i === selected.value.month
  }
  return getYearForIndex(i) === selected.value.year
}

function isFocusable(/** 1-indexed */ i: number): boolean {
  if (isSelected(i)) {
    return true
  }
  if (isSelectedVisible.value) {
    return false
  }
  if (props.mode === 'days') {
    return i === curr.value.day
  }
  if (props.mode === 'months') {
    return i === curr.value.month
  }
  return getYearForIndex(i) === curr.value.year
}

function getLabelForItem(/** 1-indexed */ i: number): string {
  if (props.mode === 'days') {
    return format.d(new Date(curr.value.year, curr.value.month - 1, i))
  }
  if (props.mode === 'months') {
    return format.m(new Date(curr.value.year, i - 1))
  }
  return format.y(new Date(getYearForIndex(i), 0))
}

function getYearForIndex(/** 1-indexed */ i: number): number {
  return curr.value.year - (curr.value.year % 20) + i - 1
}

function getWeekDays(): string[] {
  return [...Array(7).keys()].map((day) => format.w(+now - ((now as any).getDay() - day) * 8.64e7))
}

function getFormatter(
  fmt: Intl.DateTimeFormat,
  type: 'range'
): (startDate: Date | number, endDate: Date | number) => string
function getFormatter(fmt: Intl.DateTimeFormat, type?: string): (date: Date | number) => string
function getFormatter(fmt: Intl.DateTimeFormat, type?: string) {
  if (type === undefined) {
    return (date: Date | number) => fmt.format(date)
  }
  if (type === 'range') {
    return (startDate: Date | number, endDate: Date | number) => fmt.formatRange(startDate, endDate)
  }
  return (date: Date | number) => fmt.formatToParts(date).find((p) => p.type === type)!.value
}
</script>

<template>
  <div class="SDatePickerBase" :class="mode" @keydown="onKeydown">
    <div class="header">
      <button type="button" @click="() => prev()" :disabled="isPrevDisabled">
        <IconCaretLeft />
      </button>
      <button type="button" @click="emit('zoom-out')">
        {{ description }}
      </button>
      <button type="button" @click="() => next()" :disabled="isNextDisabled">
        <IconCaretRight />
      </button>
    </div>
    <div v-if="mode === 'days'" class="weekdays grid">
      <div v-for="name in weekdays" :key="name">{{ name }}</div>
    </div>
    <div class="grid" ref="el">
      <div v-for="i in offset" :key="`${key}-${i}`" />
      <div
        v-for="i in total"
        :key="`${key}-${i + offset}`"
        :class="{ today: isToday(i), selected: isSelected(i) }"
        class="item"
        :tabindex="isFocusable(i) ? 0 : -1"
        @click="onSelected(i)"
        @focus="onFocused(i)"
      >
        {{ getLabelForItem(i) }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDatePickerBase {
  display: flex;
  flex-direction: column;
  width: fit-content;
  background-color: var(--c-bg-elv-3);
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--c-text-1);
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid var(--c-gutter);

  > button {
    padding: 4px 8px;
    transition: background-color 0.25s;
    border-radius: 4px;

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      background-color: var(--c-bg-mute-1);
    }

    &:active:not(:disabled) {
      background-color: var(--c-bg-mute-2);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--c-text-3);
    }
  }
}

.grid {
  display: grid;
  grid-gap: 8px;
  padding: 8px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    padding: 4px 6px;
  }

  .days & {
    grid-template-columns: repeat(7, 1fr);

    > div {
      width: 28px;
    }
  }

  .months & {
    grid-template-columns: repeat(3, 1fr);
  }

  .years & {
    grid-template-columns: repeat(4, 1fr);
  }
}

.weekdays {
  padding-bottom: 0;
  font-weight: 600;
  color: var(--c-text-3);
}

.item {
  transition: color 0.25s, background-color 0.25s;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--c-bg-info-dimm-a2);
  }

  &.today:not(.selected) {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background-color: var(--c-bg-info-1);
      border-radius: 50%;
    }
  }

  &.selected {
    background-color: var(--c-bg-info-1);
    color: var(--c-text-dark-1);
  }
}
</style>
