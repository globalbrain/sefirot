<script setup lang="ts" generic="T, Multiple extends boolean = false">
import IconCaretDown from '~icons/ph/caret-down'
import IconCaretUp from '~icons/ph/caret-up'
import IconCheck from '~icons/ph/check'
import { type Ref, computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useManualDropdownPosition } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import { useTrans } from '../composables/Lang'
import SDropdownSectionFilterItem from './SDropdownSectionFilterItem.vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'
import SSpinner from './SSpinner.vue'

export type { Color, Size } from './SInputBase.vue'

export type Option = OptionText | OptionAvatar

export interface OptionBase {
  type?: 'text' | 'avatar'
  value: any
  disabled?: boolean
}

export interface OptionText extends OptionBase {
  type?: 'text'
  label: string
}

export interface OptionAvatar extends OptionBase {
  type: 'avatar'
  label: string
  image?: string | null
}

export interface Props<T = any, Multiple extends boolean = false> extends BaseProps {
  placeholder?: string
  // Fetch the items matching `query` from the server. Called when the dropdown
  // opens (with the current query, usually empty for the initial list) and again,
  // debounced, on each keystroke. Out-of-order responses are discarded, so it
  // does not need to guard against races itself.
  fetch: (query: string) => Promise<T[]>
  // Render an item as its dropdown option and, once selected, as its chip. The
  // option's `value` is the item's identity — selection, de-duplication and
  // removal all key off it. Applied to fetched items and to the bound model
  // alike, so a seeded selection renders without appearing in any fetch.
  toOption: (item: T) => Option
  // Decide whether a `fetch` rejection should propagate (be re-thrown) instead of
  // being swallowed into an empty list — e.g. to let auth/session failures reach
  // the app's re-auth flow. By default every rejection is swallowed.
  rethrow?: (error: unknown) => boolean
  // Whether multiple items can be selected. The model is then an array of items;
  // otherwise it is a single item or `null`.
  multiple?: Multiple
  // Whether the (single) value can be cleared, or the (multiple) selection emptied.
  nullable?: boolean
  disabled?: boolean
  position?: 'top' | 'bottom'
  // Whether to keep the dropdown open after a selection. Defaults to closing in
  // single mode and staying open in multiple mode.
  closeOnSelect?: boolean
  // Debounce window (ms) between a keystroke and the refetch.
  debounce?: number
}

// `closeOnSelect` defaults to `undefined` (not Vue's usual absent-Boolean → false)
// so the `?? !multiple` fallback in onSelect can tell "omitted" from an explicit
// `false`, keeping the single-select-closes / multiple-stays-open default.
const props = withDefaults(defineProps<Props<T, Multiple>>(), { closeOnSelect: undefined })

// The selection: an array of items when `multiple`, otherwise a single item or
// `null`. Items are the consumer's own model type; the option rendered for each
// is derived on demand via `toOption`, so nothing extra is stored on the model.
const model = defineModel<Multiple extends true ? T[] : T | null>({ required: true })

// Write the model regardless of arity. The public type is arity-conditional, so
// the concrete array / single value is cast at this single boundary.
function commit(value: T[] | T | null): void {
  model.value = value as typeof model.value
}

const { t } = useTrans({
  en: {
    ph: 'Search',
    searching: 'Searching…',
    not_found: 'No options found.'
  },
  ja: {
    ph: '検索',
    searching: '検索中…',
    not_found: 'オプションが見つかりません。'
  }
})

const container = ref<HTMLDivElement>()
const input = ref<HTMLInputElement | null>(null)
const list = ref<HTMLUListElement | null>(null)

const { isOpen, open, close } = useFlyout(container)
const { inset, update: updatePosition } = useManualDropdownPosition(
  container,
  () => props.position
)

const query = ref('')
const items = ref([]) as Ref<T[]>
const loading = ref(false)

// Monotonic token so only the latest fetch may assign `items` / clear `loading`.
// With a debounced, user-driven search several requests can overlap; an older one
// resolving late must not clobber the newer result.
let fetchSeq = 0

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

// The selected items as a flat array, regardless of arity, for internal handling.
const selectedItems = computed<T[]>(() => {
  if (props.multiple) {
    return Array.isArray(model.value) ? (model.value as T[]) : []
  }
  return model.value != null ? [model.value as T] : []
})

