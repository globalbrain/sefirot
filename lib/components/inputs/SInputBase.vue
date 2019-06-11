<template>
  <div class="SInputBase" :class="{ 'has-error': hasError }">
    <label class="label" v-if="label" :for="name">
      {{ label }} <span class="note">{{ note }}</span>
    </label>

    <slot />

    <div class="help">
      <p class="help-text" v-if="help">{{ help }}</p>

      <transition name="slide" mode="out-in">
        <p class="help-error" v-if="hasError" :key="errorMsg">{{ errorMsg }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import Validation from '../../validation/Validation'

export default {
  props: {
    name: { type: String, default: null },
    note: { type: String, default: null },
    label: { type: String, default: null },
    help: { type: String, default: null },
    validation: { type: Object, default: null }
  },

  computed: {
    hasError () {
      return Validation.hasError(this.validation)
    },

    errorMsg () {
      return Validation.getErrorMsg(this.validation)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputBase.has-error {
  .label {
    color: var(--c-danger);
  }

  .help-text {
    transform: translateY(20px);
  }
}

.label {
  display: block;
  padding-bottom: 8px;
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: color .25s;
}

.note {
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  color: var(--c-gray);
}

.help {
  position: relative;
}

.help-text {
  padding: 4px 0 0;
  line-height: 20px;
  font-size: 14px;
  color: var(--c-gray);
  transition: transform .25s;
}

.help-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 4px 0 0 0;
  line-height: 20px;
  font-size: 14px;
  color: var(--c-danger);
  transition: opacity .25s, transform .25s;
}

.help-error.slide-enter,
.help-error.slide-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
