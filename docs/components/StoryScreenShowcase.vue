<template lang="md">
<StoryBase>
  <div class="actions">
    <SButton class="button" label="OPEN SCREEN" @click="openScreen" />
  </div>

  <ScreenMinimal />
</StoryBase>

```vue
<template>
  <SButton class="button" label="OPEN SCREEN" @click="openScreen" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton.vue'
import { useStore } from '@globalbrain/sefirot/lib/composables/Store'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const store = useStore()

    function openScreen(): void {
      store.dispatch('screen/open', {
        name: 'story-screens-s-screen-minimal'
      })
    }

    return {
      openScreen
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import { useStore } from '@@/lib/composables/Store'
import StoryBase from '@/components/StoryBase.vue'
import ScreenMinimal from './ScreenMinimal.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase,
    ScreenMinimal
  },

  setup() {
    const store = useStore()

    function openScreen(): void {
      store.dispatch('screen/open', {
        name: 'story-screens-s-screen-minimal'
      })
    }

    return {
      openScreen
    }
  }
})
</script>

<style lang="postcss" scoped>
.actions {
  display: flex;
}

.button + .button {
  margin-left: 8px;
}
</style>
