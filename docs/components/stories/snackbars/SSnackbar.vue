<template>
  <StoryBase
    class="StorySSnackbar"
    name="SSnackbar"
  >
    <template #component>
      <section>
        <h3>Normal Snackbar</h3>

        <SButton label="SHOW SNACKBAR" @click="openSnackbar01" />
      </section>

      <section>
        <h3>Snackbar with Actions</h3>

        <SButton label="SHOW SNACKBAR" @click="openSnackbar02" />
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
    openSnackbar01 () {
      this.$store.dispatch('snackbars/push', {
        text: 'This is the snackbar message.'
      })
    },

    openSnackbar02 () {
      this.$store.dispatch('snackbars/push', {
        text: 'This is the snackbar message with actions.',
        actions: [
          { type: 'mute', label: 'MUTE ACTION', callback: () => {} },
          { label: 'ACTION', callback: () => {} }
        ]
      })
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
