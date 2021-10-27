<template lang="md">
<StoryBase title="Size variants">
  <div class="input">
    <SInputHMS
      v-model="inputMini"
      size="mini"
      name="input-mini"
      label="Mini input"
    />
  </div>
  <div class="input">
    <SInputHMS
      v-model="inputSmall"
      size="small"
      name="input-small"
      label="Small input"
    />
  </div>
  <div class="input">
    <SInputHMS
      v-model="inputMedium"
      size="medium"
      name="input-medium"
      label="Medium input"
    />
  </div>
</StoryBase>

```vue
<template>
  <div>
    <div class="input">
      <SInputHMS
        v-model="inputMini"
        size="mini"
        name="input-mini"
        label="Mini input"
      />
    </div>
    <div class="input">
      <SInputHMS
        v-model="inputSmall"
        size="small"
        name="input-small"
        label="Small input"
      />
    </div>
    <div class="input">
      <SInputHMS
        v-model="inputMedium"
        size="medium"
        name="input-medium"
        label="Medium input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputHMS from '@globalbrain/sefirot/lib/components/SInputHMS.vue'

export default defineComponent({
  components: {
    SInputHMS
  },

  setup() {
    const inputMini = ref(null)
    const inputSmall = ref(null)
    const inputMedium = ref(null)

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
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputHMS from '@@/lib/components/SInputHMS.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputHMS,
    StoryBase
  },

  setup() {
    const inputMini = ref(null)
    const inputSmall = ref(null)
    const inputMedium = ref(null)

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
