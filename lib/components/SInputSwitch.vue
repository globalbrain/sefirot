<template>
  <SInputBase
    class="SInputSwitch"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="SInputSwitch-container">
      <div class="SInputSwitch-input" :class="{ on: value }" role="button" @click="emitChange">
        <p v-if="text" class="SInputSwitch-text" :class="[textMode]">{{ text }}</p>

        <div class="SInputSwitch-box">
          <div class="SInputSwitch-check" />
        </div>
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small'
type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type TextMode = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export default defineComponent({
  components: {
    SInputBase
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    size: { type: String as PropType<Size>, default: 'small' },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    text: { type: String, default: null },
    textMode: { type: String as PropType<TextMode>, default: 'neutral' },
    help: { type: String, default: null },
    value: { type: Boolean, required: true }
  },

  setup(props, { emit }) {
    const classes = computed(() => [
      props.size,
      props.mode
    ])

    function emitChange(): void {
      emit('change', !props.value)
    }

    return {
      classes,
      emitChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputSwitch.mini {
  .SInputSwitch-box {
    margin: 1px 0 0;
    border-radius: 9px;
    width: 36px;
    height: 18px;
  }

  .SInputSwitch-check {
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    transition: background-color .25s, transform .25s;
  }
}

.SInputSwitch.small {
  .SInputSwitch-box {
    margin: -1px 0 -1px;
    border-radius: 11px;
    width: 40px;
    height: 22px;
  }

  .SInputSwitch-check {
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    transition: background-color .25s, transform .25s;
  }
}

.SInputSwitch.neutral .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-black);
  background-color: var(--c-black);
}

.SInputSwitch.info .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-info);
  background-color: var(--c-info);
}

.SInputSwitch.success .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-success);
  background-color: var(--c-success);
}

.SInputSwitch.warning .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-warning);
  background-color: var(--c-warning);
}

.SInputSwitch.danger .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-danger);
  background-color: var(--c-danger);
}

.SInputSwitch-container {
  display: flex;
}

.SInputSwitch-input {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  &:hover {
    .SInputSwitch-box   { border-color: var(--c-black); }
    .SInputSwitch-check { background-color: var(--c-black); }
  }
}

.SInputSwitch-input.on .SInputSwitch-check {
  background-color: var(--c-white);
  transform: translateX(18px);
}

.SInputSwitch-text {
  flex-grow: 1;
  margin: 0;
  padding-right: 16px;
  line-height: 20px;
  font-size: 14px;
}

.SInputSwitch-text.mute {
  color: var(--c-text-light-2);
  font-weight: 500;
}

.SInputSwitch-text.info    { color: var(--c-info); }
.SInputSwitch-text.success { color: var(--c-success); }
.SInputSwitch-text.warning { color: var(--c-warning); }
.SInputSwitch-text.danger  { color: var(--c-danger); }

.SInputSwitch-box {
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--c-gray);
  background-color: var(--c-white-mute);
  transition: border-color .25s, background-color .25s, box-shadow .25s;
}

.SInputSwitch-check {
  position: absolute;
  border-radius: 50%;
  background-color: var(--c-black);
  transition: background-color .25s, transform .25s;
}
</style>
