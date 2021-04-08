<template lang="md">
<StoryBase>
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
      { status: 'done', text: 'Create account' },
      { status: 'done', text: 'Profile' },
      { status: 'active', text: 'Theme' },
      { status: 'upcoming', text: 'Preview' },
      { status: 'upcoming', text: 'Final check' }
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
import SSteps, { Step } from '@@/lib/components/SSteps.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SSteps,
    StoryBase
  },

  setup() {
    const steps = [
      { status: 'done', text: 'Create account' },
      { status: 'done', text: 'Profile' },
      { status: 'active', text: 'Theme' },
      { status: 'upcoming', text: 'Preview' },
      { status: 'upcoming', text: 'Final check' }
    ]

    return {
      steps
    }
  }
})
</script>
