<template lang="md">
<StoryBase title="Mini Button Groups">
  <div class="group">
    <SButtonGroup
      :buttons="buttons"
      v-model="value"
      size="mini"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="group">
    <SButtonGroup
      :buttons="buttons"
      v-model="value"
      size="mini"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@nuxtjs/composition-api'
import SButtonGroup from '@globalbrain/sefirot/lib/components/SButtonGroup.vue'

export default defineComponent({
  components: {
    SButtonGroup
  },

  setup() {
    const value = ref(null)
    const buttons = computed(() => [
      { label: 'Button A', value: 'buttonA' },
      { label: 'Button B', value: 'buttonB' },
      { label: 'Button C', value: 'buttonC' }
    ])

    return {
      value,
      buttons
    }
  }
})
</script>

<style lang="postcss" scoped>
.group {
  max-width: 320px;
}
</style>
```
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import SButtonGroup from '@@/lib/components/SButtonGroup.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButtonGroup,
    StoryBase
  },

  setup() {
    const value = ref(null)
    const buttons = computed(() => [
      { label: "Button A", value: 'buttonA' },
      { label: "Button B", value: 'buttonB' },
      { label: "Button C", value: 'buttonC' }
    ])

    return {
      value,
      buttons
    }
  },
})
</script>

<style lang="postcss" scoped>
.group {
  max-width: 320px;
}
</style>
