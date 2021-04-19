<template lang="md">
<StoryBase>
  <div class="item">
    <SInputSwitch
      name="input"
      label="Label"
      note="Note text"
      text="Text for the switch"
      help="This is a help text."
      v-model="on"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="item">
    <SInputSwitch
      name="input"
      label="Label"
      note="Note text"
      text="Text for the switch"
      help="This is a help text."
      v-model="on"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputSwitch from '@globalbrain/sefirot/lib/components/SInputSwitch.vue'

export default defineComponent({
  components: {
    SInputSwitch
  },

  setup() {
    const on = ref(false)

    return {
      on
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.item {
  width: 192px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SInputSwitch from '@@/lib/components/SInputSwitch.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SInputSwitch,
    StoryBase
  },

  setup() {
    const on = ref(false)

    return {
      on
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.item {
  width: 192px;
}
</style>