// The identities currently selected, for O(1) active / de-dup checks.
const selectedValues = computed(
  () => new Set(selectedItems.value.map((item) => props.toOption(item).value))
)

// The option(s) rendered for the current selection: an array of chips when
// multiple, a single chip otherwise (matching SInputDropdownItem's `item`).
const selectedOptions = computed<Option | Option[] | null>(() => {
  if (props.multiple) {
    return selectedItems.value.map((item) => props.toOption(item))
  }
  return model.value != null ? props.toOption(model.value as T) : null
})

// The fetched items paired with their rendered option, for the dropdown list.
const optionItems = computed(() =>
  items.value.map((item) => ({ item, option: props.toOption(item) }))
)

const hasSelected = computed(() => selectedItems.value.length > 0)

const removable = computed(() => {
  if (props.multiple) {
    return !!props.nullable || selectedItems.value.length > 1
  }
  return !!props.nullable
})

async function runFetch(q: string): Promise<void> {
  const seq = ++fetchSeq
  loading.value = true
  try {
    const res = await props.fetch(q)
    if (seq === fetchSeq) {
      items.value = res
    }
  } catch (e) {
    // A failed search yields no options (the empty state shows)…
    if (seq === fetchSeq) {
      items.value = []
    }
    // …unless the consumer wants this failure propagated (e.g. an auth/session
    // error that must reach the app's re-auth flow rather than look like "no
    // results"). Re-throw regardless of `seq`: the failure is real even if a
    // newer search has since superseded this one.
    if (props.rethrow?.(e)) {
      throw e
    }
  } finally {
    if (seq === fetchSeq) {
      loading.value = false
    }
  }
}

// Debounce keystroke-driven refetches with a cancelable timer. The pending timer
// is cancelled on close and before each immediate open-fetch, so a keystroke from
// a previous open session can't fire (as the latest fetch) after a reopen and
// clobber the fresh initial list.
let debounceTimer: ReturnType<typeof setTimeout> | undefined

function cancelPendingFetch(): void {
  if (debounceTimer !== undefined) {
    clearTimeout(debounceTimer)
    debounceTimer = undefined
  }
}

// Refetch as the user types, but only while open (the reset-on-close below also
// writes `query`, and that shouldn't fire a fetch against a closed dropdown).
watch(query, (q) => {
  if (!isOpen.value) {
    return
  }
  cancelPendingFetch()
  // Supersede any in-flight fetch right away — not only once the timer fires. A
  // previous query's request that resolves during the debounce window would
  // otherwise still pass runFetch's `seq === fetchSeq` check and replace the
  // options (and clear loading) for a query the input has already moved past.
  // Bumping the token invalidates it; keep `loading` on so the pending search
  // stays indicated until the new fetch resolves.
  fetchSeq++
  loading.value = true
  debounceTimer = setTimeout(() => {
    debounceTimer = undefined
    runFetch(q)
  }, props.debounce ?? 250)
})

function onOpen() {
  if (props.disabled) {
    return
  }
  updatePosition()
  open()
  // Fetch the current (initial) list immediately — dropping any keystroke timer
  // left armed from a previous open — and focus the search input.
  cancelPendingFetch()
  runFetch(query.value)
  nextTick(() => input.value?.focus())
}

watch(isOpen, (value) => {
  // On close: drop any pending refetch, invalidate any in-flight fetch (so a late
  // response can't repopulate the list while closed), and clear the query /
  // items / loading. Reopening then starts fresh instead of briefly rendering
  // the previous query's results (which would be selectable). The selected chips
  // are unaffected — they render from the model, not from the fetched `items`.
  if (!value) {
    cancelPendingFetch()
    fetchSeq++
    query.value = ''
    items.value = []
    loading.value = false
  }
})

onUnmounted(cancelPendingFetch)

// Close the dropdown if the control becomes disabled while open (e.g. a form
// submission starts), so its options can't be selected until it re-enables.
// `onSelect` also re-checks `props.disabled` as a belt-and-braces guard.
watch(() => props.disabled, (disabled) => {
  if (disabled) {
    close()
  }
})

function isActive(value: any): boolean {
  return selectedValues.value.has(value)
}

