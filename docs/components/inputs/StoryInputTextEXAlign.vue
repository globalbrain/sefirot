<template lang="md">
<StoryBase title="Aligned Input">
  <div class="input">
    <SInputText
      v-model="textLeft"
      name="name-aligned-left"
      label="Left aligned"
      align="left"
      placeholder="John Doe"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textCenter"
      name="name-aligned-center"
      label="Center aligned"
      align="center"
      placeholder="John Doe"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textRight"
      name="name-aligned-right"
      label="Right aligned"
      align="right"
      placeholder="John Doe"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputText
      v-model="textLeft"
      name="name-aligned-left"
      label="Left aligned"
      align="left"
      placeholder="John Doe"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textCenter"
      name="name-aligned-center"
      label="Center aligned"
      align="center"
      placeholder="John Doe"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textRight"
      name="name-aligned-right"
      label="Right aligned"
      align="right"
      placeholder="John Doe"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default defineComponent({
  components: {
    SInputText
  },

  setup() {
    const textLeft = ref('')
    const textCenter = ref('')
    const textRight = ref('')

    return {
      textLeft,
      textCenter,
      textRight
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
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputText,
    StoryBase
  },

  setup() {
    const textLeft = ref('')
    const textCenter = ref('')
    const textRight = ref('')

    return {
      textLeft,
      textCenter,
      textRight
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
