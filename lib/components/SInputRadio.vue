<template>
  <SInputBase
    class="SInputRadio"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="container">
      <div class="input" :class="{ on: value }" role="button" @click="emitChange">
        <div class="box">
          <div class="check" />
        </div>

        <p class="text">{{ text }}</p>
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

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
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    text: { type: String, required: true },
    value: { type: Boolean, required: true }
  },

  setup(props, { emit }) {
    function emitChange(): void {
      emit('change', !props.value)
    }

    return {
      emitChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  display: flex;
}

.input {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;

  &:hover {
    .box {
      border-color: var(--c-text-1);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-text-1);
    box-shadow: var(--shadow-depth-3);
  }

  .check {
    opacity: 1;
    transform: scale(.6);
  }
}

.box {
  position: relative;
  border: 2px solid var(--c-text-3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  transition: border-color .25s, box-shadow .25s;
}

.check {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  background-color: var(--c-text-1);
  opacity: 0;
  transform: scale(0);
  transition: opacity .25s, transform .1s;
}

.text {
  margin: 0;
  padding-left: 12px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}
</style>