function onSelect(item: T): void {
  const option = props.toOption(item)
  if (props.disabled || option.disabled) {
    return
  }

  props.validation?.$touch()

  const value = option.value

  if (props.multiple) {
    const current = selectedItems.value
    const next = selectedValues.value.has(value)
      ? current.filter((i) => props.toOption(i).value !== value)
      : [...current, item]
    // Keep at least one unless clearing is allowed (mirrors SInputDropdown).
    if (next.length !== 0 || props.nullable) {
      commit(next)
    }
  } else if (!selectedValues.value.has(value)) {
    commit(item)
  } else if (props.nullable) {
    commit(null)
  }

  if (props.closeOnSelect ?? !props.multiple) {
    close()
  }
}

// Remove a selected chip from the box (the X on SInputDropdownItem).
function onRemove(value: any): void {
  props.validation?.$touch()

  if (props.multiple) {
    commit(selectedItems.value.filter((item) => props.toOption(item).value !== value))
  } else {
    commit(null)
  }
}

// Move focus from the search input into the first option (ArrowDown from the box).
function focusFirstOption(): void {
  list.value?.querySelector<HTMLElement>('.button:not([disabled])')?.focus()
}

// The next/previous enabled option button, skipping disabled ones (consistent
// with focusFirstOption and the click guard).
function enabledSibling(el: HTMLElement, forward: boolean): HTMLElement | null {
  let li: Element | null | undefined = el.parentElement
  for (;;) {
    li = forward ? li?.nextElementSibling : li?.previousElementSibling
    if (!li) {
      return null
    }
    const button = li.querySelector<HTMLElement>('.button:not([disabled])')
    if (button) {
      return button
    }
  }
}

function focusPrev(event: any): void {
  // ArrowUp from the first option returns focus to the search input.
  const prev = enabledSibling(event.target as HTMLElement, false)
  prev ? prev.focus() : input.value?.focus()
}

function focusNext(event: any): void {
  enabledSibling(event.target as HTMLElement, true)?.focus()
}
</script>

<template>
  <SInputBase
    class="SInputSelectSearch"
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
    :validation
    :warning
    :hide-error
    :hide-warning
  >
    <div ref="container" class="container">
      <div
        class="box"
        role="button"
        tabindex="0"
        @click="onOpen"
        @keydown.down.prevent
        @keyup.enter="onOpen"
        @keyup.down="onOpen"
      >
        <div class="box-content">
          <SInputDropdownItem
            v-if="hasSelected"
            :item="selectedOptions!"
            :size="size ?? 'small'"
            :removable
            :disabled="disabled ?? false"
            @remove="onRemove"
          />

          <div v-else class="box-placeholder">{{ placeholder ?? t.ph }}</div>
        </div>

        <div class="box-icon">
          <IconCaretUp class="box-icon-svg up" />
          <IconCaretDown class="box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="dropdown" :style="inset">
        <div class="dropdown-content">
          <div class="search">
            <!-- Keep Enter inside the search field: it drives the dropdown and
                 must neither bubble to an enclosing form (`.stop`) nor trigger the
                 browser's implicit form submission (`.prevent`). ArrowDown moves
                 focus into the option list. -->
            <input
              ref="input"
              v-model="query"
              class="search-input"
              :placeholder="t.ph"
              @keydown.enter.stop.prevent
              @keydown.down.prevent
              @keyup.down.prevent="focusFirstOption"
            >
            <!-- A refetch while options are already shown keeps the (stale) list
                 visible; this spinner signals that newer results are loading. -->
            <SSpinner v-if="loading && items.length" class="search-spinner" />
          </div>

          <ul v-if="items.length" ref="list" class="list">
            <li v-for="{ item, option } in optionItems" :key="option.value" class="item">
              <button
                class="button"
                :class="{ active: isActive(option.value) }"
                type="button"
                :disabled="option.disabled"
                tabindex="0"
                @keyup.up.prevent="focusPrev"
                @keyup.down.prevent="focusNext"
                @click="onSelect(item)"
              >
                <span v-if="multiple" class="checkbox">
                  <span class="checkbox-box">
                    <IconCheck class="checkbox-icon" />
                  </span>
                </span>
                <span v-else class="radio">
                  <span class="radio-dot" />
                </span>
                <span class="option-item">
                  <SDropdownSectionFilterItem :option />
                </span>
              </button>
            </li>
          </ul>

          <div v-else-if="loading" class="state">
            <SSpinner class="state-spinner" />
            <span class="state-text">{{ t.searching }}</span>
          </div>

          <p v-else class="empty">{{ t.not_found }}</p>
        </div>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.container {
  position: relative;
  width: 100%;
}

