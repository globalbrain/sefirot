It's very simple button component with various options.

```html
<template>
  <SButton label="BUTTON" @click="submit" />
</template>

<script>
import SButton from '@globalbrains/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  },

  methods: {
    submit () {
      // ...
    }
  }
}
</script>
```
