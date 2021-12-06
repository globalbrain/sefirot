<template>
  <div class="SInputBase" :class="{ 'has-error': hasError }">
    <label v-if="label" class="label" :for="name">
      {{ label }} <span class="note">{{ note }}</span>
    </label>

    <slot />

    <div class="help">
      <slot name="before-help" />
      <p v-if="showError" class="help-error">{{ errorMsg }}</p>
      <p v-if="help" class="help-text">{{ help }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Validation } from '../composables/Validation'

const props = defineProps({
  name: { type: String, default: null },
  note: { type: String, default: null },
  label: { type: String, default: null },
  help: { type: String, default: null },
  errorMessage: { type: Boolean, default: true },
  validation: { type: Object as PropType<Validation>, default: null }
})

const hasError = computed(() => {
  if (!props.validation) {
    return false
  }

  return props.validation.$dirty && props.validation.$invalid
})

const errorMsg = computed(() => {
  if (!props.validation) {
    return null
  }

  const errors = props.validation.$errors

  return errors.length > 0 ? errors[0].$message : null
})

const showError = computed(() => {
  return props.errorMessage && hasError.value && errorMsg.value
})
</script>

<style lang="postcss" scoped>
.SInputBase.mini {
  .label {
    padding-bottom: 6px;
    font-size: 12px;
  }
}

.SInputBase.small {
  .label {
    padding-bottom: 8px;
    font-size: 14px;
  }
}

.SInputBase.medium {
  .label {
    padding-bottom: 8px;
    font-size: 14px;
  }
}

.SInputBase.has-error {
  .label {
    color: var(--c-danger);
  }
}

.label {
  display: block;
  width: 100%;
  line-height: 16px;
  font-weight: 500;
  color: var(--input-label);
  cursor: pointer;
  transition: color .25s;
}

.note {
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--input-note);
}

.help {
  position: relative;
  word-break: break-all;
}

.help-error {
  width: 100%;
  margin: 0;
  padding: 4px 0 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-danger);
  transition: opacity .25s, transform .25s;
}

.help-text {
  margin: 0;
  padding: 4px 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--input-help);
}

.help-error + .help-text,
.help-text + .help-error,
.help-text + .help-text {
  padding: 0;
}
</style>
