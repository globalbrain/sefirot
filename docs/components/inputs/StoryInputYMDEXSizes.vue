<template lang="md">
<StoryBase>
  <div class="input">
    <SInputYMD
      v-model="inputMini"
      size="mini"
      name="input-mini"
      label="Mini input"
    />
  </div>
  <div class="input">
    <SInputYMD
      v-model="inputSmall"
      size="small"
      name="input-small"
      label="Small input"
    />
  </div>
  <div class="input">
    <SInputYMD
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
      <SInputYMD
        v-model="inputMini"
        size="mini"
        name="input-mini"
        label="Mini input"
      />
    </div>
    <div class="input">
      <SInputYMD
        v-model="inputSmall"
        size="small"
        name="input-small"
        label="Small input"
      />
    </div>
    <div class="input">
      <SInputYMD
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
import SInputYMD from '@globalbrain/sefirot/lib/components/SInputYMD.vue'

export default defineComponent({
  components: {
    SInputYMD
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
.input {
  max-width: 160px;
}

.input + .input {
  padding-top: 24px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SInputYMD from '@@/lib/components/SInputYMD.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputYMD,
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
.input {
  max-width: 160px;
}

.input + .input {
  padding-top: 24px;
}
</style>
