<script setup lang="ts">
import IconX from '~icons/ph/x'
import { type SnackbarAction, useSnackbars } from '../stores/Snackbars'
import SButton from './SButton.vue'

const props = defineProps<{
  id: number
  mode?: 'neutral' | 'info' | 'warning' | 'danger'
  text: string
  actions?: SnackbarAction[]
}>()

const snackbars = useSnackbars()

function close() {
  snackbars.pop(props.id)
}
</script>

<template>
  <div class="SSnackbar" :class="[mode ?? 'neutral']">
    <button class="close" @click="close">
      <IconX class="close-icon" />
    </button>

    <p class="content">
      {{ text }}
    </p>

    <div v-if="actions" class="actions">
      <div v-for="(action, index) in actions" :key="index" class="action">
        <SButton
          size="medium"
          type="text"
          :label="action.label"
          @click="action.onClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SSnackbar {
  position: relative;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
  width: 100%;
  background-color: var(--c-bg-elv-3);
  box-shadow: var(--shadow-depth-3);
  overflow: hidden;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    content: "";
  }

  &.neutral::before { background-color: var(--c-fg-gray-1); }
  &.info::before    { background-color: var(--c-fg-info-1); }
  &.warning::before { background-color: var(--c-fg-warning-1); }
  &.danger::before  { background-color: var(--c-fg-danger-1); }
}

.close {
  position: absolute;
  top: 2px;
  right: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 45px;

  &:hover {
    .close-icon {
      color: var(--c-text-1);
    }
  }
}

.close-icon {
  width: 16px;
  height: 16px;
  color: var(--c-text-3);
  transition: color .25s;
}

.content {
  position: relative;
  z-index: 10;
  padding: 14px 68px 14px 16px;
  line-height: 20px;
  font-size: 14px;
  color: var(--c-text-1);
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: -8px;
  padding: 0 8px 8px;
}

.action {
  & + & {
    padding-left: 4px;
  }
}
</style>
