<template lang="md">
# Steps

Steps show the progress of a flow with multiple steps.

<StoryStepsShowcase />

## Description

To use the Step component, all you need to do is pass an array of `Step` objects as props. The type for the `Step` object is as follows.

```ts
export interface Step {
  status: StepStatus
  text?: string
}

export type StepStatus = 'upcoming' | 'active' | 'done' | 'failed'
```

As you can see, you may omit `text`, which will display only the "points" of the steps.

<StoryStepsEXWithoutText />

## API

<SpecProps :props="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryStepsShowcase from '@/components/steps/StoryStepsShowcase.vue'
import StoryStepsEXWithoutText from '@/components/steps/StoryStepsEXWithoutText.vue'
import SpecProps from '@/components/SpecProps.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryStepsShowcase,
    StoryStepsEXWithoutText,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'steps',
          type: 'Step[]',
          required: true,
          default: '—',
          description: 'The steps to display. See [Description](#description) section for more details.'
        }
      ]
    })
  },

  head: {
    title: 'Steps'
  }
})
</script>
