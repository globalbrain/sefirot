<template>
  <div class="SInputBase" :class="{ 'has-error': hasError }">
    <label v-if="label" class="label" :for="name">
      {{ label }} <span class="note">{{ note }}</span>
    </label>

    <slot />

    <div class="help">
      <p v-if="showError" :key="errorMsg" class="help-error">{{ errorMsg }}</p>
      <p v-if="help" class="help-text">{{ help }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'
import { Validation } from '../validation/Validation'

export default defineComponent({
  props: {
    name: { type: String, default: null },
    note: { type: String, default: null },
    label: { type: String, default: null },
    help: { type: String, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props) {
    const hasError = computed(() => {
      if (!props.validation) {
        return false
      }

      return props.validation.$isDirty.value && !props.validation.$isValid.value
    })

    const errorMsg = computed(() => {
      if (!props.validation) {
        return null
      }

      const errors = props.validation.$errors.value

      return errors.length > 0 ? errors[0][1] : null
    })

    const showError = computed(() => hasError.value && errorMsg.value)

    return {
      hasError,
      errorMsg,
      showError
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputBase.mini {
  .label {
    padding-bottom: 4px;
    font-size: 12px;
  }

  .help-error + .help-text {
    padding: 0;
  }

  .help-text {
    padding-top: 4px;
  }
}

.SInputBase.has-error {
  .label {
    color: var(--c-danger);
  }
}

.label {
  display: block;
  padding-bottom: 8px;
  width: 100%;
  line-height: 20px;
  font-size: 14px;
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

.help-error + .help-text {
  padding: 0;
}

.help-text {
  margin: 0;
  padding: 6px 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--input-help);
}
</style>
