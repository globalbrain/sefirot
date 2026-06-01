<script setup lang="ts">
import IconFileText from '~icons/ph/file-text'
import IconTrash from '~icons/ph/trash'
import { type ValidationRuleWithParams } from '@vuelidate/core'
import { type Component, computed } from 'vue'
import { useValidation } from '../composables/Validation'
import { formatSize } from '../support/File'
import SButton, { type Mode as ButtonMode } from './SButton.vue'
import SCardBlock from './SCardBlock.vue'
import SIndicator, { type State as IndicatorState } from './SIndicator.vue'

export interface FileObject {
  file: File
  indicatorState?: IndicatorState | null
  canRemove?: boolean
  action?: Action | null
  errorMessage?: string | null
}

export interface Action {
  mode?: ButtonMode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  label?: string
  onClick(): void
}

const props = defineProps<{
  file: File | FileObject | string
  rules?: Record<string, ValidationRuleWithParams>
}>()

defineEmits<{
  remove: []
}>()

const _file = computed(() => {
  const value = props.file

  if (value instanceof File) {
    return {
      name: value.name,
      file: value as File | null,
      size: formatSize(value) as string | null,
      indicatorState: null as IndicatorState | null,
      canRemove: true,
      action: null as Action | null,
      errorMessage: null as string | null
    }
  }

  // A plain string references an already-uploaded file: show its basename
  // and skip the size (unknown for server-side files).
  if (typeof value === 'string') {
    return {
      name: value.split('/').pop() || value,
      file: null,
      size: null,
      indicatorState: null,
      canRemove: true,
      action: null,
      errorMessage: null
    }
  }

  return {
    name: value.file.name,
    file: value.file as File | null,
    size: formatSize(value.file) as string | null,
    indicatorState: value.indicatorState ?? null,
    canRemove: value.canRemove ?? true,
    action: value.action ?? null,
    errorMessage: value.errorMessage ?? null
  }
})

const { validation } = useValidation(() => ({
  file: _file.value.file
}), {
  file: props.rules ?? {}
})

validation.value.$touch()
</script>

<template>
  <SCardBlock class="SInputFileUploadItem">
    <div class="name">
      <div class="name-label">
        <div class="name-icon">
          <IconFileText v-if="_file.indicatorState == null" class="name-icon-svg" />
          <SIndicator v-else size="fill" :state="_file.indicatorState" />
        </div>
        <p class="name-text">{{ _file.name }}</p>
      </div>
      <p v-if="_file.errorMessage" class="error">
        {{ _file.errorMessage }}
      </p>
      <p v-else-if="validation.$errors.length" class="error">
        {{ validation.$errors[0]?.$message }}
      </p>
    </div>
    <div v-if="_file.action" class="action">
      <SButton
        type="text"
        size="small"
        :mode="_file.action.mode"
        :icon="_file.action.icon"
        :lead-icon="_file.action.leadIcon"
        :trail-icon="_file.action.trailIcon"
        :label="_file.action.label"
        @click="_file.action.onClick"
      />
    </div>
    <div class="meta">
      <div v-if="_file.size" class="size">
        {{ _file.size }}
      </div>
      <div class="delete">
        <SButton
          size="small"
          type="text"
          mode="mute"
          :icon="IconTrash"
          :disabled="!_file.canRemove"
          @click="$emit('remove')"
        />
      </div>
    </div>
  </SCardBlock>
</template>

<style lang="postcss" scoped>
.SInputFileUploadItem {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 8px 8px 16px;
}

.name {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.name-icon-svg {
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
}

.name-text {
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.error {
  padding-left: 24px;
  line-height: 20px;
  font-size: 12px;
  color: var(--c-text-danger-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action {
  flex-shrink: 0;
}

.meta {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
}

.size {
  flex-shrink: 0;
  line-height: 24px;
  font-size: 12px;
  color: var(--c-text-2);
}

.delete {
  flex-shrink: 0;
}
</style>
