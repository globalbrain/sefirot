<template lang="md">
<StoryBase>
  <div class="actions">
    <SButton class="button" label="BASIC WINDOW" @click="openWindow01" />
    <SButton class="button" label="WITH LEAD TEXT" @click="openWindow02" />
    <SButton class="button" label="BLANK WINDOW" @click="openWindow03" />
  </div>

  <WindowMinimalBasic />
  <WindowMinimalWithLead />
  <WindowMinimalBlank />
</StoryBase>

```vue
<template>
  <SButton class="button" label="BASIC WINDOW" @click="openWindow01" />
  <SButton class="button" label="WITH LEAD TEXT" @click="openWindow02" />
  <SButton class="button" label="BLANK WINDOW" @click="openWindow03" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import { useStore } from '@globalbrain/sefirot/lib/composables/Store'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const store = useStore()

    function openWindow01(): void {
      store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal'
      })
    }

    function openWindow02(): void {
      store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-with-lead'
      })
    }

    function openWindow03(): void {
      store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-blank'
      })
    }

    return {
      openWindow01,
      openWindow02,
      openWindow03
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
import WindowMinimalBasic from './WindowMinimalBasic.vue'
import WindowMinimalWithLead from './WindowMinimalWithLead.vue'
import WindowMinimalBlank from './WindowMinimalBlank.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase,
    WindowMinimalBasic,
    WindowMinimalWithLead,
    WindowMinimalBlank
  },

  setup() {
    const store = useStore()

    function openWindow01(): void {
      store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal'
      })
    }

    function openWindow02(): void {
      store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-with-lead'
      })
    }

    function openWindow03(): void {
      store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-blank'
      })
    }

    return {
      openWindow01,
      openWindow02,
      openWindow03
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
