<template lang="md">
<StoryBase title="Input in other sizes">
  <div class="input">
    <SInputText
      v-model="textMedium"
      name="size-medium-name"
      label="Medium input"
      placeholder="John Doe"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textMini"
      size="mini"
      name="size-mini-name"
      label="Mini input"
      placeholder="John Doe"
    />
  </div>
</StoryBase>

```html
<template>
  <div class="input">
    <SInputText
      v-model="textMedium"
      name="size-medium-name"
      label="Medium input"
      placeholder="John Doe"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textMini"
      size="mini"
      name="size-mini-name"
      label="Mini input"
      placeholder="John Doe"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default defineComponent({
  components: {
    SInputText
  },

  setup() {
    const textMedium = ref('')
    const textMini = ref('')

    return {
      textMedium,
      textMini
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}

.input + .input {
  padding-top: 24px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SIconSearch from '@@/lib/components/icons/SIconSearch.vue'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputText,
    StoryBase
  },

  setup () {
    const textMedium = ref('')
    const textMini = ref('')

    return {
      icon: SIconSearch,
      textMedium,
      textMini
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}

.input + .input {
  padding-top: 24px;
}
</style>
