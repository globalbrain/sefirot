<template lang="md">
<StoryBase title="Size variants">
  <div>
    <div class="input">
      <SInputFile
        v-model="inputMini"
        size="mini"
        label="Mini input"
        placeholder="No file chosen"
      />
    </div>
    <div class="input">
      <SInputFile
        v-model="inputSmall"
        size="small"
        label="Small input"
        placeholder="No file chosen"
      />
    </div>
    <div class="input">
      <SInputFile
        v-model="inputMedium"
        size="medium"
        label="Medium input"
        placeholder="No file chosen"
      />
    </div>
  </div>
</StoryBase>

```vue
<template>

</template>

<script lang="ts">

</script>

<style lang="postcss" scoped>

</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputFile from '@@/lib/components/SInputFile.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputFile,
    StoryBase
  },

  setup() {
    const inputMini = ref<File | null>(null)
    const inputSmall = ref<File | null>(null)
    const inputMedium = ref<File | null>(null)

    return {
      inputMini,
      inputSmall,
      inputMedium
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.input + .input {
  padding-top: 24px;
}
</style>
