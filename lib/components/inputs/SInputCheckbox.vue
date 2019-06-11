<template>
  <SInputBase
    class="SInputCheckbox"
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

<script>
import SInputBase from './SInputBase'

export default {
  components: {
    SInputBase
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    text: { type: String, default: null },
    value: { type: Boolean, default: false }
  },

  methods: {
    emitChange () {
      this.$emit('change', !this.value)
    }
  }
}
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
      border-color: var(--c-black);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-black);
  }

  .check {
    opacity: 1;
    transform: scale(1);
  }
}

.box {
  position: relative;
  border: 2px solid var(--c-gray);
  border-radius: 2px;
  width: 18px;
  height: 18px;
  transition: border-color .25s;
}

.check {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 10px;
  height: 10px;
  background-color: var(--c-black);
  opacity: 0;
  transform: scale(0);
  transition: opacity .25s, transform .1s;
}

.text {
  padding-left: 12px;
  line-height: 20px;
  font-size: 14px;
}
</style>
