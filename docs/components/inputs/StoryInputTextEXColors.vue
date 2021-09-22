<template lang="md">
<StoryBase title="Input with colors">
  <div class="input">
    <SInputText
      v-model="textNeutral"
      name="name-color-neutral"
      label="Neutral"
      placeholder="John Doe"
      :color="colorNeutral"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textInfo"
      name="name-color-info"
      label="Info"
      placeholder="John Doe"
      :color="colorInfo"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textSuccess"
      name="name-color-success"
      label="Success"
      placeholder="John Doe"
      :color="colorSuccess"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textWarning"
      name="name-color-warning"
      label="Warning"
      placeholder="John Doe"
      :color="colorWarning"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textDanger"
      name="name-color-danger"
      label="Danger"
      placeholder="John Doe"
      :color="colorDanger"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="input">
    <SInputText
      v-model="textNeutral"
      name="name-color-neutral"
      label="Neutral"
      placeholder="John Doe"
      :color="colorNeutral"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textInfo"
      name="name-color-info"
      label="Info"
      placeholder="John Doe"
      :color="colorInfo"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textSuccess"
      name="name-color-success"
      label="Success"
      placeholder="John Doe"
      :color="colorSuccess"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textWarning"
      name="name-color-warning"
      label="Warning"
      placeholder="John Doe"
      :color="colorWarning"
    />
  </div>
  <div class="input">
    <SInputText
      v-model="textDanger"
      name="name-color-danger"
      label="Danger"
      placeholder="John Doe"
      :color="colorDanger"
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
    const textNeutral = ref('')
    const textInfo = ref('')
    const textSuccess = ref('')
    const textWarning = ref('')
    const textDanger = ref('')

    const colorNeutral = (value: string) => value.length < 10 ? 'neutral' : null
    const colorInfo = (value: string) => value.length < 10 ? 'info' : null
    const colorSuccess = (value: string) => value.length < 10 ? 'success' : null
    const colorWarning = (value: string) => value.length < 10 ? 'warning' : null
    const colorDanger = (value: string) => value.length < 10 ? 'danger' : null

    return {
      textNeutral,
      textInfo,
      textSuccess,
      textWarning,
      textDanger,
      colorNeutral,
      colorInfo,
      colorSuccess,
      colorWarning,
      colorDanger
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
    const textNeutral = ref('')
    const textInfo = ref('')
    const textSuccess = ref('')
    const textWarning = ref('')
    const textDanger = ref('')

    const colorNeutral = (value: string) => value.length < 10 ? 'neutral' : null
    const colorInfo = (value: string) => value.length < 10 ? 'info' : null
    const colorSuccess = (value: string) => value.length < 10 ? 'success' : null
    const colorWarning = (value: string) => value.length < 10 ? 'warning' : null
    const colorDanger = (value: string) => value.length < 10 ? 'danger' : null

    return {
      textNeutral,
      textInfo,
      textSuccess,
      textWarning,
      textDanger,
      colorNeutral,
      colorInfo,
      colorSuccess,
      colorWarning,
      colorDanger
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
