<template lang="md">
<StoryBase title="Loading State">
  <div class="list">
    <div class="item">
      <SButton label="START LOAD" :loading="state.load1" @click="load('load1')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="secondary" :loading="state.load2" @click="load('load2')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="tertiary" :loading="state.load3" @click="load('load3')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="text" :loading="state.load4" @click="load('load4')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="mute" :loading="state.load5" @click="load('load5')" />
    </div>
  </div>
</StoryBase>

```html
<template>
  <div class="list">
    <div class="item">
      <SButton label="START LOAD" :loading="state.load1" @click="load('load1')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="secondary" :loading="state.load2" @click="load('load2')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="tertiary" :loading="state.load3" @click="load('load3')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="text" :loading="state.load4" @click="load('load4')" />
    </div>
    <div class="item">
      <SButton label="START LOAD" type="mute" :loading="state.load5" @click="load('load5')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const state = reactive({
      load1: false,
      load2: false,
      load3: false,
      load4: false,
      load5: false
    })

    function load(target: keyof typeof state): void {
      state[target] = true

      setTimeout(() => { state[target] = false }, 5000)
    }

    return {
      state,
      load
    }
  }
})
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
```
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  },

  setup() {
    const state = reactive({
      load1: false,
      load2: false,
      load3: false,
      load4: false,
      load5: false
    })

    function load(target: keyof typeof state): void {
      state[target] = true

      setTimeout(() => { state[target] = false }, 5000)
    }

    return {
      state,
      load
    }
  }
})
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
