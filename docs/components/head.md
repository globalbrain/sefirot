<script setup lang="ts">
import SHead from 'sefirot/components/SHead.vue'
import SHeadLead from 'sefirot/components/SHeadLead.vue'
import SHeadTitle from 'sefirot/components/SHeadTitle.vue'
</script>

# SHead

`<SHead>` denotes the title and start of a given section.

<Showcase
  path="/components/SHead.vue"
  story="head-01-playground"
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

You may also define `:mode` on `<SHeadTitle>` to change the title's appearance. The default mode is `neutral`.

```ts
interface Props {
  mode?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
}
```

```vue-html
<SHead>
  <SHeadTitle mode="danger">Dangerous title</SHeadTitle>
  <SHeadLead>Lorem ipsum dolor sit, amet consectetur.</SHeadLead>
</SHead>
```

Also, note that the `<SHeadLead>` component also styles `<a>` elements when it is passed so there is no need to style links manually.
