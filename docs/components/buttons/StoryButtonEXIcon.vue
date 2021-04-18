<template lang="md">
<StoryBase title="With Icon">
  <div class="list">
    <div class="item">
      <SButton :icon="SIconImage" />
    </div>
    <div class="item">
      <SButton label="SEARCH" :icon="SIconSearch" />
    </div>
    <div class="item">
      <SButton label="CHECK" type="secondary" :icon="SIconCheckCircle" />
    </div>
    <div class="item">
      <SButton label="BACK" type="tertiary" :icon="SIconArrowLeft" />
    </div>
    <div class="item">
      <SButton label="EDIT" type="text" :icon="SIconEdit" />
    </div>
    <div class="item">
      <SButton label="TRASH" type="mute" :icon="SIconTrash" />
    </div>
  </div>
</StoryBase>

```vue
<template>
  <div class="list">
    <div class="item">
      <SButton :icon="SIconImage" />
    </div>
    <div class="item">
      <SButton label="SEARCH" :icon="SIconSearch" />
    </div>
    <div class="item">
      <SButton label="CHECK" type="secondary" :icon="SIconCheckCircle" />
    </div>
    <div class="item">
      <SButton label="BACK" type="tertiary" :icon="SIconArrowLeft" />
    </div>
    <div class="item">
      <SButton label="EDIT" type="text" :icon="SIconEdit" />
    </div>
    <div class="item">
      <SButton label="TRASH" type="mute" :icon="SIconTrash" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SIconImage from '@globalbrain/sefirot/components/icons/SIconImage.vue'
import SIconSearch from '@globalbrain/sefirot/components/icons/SIconSearch.vue'
import SIconCheckCircle from '@globalbrain/sefirot/components/icons/SIconCheckCircle.vue'
import SIconArrowLeft from '@globalbrain/sefirot/components/icons/SIconArrowLeft.vue'
import SIconEdit from '@globalbrain/sefirot/components/icons/SIconEdit.vue'
import SIconTrash from '@globalbrain/sefirot/components/icons/SIconTrash.vue'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    return {
      SIconImage,
      SIconSearch,
      SIconCheckCircle,
      SIconArrowLeft,
      SIconEdit,
      SIconTrash
    }
  }
})
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
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SIconImage from '@@/lib/components/icons/SIconImage.vue'
import SIconSearch from '@@/lib/components/icons/SIconSearch.vue'
import SIconCheckCircle from '@@/lib/components/icons/SIconCheckCircle.vue'
import SIconArrowLeft from '@@/lib/components/icons/SIconArrowLeft.vue'
import SIconEdit from '@@/lib/components/icons/SIconEdit.vue'
import SIconTrash from '@@/lib/components/icons/SIconTrash.vue'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  },

  setup() {
    return {
      SIconImage,
      SIconSearch,
      SIconCheckCircle,
      SIconArrowLeft,
      SIconEdit,
      SIconTrash
    }
  }
})
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
