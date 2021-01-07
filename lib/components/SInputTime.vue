<template>
  <SInputBase
    class="SInputTime"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="box">
      <input
        :id="name"
        ref="input"
        class="input"
        :value="value"
        placeholder="HH:MM"
        @click.stop
        @blur="handleBlur"
        @focus="openSelector"
      >

      <transition name="fade">
        <div v-if="on" class="selectors" @click.stop>
          <div class="selector hours">
            <div class="title">HOUR</div>
            <div class="values">
              <button
                v-for="hour in hours"
                :key="hour"
                class="value"
                :class="{ active: hValue === hour }"
                @click="setHour(hour)"
              >
                {{ hour }}
              </button>
            </div>
          </div>

          <div class="selector minutes">
            <div class="title">MIN</div>
            <div class="values">
              <button
                v-for="minute in minutes"
                :key="minute"
                class="value"
                :class="{ active: mValue === minute }"
                @click="setMin(minute)"
              >
                {{ minute }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, PropType } from '@vue/composition-api'
import useTime from '../compositions/useTime'
import { Validation } from '../validation/Validation'
import SInputBase from './SInputBase.vue'

export default defineComponent({
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
    value: { type: String, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, context) {
    const input = ref<HTMLInputElement | null>(null)

    const on = ref(false)

    const { hours, minutes } = useTime()

    const values = computed(() => props.value ? props.value.split(':') : '00:00'.split(':'))
    const hValue = computed(() => values.value[0])
    const mValue = computed(() => values.value[1])

    onMounted(() => {
      window.addEventListener('click', closeSelector)
    })

    onUnmounted(() => {
      window.removeEventListener('click', closeSelector)
    })

    function openSelector(): void {
      on.value = true
    }

    function closeSelector(): void {
      on.value = false
    }

    function handleBlur(e: Event): void {
      let value: string | null = (e.target as HTMLInputElement).value

      if (!value) {
        value = null
      } else if (!value.match(/^[0-2][0-3]:[0-5][0-9]$/)) {
        value = [hValue.value, mValue.value].join(':')
      }

      context.emit('change', value)
      updateInput(value ?? '')
    }

    function updateInput(value: string): void {
      (input.value as HTMLInputElement).value = value
    }

    function setHour(hour: string): void {
      context.emit('change', [hour, mValue.value].join(':'))
    }

    function setMin(minute: string): void {
      context.emit('change', [hValue.value, minute].join(':'))
    }

    return {
      input,
      on,
      hours,
      minutes,
      hValue,
      mValue,
      openSelector,
      handleBlur,
      setHour,
      setMin
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputTime.has-error {
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
}

.selectors {
  position: absolute;
  top: 56px;
  left: 0;
  z-index: var(--z-index-screen);
  display: flex;
  border-radius: 4px;
  padding: 12px;
  background-color: var(--c-black-elevated);
  box-shadow: var(--shadow-depth-3);
  transition: opacity .25s, transform .25s;
}

.selectors.fade-enter,
.selectors.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.selector {
  width: 56px;
  text-align: center;
}

.selector + .selector {
  margin-left: 4px;
}

.title {
  padding-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-dark-2);
}

.values {
  height: 178px;
  overflow: hidden;
  overflow-y: auto;
}

.value {
  display: block;
  border-radius: 2px;
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-dark-2);
  transition: background-color .25s;
  cursor: pointer;

  &:hover {
    background-color: var(--c-black-elevated-mute);
  }

  &.active {
    color: var(--c-text-dark-1);
  }
}
</style>
