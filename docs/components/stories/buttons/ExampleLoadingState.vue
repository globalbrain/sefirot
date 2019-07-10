<template lang="md">
<StoryBase title="Loading State">
  <div class="list">
    <div class="item">
      <SButton label="START LOAD" :loading="load01" @click="load('load01')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="secondary" :loading="load02" @click="load('load02')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="text" :loading="load03" @click="load('load03')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="mute" :loading="load04" @click="load('load04')" />
    </div>
  </div>
</StoryBase>

```html
<template>
  <SButton label="START LOAD" :loading="load01" @click="load('load01')" />
  <SButton label="START LOAD" type="secondary" :loading="load02" @click="load('load02')" />
  <SButton label="START LOAD" type="text" :loading="load03" @click="load('load03')" />
  <SButton label="START LOAD" type="mute" :loading="load04" @click="load('load04')" />
</template>

<script>
import SButton from '@globalbrains/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  },

  data () {
    return {
      load01: false,
      load02: false,
      load03: false,
      load04: false
    }
  },

  methods: {
    load (target) {
      this[target] = true

      setTimeout(() => { this[target] = false }, 5000)
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
      load01: false,
      load02: false,
      load03: false,
      load04: false
    }
  },

  methods: {
    load (target) {
      this[target] = true

      setTimeout(() => { this[target] = false }, 5000)
    }
  }
}
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
