<template lang="md">
<StoryBase>
  <ul class="list">
    <li class="item"><SButton label="NORMAL" @click="openSnackbar01" /></li>
    <li class="item"><SButton label="WITH ACTION" @click="openSnackbar02" /></li>
  </ul>
</StoryBase>

```html
<template>
  <SButton label="NORMAL" @click="openSnackbar01" />
  <SButton label="WITH ACTION" @click="openSnackbar02" />
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
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
