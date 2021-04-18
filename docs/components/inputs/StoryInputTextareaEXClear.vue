<template lang="md">
<StoryBase title="Clear Mode">
  <SInputTextarea
    v-model="input"
    mode="clear"
    placeholder="Placeholder text"
    :rows="10"
  />
</StoryBase>

```html
<template>
  <SButton label="NEUTRAL" mode="neutral" />
  <SButton label="INFO" mode="info" />
  <SButton label="SUCCESS" mode="success" />
  <SButton label="WARNING" mode="warning" />
  <SButton label="DANGER" mode="danger" />
</template>

<script>
import SButton from '@globalbrains/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  }
}
</script>
```
</template>

<script>
import SInputTextarea from '@@/lib/components/SInputTextarea'
import StoryBase from '@/components/StoryBase'

export default {
  components: {
    SInputTextarea,
    StoryBase
  },

  data () {
    return {
      input: ''
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
