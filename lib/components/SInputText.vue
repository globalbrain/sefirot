<template>
  <SInputBase
    class="SInputText"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="box">
      <input
        class="input"
        :class="{ 'has-icon': icon, 'is-clearable': clearable }"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        ref="input"
        @input="emitInput"
        @blur="emitBlur"
        @keypress.enter="emitEnter"
      >

      <div class="icon" role="button" @click="focus" v-if="icon">
        <component :is="icon" class="icon-svg" />
      </div>

      <button class="clear" :class="{ show: showClearButton }" @click="emitClear" v-if="clearable">
        <SIconX class="clear-svg" />
      </button>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { createComponent, ref, computed, PropType } from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SIconX from './icons/SIconX.vue'
import SInputBase from './SInputBase.vue'

export default createComponent({
  components: {
    SIconX,
    SInputBase
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    icon: { type: Object, default: null },
    clearable: { type: Boolean, default: false },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup (props, context) {
    const input = ref<HTMLElement | null>(null)

    const showClearButton = computed(() => {
      return props.value !== null && props.value !== undefined && props.value !== ''
    })

    function focus () {
      (input.value as HTMLElement).focus()
    }

    function blur () {
      (input.value as HTMLElement).blur()
    }

    function emitInput (e: InputEvent) {
      context.emit('input', (e.target as HTMLInputElement).value)
    }

    function emitBlur (e: InputEvent) {
      props.validation.$touch()
      context.emit('blur', (e.target as HTMLInputElement).value)
    }

    function emitEnter (e: InputEvent) {
      blur()
      context.emit('enter', (e.target as HTMLInputElement).value)
    }

    function emitClear () {
      context.emit('clear')
    }

    return {
      input,
      showClearButton,
      focus,
      blur,
      emitInput,
      emitBlur,
      emitEnter,
      emitClear
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputText.has-error {
  .input {
    border-color: var(--c-danger);

    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.box {
  position: relative;

  &:hover .input {
    border-color: var(--c-gray);
  }
}

.input {
  display: block;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 11px 16px;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
  background-color: var(--c-white-mute);
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--c-text-light-2);
  }

  &:focus {
    border-color: var(--c-black);
    background-color: var(--c-white);
  }

  &.has-icon {
    padding-left: 40px;
  }

  &.is-clearable {
    padding-right: 40px;
  }
}

.icon {
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: text;
}

.icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--c-gray-dark-1);
}

.clear {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity .25s;

  &:hover .clear-svg {
    fill: var(--c-gray);
  }

  &.show {
    opacity: 1;
  }
}

.clear-svg {
  display: block;
  width: 12px;
  height: 12px;
  fill: var(--c-black);
  transition: fill .25s;
}
</style>
