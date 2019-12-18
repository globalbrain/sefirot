<template>
  <SInputBase
    class="SInputSwitch"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="container">
      <div class="input" :class="{ on: value }" role="button" @click="emitChange">
        <p class="text">{{ text }}</p>

        <div class="box">
          <div class="check" />
        </div>
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;

  &:hover {
    .box {
      border-color: var(--c-black);
    }

    .check {
      background-color: var(--c-black);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-black);
    background-color: var(--c-black);
    box-shadow: var(--shadow-depth-3);
  }

  .check {
    background-color: var(--c-white);
    transform: translateX(18px);
  }
}

.text {
  flex-grow: 1;
  margin: 0;
  padding-right: 12px;
  line-height: 20px;
  font-size: 14px;
}

.box {
  position: relative;
  border: 1px solid var(--c-gray-dark-1);
  border-radius: 9px;
  width: 36px;
  height: 18px;
  background-color: var(--c-white-mute);
  transition: border-color .25s, background-color .25s, box-shadow .25s;
}

.check {
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: var(--c-black);
  transition: background-color .25s, transform .25s;
}
</style>
