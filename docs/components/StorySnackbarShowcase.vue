<template lang="md">
<StoryBase>
  <div class="list">
    <div class="item">
      <SButton label="NORMAL" @click="openNormalSnackbar" />
    </div>
    <div class="item">
      <SButton label="WITH ACTIONS" @click="openWithActions" />
    </div>
  </div>
</StoryBase>

```html
<template>
  <div class="list">
    <div class="item">
      <SButton label="NORMAL" @click="openNormalSnackbar" />
    </div>
    <div class="item">
      <SButton label="WITH ACTIONS" @click="openWithActions" />
    </div>
  </div>
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

    function openNormalSnackbar(): void {
      store.dispatch('snackbars/push', {
        text: 'This is the snackbar message.'
      })
    }

    function openWithActions(): void {
      store.dispatch('snackbars/push', {
        text: 'This is the snackbar message with actions.',
        actions: [
          { type: 'mute', label: 'MUTE ACTION', callback: () => {} },
          { type: 'text', label: 'ACTION', callback: () => {} }
        ]
      })
    }

    return {
      openNormalSnackbar,
      openWithActions
    }
  }
})
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryBase from '@/components/StoryBase.vue'
import SButton from '@@/lib/components/SButton.vue'
import { useStore } from '@@/lib/composables/Store'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  },

  setup() {
    const store = useStore()

    function openNormalSnackbar(): void {
      store.dispatch('snackbars/push', {
        text: 'This is the snackbar message.'
      })
    }

    function openWithActions(): void {
      store.dispatch('snackbars/push', {
        text: 'This is the snackbar message with actions.',
        actions: [
          { type: 'mute', label: 'MUTE ACTION', callback: () => {} },
          { type: 'text', label: 'ACTION', callback: () => {} }
        ]
      })
    }

    return {
      openNormalSnackbar,
      openWithActions
    }
  }
})
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
}
</style>
