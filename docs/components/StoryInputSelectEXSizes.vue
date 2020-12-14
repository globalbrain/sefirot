<template lang="md">
<StoryBase>
  <div class="input">
    <SInputSelect
      v-model="inputMedium"
      name="medium-input"
      label="Label"
      placeholder="Please select an item"
      :options="optionsMedium"
    />
  </div>
  <div class="input">
    <SInputSelect
      v-model="inputMini"
      size="mini"
      name="mini-input"
      label="Label"
      placeholder="Please select an item"
      :options="optionsMini"
    />
  </div>
</StoryBase>

```html
<template>
  <div class="input">
    <SInputSelect
      v-model="inputMedium"
      name="medium-input"
      label="Label"
      placeholder="Please select an item"
      :options="optionsMedium"
    />
  </div>
  <div class="input">
    <SInputSelect
      v-model="inputMini"
      size="mini"
      name="mini-input"
      label="Label"
      placeholder="Please select an item"
      :options="optionsMini"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputSelect from '@globalbrain/sefirot/lib/components/SInputSelect.vue'

export default defineComponent({
  components: {
    SInputSelect
  },

  setup () {
    const inputMedium = ref<number | null>(null)
    const inputMini = ref<number | null>(null)

    const optionsMedium = [
      { label: 'First option', value: 1 },
      { label: 'Second option', value: 2 },
      { label: 'Third option', value: 3 }
    ]

    const optionsMini = [
      { label: 'First option', value: 1 },
      { label: 'Second option', value: 2 },
      { label: 'Third option', value: 3 }
    ]

    return {
      inputMedium,
      inputMini,
      optionsMedium,
      optionsMini
    }
  }
})
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputSelect from '@@/lib/components/SInputSelect.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputSelect,
    StoryBase
  },

  setup () {
    const inputMedium = ref<number | null>(null)
    const inputMini = ref<number | null>(null)

    const optionsMedium = [
      { label: 'First option', value: 1 },
      { label: 'Second option', value: 2 },
      { label: 'Third option', value: 3 }
    ]

    const optionsMini = [
      { label: 'First option', value: 1 },
      { label: 'Second option', value: 2 },
      { label: 'Third option', value: 3 }
    ]

    return {
      inputMedium,
      inputMini,
      optionsMedium,
      optionsMini
    }
  }
})
</script>

<style lang="postcss" scoped>
.input {
  max-width: 320px;
}

.input + .input {
  padding-top: 24px;
}
</style>
