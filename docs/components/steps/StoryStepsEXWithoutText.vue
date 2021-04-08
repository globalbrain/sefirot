<template lang="md">
<StoryBase title="Steps without text">
  <SSteps :steps="steps" />
</StoryBase>

```vue
<template>
  <SSteps :steps="steps" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SSteps from '@globalbrain/sefirot/lib/components/SSteps.vue'

export default defineComponent({
  components: {
    SSteps
  },

  setup() {
    const steps = [
      { status: 'done' },
      { status: 'done' },
      { status: 'active' },
      { status: 'upcoming' },
      { status: 'upcoming' }
    ]

    return {
      steps
    }
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SSteps from '@@/lib/components/SSteps.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SSteps,
    StoryBase
  },

  setup() {
    const steps = [
      { status: 'done' },
      { status: 'done' },
      { status: 'active' },
      { status: 'upcoming' },
      { status: 'upcoming' }
    ]

    return {
      steps
    }
  }
})
</script>