.box {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  width: 100%;
  color: var(--input-text);
  background-color: var(--input-bg-color);
  box-shadow: var(--input-box-shadow);
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;

  &:hover {
    border-color: var(--input-hover-border-color);
  }
}

.box-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 100%;
}

.box-placeholder {
  line-height: 24px;
  color: var(--input-placeholder-color);
  overflow: hidden;
  white-space: nowrap;
}

.box-icon {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.box-icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  color: var(--c-text-2);
}

.box-icon-svg.up {
  margin-bottom: -4px;
}

.dropdown {
  position: fixed;
  z-index: var(--z-index-dropdown);
}

.dropdown-content {
  border: 1px solid var(--c-border-mute-1);
  border-radius: 8px;
  background-color: var(--c-bg-elv-3);
  box-shadow: var(--shadow-depth-3);
  overflow: hidden;
}

.search {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--c-gutter);
  padding: 8px;
  background-color: var(--c-bg-elv-3);
}

.search-spinner {
  position: absolute;
  top: 50%;
  right: 16px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  color: var(--c-text-2);
}

.search-input {
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  font-size: 14px;
  font-family: var(--input-value-font-family);
  line-height: 32px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;

  &::placeholder {
    color: var(--input-placeholder-color);
  }

  &:hover { border-color: var(--input-hover-border-color); }
  &:focus { border-color: var(--input-focus-border-color); }
}

.list {
  max-height: 280px;
  padding: 8px;
  overflow-y: auto;
}

.button {
  display: flex;
  border-radius: 6px;
  padding: 0 8px;
  width: 100%;
  text-align: left;
  transition: color 0.25s, background-color 0.25s;

  &:hover:not(:disabled) {
    background-color: var(--c-bg-mute-1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.checkbox {
  display: block;
  padding-top: 8px;
  padding-bottom: 8px;
}

.checkbox-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--c-border-mute-1);
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.1s, background-color 0.1s;

  .button.active & {
    border-color: var(--c-fg-info-1);
    background-color: var(--c-fg-info-1);
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

.radio {
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--c-border-mute-1);
  border-radius: 50%;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;

  .button.active & {
    border-color: var(--c-border-info-1);
  }
}

.radio-dot {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  background-color: var(--c-fg-info-1);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.25s, transform 0.1s;

  .button.active & {
    opacity: 1;
    transform: scale(0.6);
  }
}

.option-item {
  padding-left: 12px;
  width: 100%;
}

.state {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
}

.state-spinner {
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
}

.state-text {
  font-size: 12px;
  color: var(--c-text-2);
}

.empty {
  padding: 14px 16px;
  font-size: 12px;
  color: var(--c-text-2);
}

.SInputSelectSearch.sm,
.SInputSelectSearch.mini {
  .box {
    min-height: 32px;
  }

  .box-content {
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .box-placeholder {
    padding-left: 10px;
  }

  .box-icon {
    top: 3px;
    right: 8px;
  }
}

.SInputSelectSearch.md {
  .box {
    min-height: 36px;
  }

  .box-content {
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, 14px);
  }

  .box-placeholder {
    padding-left: 10px;
  }

  .box-icon {
    top: 5px;
    right: 8px;
  }
}

.SInputSelectSearch.small {
  .box {
    min-height: 40px;
  }

  .box-content {
    padding: 0 30px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .box-placeholder {
    padding-left: 12px;
  }

  .box-icon {
    top: 7px;
    right: 8px;
  }
}

.SInputSelectSearch.medium {
  .box {
    min-height: 48px;
  }

  .box-content {
    padding: 0 40px 0 0;
    line-height: 24px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .box-placeholder {
    padding-left: 16px;
  }

  .box-icon {
    top: 11px;
    right: 12px;
  }
}

.SInputSelectSearch.disabled {
  .box {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);
    cursor: not-allowed;

    &:hover { border-color: var(--input-disabled-border-color); }
  }

  .box-icon {
    cursor: not-allowed;
  }
}

.SInputSelectSearch.has-error {
  .box {
    border-color: var(--input-error-border-color);
  }
}
</style>
