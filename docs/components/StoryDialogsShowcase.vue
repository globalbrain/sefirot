<template lang="md">
<StoryBase>
  <div class="list">
    <div class="item"><SButton label="CONFIRM" @click="openDialog01" /></div>
    <div class="item"><SButton label="LOADING" @click="openDialog02" /></div>
    <div class="item"><SButton label="LOADING MESSAGE" @click="openDialog03" /></div>
  </div>
</StoryBase>

```vue
<template>
  <div class="list">
    <div class="item"><SButton label="CONFIRM" @click="openDialog01" /></div>
    <div class="item"><SButton label="LOADING" @click="openDialog02" /></div>
    <div class="item"><SButton label="LOADING MESSAGE" @click="openDialog03" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useStore } from '@globalbrain/sefirot/lib/composables/Store'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const store = useStore()

    function openDialog01(): void {
      store.dispatch('dialog/open', {
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { label: 'CLOSE', callback: close }
        ]
      })
    }

    function openDialog02(): void {
      store.dispatch('dialog/open', {
        type: 'loading'
      })

      setTimeout(close, 3000)
    }

    function openDialog03(): void {
      store.dispatch('dialog/open', {
        type: 'loading',
        title: 'The dialog title.',
        text: 'This is the dialog message. The dialog will close after 3 sec for this demo.'
      })

      setTimeout(close, 3000)
    }

    function close(): void {
      store.dispatch('modal/close')
    }

    return {
      openDialog01,
      openDialog02,
      openDialog03
    }
  }
})
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
}

.item {
  padding: 4px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useStore } from '@@/lib/composables/Store'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  },

  setup() {
    const store = useStore()

    function openDialog01(): void {
      store.dispatch('dialog/open', {
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { label: 'CLOSE', callback: close }
        ]
      })
    }

    function openDialog02(): void {
      store.dispatch('dialog/open', {
        type: 'loading'
      })

      setTimeout(close, 3000)
    }

    function openDialog03(): void {
      store.dispatch('dialog/open', {
        type: 'loading',
        title: 'The dialog title.',
        text: 'This is the dialog message. The dialog will close after 3 sec for this demo.'
      })

      setTimeout(close, 3000)
    }

    function close(): void {
      store.dispatch('modal/close')
    }

    return {
      openDialog01,
      openDialog02,
      openDialog03
    }
  }
})
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
}

.item {
  padding: 4px;
}
</style>
