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
    text: { type: String, required: true },
    value: { type: Boolean, required: true }
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
    box-shadow: var(--shadow-depth-3);
  }

  .check {
    opacity: 1;
    transform: scale(.6);
  }
}

.box {
  position: relative;
  border: 2px solid var(--c-gray-dark);
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
  background-color: var(--c-black);
  opacity: 0;
  transform: scale(0);
  transition: opacity .25s, transform .1s;
}

.text {
  margin: 0;
  padding-left: 12px;
  line-height: 20px;
  font-size: 14px;
}
</style>
