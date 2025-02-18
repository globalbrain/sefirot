<script setup lang="ts">
import { type Component } from 'vue'
import { type ActionList } from './SActionList.vue'
import SActionMenu from './SActionMenu.vue'
import SButton, { type Mode, type Tooltip } from './SButton.vue'

export interface Props {
  value?: string | null
  actions?: Action[]
}

export type Action = ActionButton | ActionMenu

export interface ActionBase {
  type?: 'button' | 'menu'
  mode?: Mode
  icon: Component
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
}

export interface ActionButton extends ActionBase {
  type?: 'button'
  onClick(): void
}

export interface ActionMenu extends ActionBase {
  type: 'menu'
  options: ActionList
}

defineProps<Props>()

function isActionButton(action: Action): action is ActionButton {
  return (action.type ?? 'button') === 'button'
}
</script>

<template>
  <div class="SDescLabel">
    <div class="value">
      <slot v-if="$slots.default" />
      <template v-else>{{ value }}</template>
    </div>
    <div v-if="actions?.length" class="actions">
      <template v-for="action, index in actions" :key="index">
        <SButton
          v-if="isActionButton(action)"
          type="text"
          size="mini"
          :mode="action.mode ?? 'mute'"
          :icon="action.icon"
          :loading="action.loading"
          :disabled="action.disabled"
          :tooltip="action.tooltip"
          @click="action.onClick"
        />
        <SActionMenu
          v-else
          type="text"
          size="mini"
          :mode="action.mode ?? 'mute'"
          :icon="action.icon"
          :loading="action.loading"
          :disabled="action.disabled"
          :tooltip="action.tooltip"
          :options="[{ type: 'menu', options: action.options }]"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDescLabel {
  display: flex;
  gap: 16px;
  height: 28px;
}

.value {
  flex-grow: 1;
  line-height: 28px;
  font-size: 14px;
  font-weight: 400;
  color: var(--c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
