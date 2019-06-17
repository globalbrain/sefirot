<template>
  <StoryBase
    class="StorySAlert"
    name="SAlert"
  >
    <template #component>
      <section>
        <h3>Alerts</h3>

        <div class="actions">
          <SButton class="button" mode="neutral" label="INFO" @click="openAlert01" />
          <SButton class="button" mode="success" label="SUCCESS" @click="openAlert02" />
          <SButton class="button" mode="warning" label="WARNING" @click="openAlert03" />
          <SButton class="button" mode="danger" label="DANGER" @click="openAlert04" />
          <SButton class="button" mode="danger" label="ERROR" @click="openAlert05" />
        </div>
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

  methods: {
    openAlert01 () {
      this.$store.dispatch('alert/open', {
        title: 'The alert title.',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { label: 'CLOSE ALERT', callback: this.close }
        ]
      })
    },

    openAlert02 () {
      this.$store.dispatch('alert/open', {
        type: 'success',
        title: 'The alert title.',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { label: 'CLOSE ALERT', callback: this.close }
        ]
      })
    },

    openAlert03 () {
      this.$store.dispatch('alert/open', {
        type: 'warning',
        title: 'The alert title.',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { label: 'CLOSE ALERT', callback: this.close }
        ]
      })
    },

    openAlert04 () {
      this.$store.dispatch('alert/open', {
        type: 'danger',
        title: 'The alert title.',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { mode: 'danger', label: 'CLOSE ALERT', callback: this.close }
        ]
      })
    },

    openAlert05 () {
      this.$store.dispatch('alert/open', {
        type: 'error',
        title: 'The alert title.',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: this.close },
          { mode: 'danger', label: 'CLOSE ALERT', callback: this.close }
        ]
      })
    },

    close () {
      this.$store.dispatch('alert/close')
    }
  }
}
</script>

<style lang="postcss" scoped>
.actions {
  display: flex;
}

.button + .button {
  margin-left: 8px;
}
</style>
