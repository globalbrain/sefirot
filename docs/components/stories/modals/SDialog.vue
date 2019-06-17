<template>
  <StoryBase
    class="StorySDialog"
    name="SDialog"
  >
    <template #component>
      <section>
        <h3>Confirm Dialog</h3>

        <SButton label="SHOW DIALOG" @click="openDialog01" />
      </section>

      <section>
        <h3>Loading Dialog</h3>

        <SButton label="SHOW DIALOG" @click="openDialog02" />
      </section>

      <section>
        <h3>Progress Dialog</h3>

        <SButton label="SHOW DIALOG" @click="openDialog03" />
      </section>
    </template>
  </StoryBase>
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
