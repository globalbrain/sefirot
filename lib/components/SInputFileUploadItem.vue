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
  file: File | FileObject
  rules?: Record<string, ValidationRuleWithParams>
}>()

defineEmits<{
  remove: []
}>()

const _file = computed(() => ({
  name: props.file instanceof File ? props.file.name : props.file.file.name,
  file: props.file instanceof File ? props.file : props.file.file,
  size: formatSize(props.file instanceof File ? props.file : props.file.file),
  indicatorState: props.file instanceof File ? null : props.file.indicatorState,
  canRemove: props.file instanceof File ? true : props.file.canRemove ?? true,
  action: props.file instanceof File ? null : props.file.action,
  errorMessage: props.file instanceof File ? null : props.file.errorMessage
}))

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
      <p v-if="_file.errorMessage" class="error">{{ _file.errorMessage }}</p>
      <p v-else-if="validation.$errors.length" class="error">{{ validation.$errors[0]?.$message }}</p>
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
      <div class="size">
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
