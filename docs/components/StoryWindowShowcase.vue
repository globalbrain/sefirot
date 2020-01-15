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

```html
<template>
  <SButton class="button" label="BASIC WINDOW" @click="openWindow01" />
  <SButton class="button" label="WITH LEAD TEXT" @click="openWindow02" />
  <SButton class="button" label="BLANK WINDOW" @click="openWindow03" />
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/SButton'

export default {
  components: {
    SButton
  },

  methods: {
    openWindow01 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal'
      })
    },

    openWindow02 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-with-lead'
      })
    },

    openWindow03 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-blank'
      })
    }
  }
}
</script>
```
</template>

<script>
import SButton from '@@/lib/components/SButton'
import StoryBase from '@/components/StoryBase'
import WindowMinimalBasic from './WindowMinimalBasic'
import WindowMinimalWithLead from './WindowMinimalWithLead'
import WindowMinimalBlank from './WindowMinimalBlank'

export default {
  components: {
    SButton,
    StoryBase,
    WindowMinimalBasic,
    WindowMinimalWithLead,
    WindowMinimalBlank
  },

  methods: {
    openWindow01 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal'
      })
    },

    openWindow02 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-with-lead'
      })
    },

    openWindow03 () {
      this.$store.dispatch('window/open', {
        name: 'story-modals-s-window-minimal-blank'
      })
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
