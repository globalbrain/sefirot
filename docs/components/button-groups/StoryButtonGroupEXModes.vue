<template lang="md">
<StoryBase>
  <div class="group">
    <SButtonGroup
      :buttons="neutrals"
      v-model="neutral"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="infos"
      v-model="info"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="successes"
      v-model="success"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="warnings"
      v-model="warning"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="dangers"
      v-model="danger"
    />
  </div>
</StoryBase>

```vue
<template>
  <div class="group">
    <SButtonGroup
      :buttons="neutrals"
      v-model="neutral"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="infos"
      v-model="info"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="successes"
      v-model="success"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="warnings"
      v-model="warning"
    />
  </div>
  <div class="group">
    <SButtonGroup
      :buttons="dangers"
      v-model="danger"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@nuxtjs/composition-api'
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

    const neutrals = computed(() => [
      { label: 'Neutral A', value: 'neutralA', mode: 'neutral' },
      { label: 'Neutral B', value: 'neutralB', mode: 'neutral' },
      { label: 'Neutral C', value: 'neutralC', mode: 'neutral' }
    ])

    const infos = computed(() => [
      { label: 'Info A', value: 'infoA', mode: 'info' },
      { label: 'Info B', value: 'infoB', mode: 'info' },
      { label: 'Info C', value: 'infoC', mode: 'info' }
    ])

    const successes = computed(() => [
      { label: 'Success A', value: 'successA', mode: 'success' },
      { label: 'Success B', value: 'successB', mode: 'success' },
      { label: 'Success C', value: 'successC', mode: 'success' }
    ])

    const warnings = computed(() => [
      { label: 'Warning A', value: 'warningA', mode: 'warning' },
      { label: 'Warning B', value: 'warningB', mode: 'warning' },
      { label: 'Warning C', value: 'warningC', mode: 'warning' }
    ])

    const dangers = computed(() => [
      { label: 'Danger A', value: 'dangerA', mode: 'danger' },
      { label: 'Danger B', value: 'dangerB', mode: 'danger' },
      { label: 'Danger C', value: 'dangerC', mode: 'danger' }
    ])

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
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import SButtonGroup from '@@/lib/components/SButtonGroup.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButtonGroup,
    StoryBase
  },

  setup() {
    const neutral = ref(null)
    const info = ref(null)
    const success = ref(null)
    const warning = ref(null)
    const danger = ref(null)

    const neutrals = computed(() => [
      { label: "Neutral A", value: 'neutralA', mode: 'neutral' },
      { label: "Neutral B", value: 'neutralB', mode: 'neutral' },
      { label: "Neutral C", value: 'neutralC', mode: 'neutral' }
    ])

    const infos = computed(() => [
      { label: "Info A", value: 'infoA', mode: 'info' },
      { label: "Info B", value: 'infoB', mode: 'info' },
      { label: "Info C", value: 'infoC', mode: 'info' }
    ])

    const successes = computed(() => [
      { label: "Success A", value: 'successA', mode: 'success' },
      { label: "Success B", value: 'successB', mode: 'success' },
      { label: "Success C", value: 'successC', mode: 'success' }
    ])

    const warnings = computed(() => [
      { label: "Warning A", value: 'warningA', mode: 'warning' },
      { label: "Warning B", value: 'warningB', mode: 'warning' },
      { label: "Warning C", value: 'warningC', mode: 'warning' }
    ])

    const dangers = computed(() => [
      { label: "Danger A", value: 'dangerA', mode: 'danger' },
      { label: "Danger B", value: 'dangerB', mode: 'danger' },
      { label: "Danger C", value: 'dangerC', mode: 'danger' }
    ])

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
  },
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
