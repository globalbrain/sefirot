<template lang="md">
<StoryBase>
  <div class="list">
    <div class="item"><SButton label="CONFIRM" @click="openDialog01" /></div>
    <div class="item"><SButton label="LOADING" @click="openDialog02" /></div>
    <div class="item"><SButton label="LOADING MESSAGE" @click="openDialog03" /></div>
    <div class="item"><SButton label="PROGRESS" @click="openDialog04" /></div>
  </div>
</StoryBase>

```html
<template>
  <div class="list">
    <div class="item"><SButton label="CONFIRM" @click="openDialog01" /></div>
    <div class="item"><SButton label="LOADING" @click="openDialog02" /></div>
    <div class="item"><SButton label="LOADING MESSAGE" @click="openDialog03" /></div>
    <div class="item"><SButton label="PROGRESS" @click="openDialog04" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useStore } from '@globalbrain/sefirot/lib/composables/Store'
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const store = useStore()

    let interval: any = null

    function openDialog01() {
      store.dispatch('dialog/open', {
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { label: 'CLOSE', callback: close }
        ]
      })
    }

    function openDialog02() {
      store.dispatch('dialog/open', {
        type: 'loading'
      })

      setTimeout(close, 3000)
    }

    function openDialog03() {
      store.dispatch('dialog/open', {
        type: 'loading',
        title: 'The dialog title.',
        text: 'This is the dialog message. The dialog will be closed after 3 sec for this demo.'
      })

      setTimeout(close, 3000)
    }

    function openDialog04() {
      let now = 0

      store.dispatch('dialog/open', {
        type: 'progress',
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        progress: { now, max: 100 }
      })

      interval = setInterval(() => {
        now = now + 2.125

        if (now < 100) {
          store.dispatch('dialog/update', {
            progress: { now, max: 100 }
          })

          return
        }

        clearInterval(interval)
        close()
      }, 250)
    }

    function close() {
      store.dispatch('modal/close')
    }

    return {
      openDialog01,
      openDialog02,
      openDialog03,
      openDialog04
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

  setup () {
    const store = useStore()

    let interval: any = null

    function openDialog01 () {
      store.dispatch('dialog/open', {
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { label: 'CLOSE', callback: close }
        ]
      })
    }

    function openDialog02 () {
      store.dispatch('dialog/open', {
        type: 'loading'
      })

      setTimeout(close, 3000)
    }

    function openDialog03 () {
      store.dispatch('dialog/open', {
        type: 'loading',
        title: 'The dialog title.',
        text: 'This is the dialog message. The dialog will be closed after 3 sec for this demo.'
      })

      setTimeout(close, 3000)
    }

    function openDialog04 () {
      let now = 0

      store.dispatch('dialog/open', {
        type: 'progress',
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        progress: { now, max: 100 }
      })

      interval = setInterval(() => {
        now = now + 2.125

        if (now < 100) {
          store.dispatch('dialog/update', {
            progress: { now, max: 100 }
          })

          return
        }

        clearInterval(interval)
        close()
      }, 250)
    }

    function close () {
      store.dispatch('modal/close')
    }

    return {
      openDialog01,
      openDialog02,
      openDialog03,
      openDialog04
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
