<script setup lang="ts">
import IconCaretLeft from '~icons/ph/caret-left-bold'
import IconCaretRight from '~icons/ph/caret-right-bold'
import { computed, nextTick, reactive, ref } from 'vue'

const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const keys: readonly string[] = ['Enter', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

const today = {
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
} as const

const curr = reactive({ ...today })
const selected = reactive({ ...today })

const description = computed(() =>
  new Date(curr.year, curr.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
)

const firstDay = computed(() => new Date(curr.year, curr.month - 1, 1).getDay())
const totalDays = computed(() => new Date(curr.year, curr.month, 0).getDate())

const isSelectedVisible = computed(
  () => curr.month === selected.month && curr.year === selected.year
)

const daysEl = ref<HTMLElement>()

const keyActions: Record<string, () => void> = {
  ArrowUp: getPrevWeek,
  ArrowDown: getNextWeek,
  ArrowLeft: getPrevDay,
  ArrowRight: getNextDay
}

async function onKeydown(e: KeyboardEvent): Promise<void> {
  const focusedDay = document.activeElement as HTMLElement | null
  if (!focusedDay || !keys.includes(e.key)) { return }

  e.preventDefault()

  if (e.key === 'Enter' || e.key === ' ') {
    focusedDay.click()
    return
  }

  keyActions[e.key]()
  await nextTick()

  const el = daysEl.value?.children[firstDay.value + curr.day - 1] as HTMLElement | null
  if (el) { el.focus() }
}

function onSelected(day: number): void {
  selected.day = day
  selected.month = curr.month
  selected.year = curr.year
}

function getPrevWeek() {
  if (curr.day <= 7) {
    prevMonth()
    curr.day += totalDays.value - 7
  } else {
    curr.day -= 7
  }
}

function getNextWeek() {
  const remainingDaysInMonth = totalDays.value - curr.day

  if (remainingDaysInMonth < 7) {
    nextMonth()
    curr.day = 7 - remainingDaysInMonth
  } else {
    curr.day += 7
  }
}

function getPrevDay() {
  if (curr.day === 1) {
    prevMonth()
    curr.day = totalDays.value
  } else {
    curr.day--
  }
}

function getNextDay() {
  if (curr.day === totalDays.value) {
    nextMonth()
    curr.day = 1
  } else {
    curr.day++
  }
}

function prevMonth(): void {
  if (curr.month === 1) {
    curr.month = 12
    curr.year--
  } else {
    curr.month--
  }
}

function nextMonth(): void {
  if (curr.month === 12) {
    curr.month = 1
    curr.year++
  } else {
    curr.month++
  }
}

function prevMonthWithoutTransition(): void {
  daysEl.value?.classList.add('no-transition')
  prevMonth()
  requestAnimationFrame(() => daysEl.value?.classList.remove('no-transition'))
}

function nextMonthWithoutTransition(): void {
  daysEl.value?.classList.add('no-transition')
  nextMonth()
  requestAnimationFrame(() => daysEl.value?.classList.remove('no-transition'))
}

function isToday(day: number): boolean {
  return day === today.day && curr.month === today.month && curr.year === today.year
}

function isSelected(day: number): boolean {
  return day === selected.day && curr.month === selected.month && curr.year === selected.year
}

function isFocusable(day: number): boolean {
  return isSelected(day) || (!isSelectedVisible.value && day === curr.day)
}
</script>

<template>
  <div class="SDatePicker" @keydown="onKeydown">
    <div class="header">
      <button type="button" @click="prevMonthWithoutTransition"><IconCaretLeft /></button>
      <button type="button">{{ description }}</button>
      <button type="button" @click="nextMonthWithoutTransition"><IconCaretRight /></button>
    </div>
    <div class="labels grid">
      <div v-for="day in labels" :key="day">{{ day }}</div>
    </div>
    <div class="days grid" ref="daysEl">
      <div v-for="i in firstDay" :key="i" />
      <div
        v-for="day in totalDays"
        :key="day"
        :class="{ today: isToday(day), selected: isSelected(day) }"
        class="day"
        :tabindex="isFocusable(day) ? 0 : -1"
        @click="onSelected(day)"
        @focus="curr.day = day"
      >
        {{ day }}
      </div>
    </div>
  </div>
  <br>
  <div class="SDatePicker level-1">
    <div class="header">
      <button type="button" @click="prevMonthWithoutTransition"><IconCaretLeft /></button>
      <button type="button">{{ curr.year }}</button>
      <button type="button" @click="nextMonthWithoutTransition"><IconCaretRight /></button>
    </div>
    <div class="months grid">
      <div v-for="month in 12" :key="month" class="month">
        <button
          type="button"
          :class="{ selected: month === curr.month }"
          @click="curr.month = month"
        >
          {{ new Date(curr.year, month - 1).toLocaleString('default', { month: 'long' }) }}
        </button>
      </div>
    </div>
  </div>
  <br>
  <div class="SDatePicker level-2">
    <div class="header">
      <button type="button" @click="prevMonthWithoutTransition"><IconCaretLeft /></button>
      <button type="button">{{ `${curr.year}-${curr.year + 19}` }}</button>
      <button type="button" @click="nextMonthWithoutTransition"><IconCaretRight /></button>
    </div>
    <div class="years grid">
      <div v-for="year in 20" :key="year" class="year">
        <button
          type="button"
          :class="{ selected: year === curr.year }"
          @click="curr.year = year"
        >
          {{ 2023 + year }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDatePicker {
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

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 8px;
  padding: 8px;

  > div {
    width: auto;
    aspect-ratio: 1 / 1;
    padding: 4px;
  }

  .level-1 & {
    grid-template-columns: repeat(3, 1fr);

    > div {
      aspect-ratio: unset;
    }
  }

  .level-2 & {
    grid-template-columns: repeat(4, 1fr);

    > div {
      aspect-ratio: unset;
    }
  }
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

    &:hover {
      background-color: var(--c-bg-mute-1);
    }

    &:active {
      background-color: var(--c-bg-mute-2);
    }
  }
}

.labels {
  padding-bottom: 0;
  font-weight: 600;
  color: var(--c-text-3);
}

.day {
  transition: color 0.25s, background-color 0.25s;
  cursor: pointer;
  border-radius: 4px;

  .no-transition & {
    transition: none;
  }

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
