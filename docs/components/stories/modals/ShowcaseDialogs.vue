<template lang="md">
<StoryBase>
  <div class="list">
    <div class="item"><SButton label="CONFIRM" @click="openDialog01" /></div>
    <div class="item"><SButton label="LOADING" @click="openDialog02" /></div>
    <div class="item"><SButton label="PROGRESS" @click="openDialog03" /></div>
  </div>
</StoryBase>

```html
<template>
  <SButton label="CONFIRM" @click="openDialog01" />
  <SButton label="LOADING" @click="openDialog02" />
  <SButton label="PROGRESS" @click="openDialog03" />
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  },

  data () {
    return {
      interval: null
    }
  },

  methods: {
    openDialog01 () {
      this.$store.dispatch('dialog/open', {
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { label: 'CLOSE DIALOG', callback: this.close }
        ]
      })
    },

    openDialog02 () {
      this.$store.dispatch('dialog/open', {
        type: 'loading',
        title: 'The dialog title.',
        text: 'This is the dialog message. The dialog will be closed after 5 sec for this demo.'
      })

      setTimeout(() => { this.close() }, 5000)
    },

    openDialog03 () {
      let now = 0

      this.$store.dispatch('dialog/open', {
        type: 'progress',
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        progress: { now, max: 100 }
      })

      this.interval = setInterval(() => {
        now = now + 2.125

        if (now < 100) {
          this.$store.dispatch('dialog/update', {
            progress: { now, max: 100 }
          })

          return
        }

        clearInterval(this.interval)

        this.close()
      }, 250)
    },

    close () {
      this.$store.dispatch('modal/close')
    }
  }
}
</script>
```
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SButton,
    StoryBase
  },

  data () {
    return {
      interval: null
    }
  },

  methods: {
    openDialog01 () {
      this.$store.dispatch('dialog/open', {
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { label: 'CLOSE DIALOG', callback: this.close }
        ]
      })
    },

    openDialog02 () {
      this.$store.dispatch('dialog/open', {
        type: 'loading',
        title: 'The dialog title.',
        text: 'This is the dialog message. The dialog will be closed after 5 sec for this demo.'
      })

      setTimeout(() => { this.close() }, 5000)
    },

    openDialog03 () {
      let now = 0

      this.$store.dispatch('dialog/open', {
        type: 'progress',
        title: 'The dialog title.',
        text: 'This is the dialog message.',
        progress: { now, max: 100 }
      })

      this.interval = setInterval(() => {
        now = now + 2.125

        if (now < 100) {
          this.$store.dispatch('dialog/update', {
            progress: { now, max: 100 }
          })

          return
        }

        clearInterval(this.interval)

        this.close()

        return
      }, 250)
    },

    close () {
      this.$store.dispatch('modal/close')
    }
  }
}
</script>

<style lang="postcss" scoped>
.list {
  display: flex;
  margin: 0 -8px;
}

.item {
  padding: 0 8px;
}
</style>
