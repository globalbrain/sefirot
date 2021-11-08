<template lang="md">
<StoryBase title="Input with text">
  <div class="form">
    <div class="input">
      <SInputText
        label="Disabled outlined input"
        mode="outlined"
        value="This text is not editable."
        disabled
      />
    </div>
    <div class="input">
      <SInputText
        label="Disabled filled input"
        mode="filled"
        value="This text is not editable."
        disabled
      />
    </div>
  </div>
</StoryBase>

```vue
<template>
  <div class="form">
    <div class="input">
      <SInputText
        label="Disabled outlined input"
        mode="outlined"
        value="This text is not editable."
        disabled
      />
    </div>
    <div class="input">
      <SInputText
        label="Disabled filled input"
        mode="filled"
        value="This text is not editable."
        disabled
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

export default defineComponent({
  components: {
    SInputText
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
import { defineComponent } from '@nuxtjs/composition-api'
import SInputText from '@@/lib/components/SInputText.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputText,
    StoryBase
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
