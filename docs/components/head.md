<script setup lang="ts">
import SHead from 'sefirot/components/SHead.vue'
import SHeadLead from 'sefirot/components/SHeadLead.vue'
import SHeadTitle from 'sefirot/components/SHeadTitle.vue'
</script>

# SHead

`<SHead>` denotes the title and start of a given section.

<Showcase
  path="/components/SHead.vue"
  story="/stories-components-shead-01-playground-story-vue"
>
  <SHead>
    <SHeadTitle>The head title</SHeadTitle>
    <SHeadLead>Lorem ipsum dolor sit, amet consectetur.</SHeadLead>
  </SHead>
</Showcase>

## Usage

`<SHead>` has 2 child components: `<SHeadTitle>` and `<SHeadLead>`. `<SHeadTitle>` is used to display the title text, and `<SHeadLead>` is used to display the lead text below the title.

```vue
<script setup lang="ts">
import SHead from '@globalbrain/sefirot/lib/components/SHead.vue'
import SHeadLead from '@globalbrain/sefirot/lib/components/SHeadLead.vue'
import SHeadTitle from '@globalbrain/sefirot/lib/components/SHeadTitle.vue'
</script>

<template>
  <SHead>
    <SHeadTitle>The head title</SHeadTitle>
    <SHeadLead>Lorem ipsum dolor sit, amet consectetur.</SHeadLead>
  </SHead>
</template>
```

Note that the `<SHeadLead>` component also styles `<a>` elements when it is passed so there is no need to style links manually.
