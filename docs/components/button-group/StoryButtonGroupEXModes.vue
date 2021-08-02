<template lang="md">
<StoryBase>
  <div>
    <div class="group">
      <SButtonGroup v-model="neutral" :items="neutrals" />
    </div>
    <div class="group">
      <SButtonGroup v-model="info" :items="infos" />
    </div>
    <div class="group">
      <SButtonGroup v-model="success" :items="successes" />
    </div>
    <div class="group">
      <SButtonGroup v-model="warning" :items="warnings" />
    </div>
    <div class="group">
      <SButtonGroup v-model="danger" :items="dangers" />
    </div>
  </div>
</StoryBase>

```vue
<template>
  <div>
    <div class="group">
      <SButtonGroup v-model="neutral" :items="neutrals" />
    </div>
    <div class="group">
      <SButtonGroup v-model="info" :items="infos" />
    </div>
    <div class="group">
      <SButtonGroup v-model="success" :items="successes" />
    </div>
    <div class="group">
      <SButtonGroup v-model="warning" :items="warnings" />
    </div>
    <div class="group">
      <SButtonGroup v-model="danger" :items="dangers" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SButtonGroup from '@globalbrain/sefirot/lib/components/SButtonGroup.vue'

export default defineComponent({
  components: {
    SButtonGroup
  },

  setup() {
    const neutral = ref(null)
    const info = ref(null)
    const success = ref(null)
    const warning = ref(null)
    const danger = ref(null)

    const neutrals = [
      { label: 'Neutral A', value: 'neutralA', mode: 'neutral' },
      { label: 'Neutral B', value: 'neutralB', mode: 'neutral' },
      { label: 'Neutral C', value: 'neutralC', mode: 'neutral' }
    ]

    const infos = [
      { label: 'Info A', value: 'infoA', mode: 'info' },
      { label: 'Info B', value: 'infoB', mode: 'info' },
      { label: 'Info C', value: 'infoC', mode: 'info' }
    ]

    const successes = [
      { label: 'Success A', value: 'successA', mode: 'success' },
      { label: 'Success B', value: 'successB', mode: 'success' },
      { label: 'Success C', value: 'successC', mode: 'success' }
    ]

    const warnings = [
      { label: 'Warning A', value: 'warning-a', mode: 'warning' },
      { label: 'Warning B', value: 'warning-b', mode: 'warning' },
      { label: 'Warning C', value: 'warning-c', mode: 'warning' }
    ]

    const dangers = [
      { label: 'Danger A', value: 'danger-a', mode: 'danger' },
      { label: 'Danger B', value: 'danger-b', mode: 'danger' },
      { label: 'Danger C', value: 'danger-c', mode: 'danger' }
    ]

    return {
      neutral,
      info,
      success,
      warning,
      danger,
      neutrals,
      infos,
      successes,
      warnings,
      dangers
    }
  }
})
</script>

<style lang="postcss" scoped>
.group {
  max-width: 320px;

  &:not(:first-child) {
    margin-top: 16px;
  }
}
</style>
```
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SButtonGroup from '@@/lib/components/SButtonGroup.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButtonGroup,
    StoryBase
  },

  setup() {
    const neutral = ref('neutral-a')
    const info = ref('info-a')
    const success = ref('success-a')
    const warning = ref('warning-a')
    const danger = ref('danger-a')

    const neutrals = [
      { label: 'Neutral A', value: 'neutral-a', mode: 'neutral' },
      { label: 'Neutral B', value: 'neutral-b', mode: 'neutral' },
      { label: 'Neutral C', value: 'neutral-c', mode: 'neutral' }
    ]

    const infos = [
      { label: 'Info A', value: 'info-a', mode: 'info' },
      { label: 'Info B', value: 'info-b', mode: 'info' },
      { label: 'Info C', value: 'info-c', mode: 'info' }
    ]

    const successes = [
      { label: 'Success A', value: 'success-a', mode: 'success' },
      { label: 'Success B', value: 'success-b', mode: 'success' },
      { label: 'Success C', value: 'success-c', mode: 'success' }
    ]

    const warnings = [
      { label: 'Warning A', value: 'warning-a', mode: 'warning' },
      { label: 'Warning B', value: 'warning-b', mode: 'warning' },
      { label: 'Warning C', value: 'warning-c', mode: 'warning' }
    ]

    const dangers = [
      { label: 'Danger A', value: 'danger-a', mode: 'danger' },
      { label: 'Danger B', value: 'danger-b', mode: 'danger' },
      { label: 'Danger C', value: 'danger-c', mode: 'danger' }
    ]

    return {
      neutral,
      info,
      success,
      warning,
      danger,
      neutrals,
      infos,
      successes,
      warnings,
      dangers
    }
  }
})
</script>

<style lang="postcss" scoped>
.group {
  max-width: 320px;

  &:not(:first-child) {
    margin-top: 16px;
  }
}
</style>
