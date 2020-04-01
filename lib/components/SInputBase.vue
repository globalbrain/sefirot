<template>
  <div class="SInputBase" :class="{ 'has-error': hasError }">
    <label v-if="label" class="label" :for="name">
      {{ label }} <span class="note">{{ note }}</span>
    </label>

    <slot />

    <div class="help">
      <p v-if="help" class="help-text">{{ help }}</p>

      <transition name="slide" mode="out-in">
        <p v-if="showError" :key="errorMsg" class="help-error">{{ errorMsg }}</p>
      </transition>
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

  setup (props) {
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

.SInputBase.has-error {
  .label {
    color: var(--c-danger);
  }

  .help-text {
    transform: translateY(14px);
  }
}

.label {
  display: block;
  padding-bottom: 8px;
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color .25s;
}

.note {
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-light-2);
}

.help {
  position: relative;
}

.help-text {
  margin: 0;
  padding: 6px 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-light-2);
  transition: transform .25s;
}

.help-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 2px 0 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-danger);
  transition: opacity .25s, transform .25s;
}

.help-error.slide-enter,
.help-error.slide-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
