<template lang="md">
<StoryBase>
  <div class="actions">
    <SButton class="button" label="OPEN SCREEN" @click="openScreen" />
  </div>

  <ScreenMinimal />
</StoryBase>

```html
<template>
  <SButton class="button" label="OPEN SCREEN" @click="openScreen" />
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  },

  methods: {
    openScreen () {
      this.$store.dispatch('screen/open', {
        name: 'story-screens-s-screen-minimal'
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
import ScreenMinimal from './ScreenMinimal'

export default {
  components: {
    SButton,
    StoryBase,
    ScreenMinimal
  },

  methods: {
    openScreen () {
      this.$store.dispatch('screen/open', {
        name: 'story-screens-s-screen-minimal'
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
