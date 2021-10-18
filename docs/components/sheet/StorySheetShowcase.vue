<template lang="md">
<StoryBase>
  <SButton label="OPEN SHEET" @click="open" />
</StoryBase>

```vue
<!-- Main file -->
<template>
  <SButton label="OPEN SHEET" @click="open" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useModal } from '@globalbrain/sefirot/lib/composables/Modal'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import FixtureShowcase from './FixtureShowcase.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const sheet = useModal(FixtureShowcase)

    function open() {
      sheet.open()
    }

    return {
      open
    }
  }
})
</script>

<!-- FixtureShowcase.vue -->
<template>
  <SSheet #default="{ close }">
    <SSheetHeader>
      <SSheetHeaderTitle>
        Sheet title
      </SSheetHeaderTitle>
    </SSheetHeader>

    <SSheetMedium>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.</p>

      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </SSheetMedium>

    <SSheetFooter>
      <SSheetFooterActions>
        <SSheetFooterAction type="mute" label="CANCEL" @click="close" />
        <SSheetFooterAction type="primary" mode="info" label="CLOSE SHEET" @click="close" />
      </SSheetFooterActions>
    </SSheetFooter>
  </SSheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Sheet from '@globalbrain/sefirot/lib/mixins/Sheet'

export default defineComponent({
  mixins: [Sheet()]
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useModal } from '@@/lib/composables/Modal'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'
import FixtureShowcase from './fixtures/FixtureShowcase.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  },

  setup() {
    const sheet = useModal(FixtureShowcase)

    function open() {
      sheet.open()
    }

    return {
      open
    }
  }
})
</script>
