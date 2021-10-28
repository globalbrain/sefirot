<template>
  <SInputBase
    class="SInputFile"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
    :validation="validation"
  >
    <input
      ref="input"
      class="input"
      type="file"
      @change="e => handleChange(e.target.files[0])"
    >

    <div class="box" role="button" @click="open">
      <div class="action">
        <button class="button">
          {{ text }}
        </button>
      </div>

      <div class="text">
        <p v-if="fileName" class="file-name">{{ fileName }}</p>
        <p v-else-if="placeholder" class="placeholder">{{ placeholder }}</p>
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

export default defineComponent({
  components: {
    SInputBase
  },

  props: {
    size: { type: String as PropType<Size>, default: 'small' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    text: { type: String, default: 'Choose File' },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    errorMessage: { type: Boolean, default: true },
    value: { type: File, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, { emit }) {
    const input = ref<HTMLInputElement | null>(null)

    const classes = computed(() => [props.size])

    const fileName = computed(() => {
      return props.value ? props.value.name : null
    })

    function open(): void {
      input.value!.click()
    }

    function handleChange(file?: File): void {
      emit('input', file ?? null)
      file && props.validation?.$touch()
    }

    return {
      input,
      classes,
      fileName,
      open,
      handleChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputFile.mini {
  .action {
    padding: 2px 8px 2px 2px;
  }

  .button {
    padding: 0 8px;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 30px;
    font-size: 12px;
    font-weight: 500;
  }
}

.SInputFile.small {
  .action {
    padding: 5px 8px 5px 5px;
  }

  .button {
    padding: 0 8px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 38px;
    font-size: 14px;
  }

  .placeholder {
    font-weight: 500;
  }
}

.SInputFile.medium {
  .action {
    padding: 7px 8px 7px 7px;
  }

  .button {
    padding: 0 12px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 46px;
    font-size: 14px;
  }

  .placeholder {
    font-weight: 500;
  }
}

.SInputFile.has-error {
  .box,
  .box:hover {
    border-color: var(--c-danger);
  }
}

.input {
  display: none;
}

.box {
  display: flex;
  border: 1px solid var(--input-outlined-border);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color .25s;

  &:hover {
    border-color: var(--input-outlined-border-focus);

    .button {
      background-color: var(--c-gray-light-4);
    }
  }
}

.dark-mode .box {
  &:hover {
    .button {
      background-color: var(--c-gray-dark-3);
    }
  }
}

.action {
  flex-shrink: 0;
}

.button {
  border: 1px solid var(--c-divider-light);
  border-radius: 4px;
  color: var(--c-text-1);
  background-color: var(--c-white-mute);
  transition: background-color .25s;
}

.dark-mode .button {
  background-color: var(--c-black-mute);
  transition: background-color .25s;
}

.text {
  flex-grow: 1;
  overflow: hidden;
}

.file-name,
.placeholder {
  margin: 0;
  padding-right: 12px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placeholder {
  color: var(--input-placeholder);
}
</style>
