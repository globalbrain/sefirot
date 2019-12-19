<template lang="md">
<StoryBase>
  <ul class="list">
    <li v-for="icon in icons" class="item" :key="icon.name">
      <div class="box">
        <component :is="icon.component" class="icon" />
        <p class="name">{{ icon.name }}</p>
      </div>
    </li>
  </ul>
</StoryBase>

```html
All icons by Feather.
```
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SIconArrowDown from '@@/lib/components/icons/SIconArrowDown.vue'
import SIconArrowLeft from '@@/lib/components/icons/SIconArrowLeft.vue'
import SIconArrowRight from '@@/lib/components/icons/SIconArrowRight.vue'
import SIconArrowUp from '@@/lib/components/icons/SIconArrowUp.vue'
import SIconCalendar from '@@/lib/components/icons/SIconCalendar.vue'
import SIconCheck from '@@/lib/components/icons/SIconCheck.vue'
import SIconCheckCircle from '@@/lib/components/icons/SIconCheckCircle.vue'
import SIconChevronDown from '@@/lib/components/icons/SIconChevronDown.vue'
import SIconChevronLeft from '@@/lib/components/icons/SIconChevronLeft.vue'
import SIconChevronRight from '@@/lib/components/icons/SIconChevronRight.vue'
import SIconChevronUp from '@@/lib/components/icons/SIconChevronUp.vue'
import SIconEdit from '@@/lib/components/icons/SIconEdit.vue'
import SIconEye from '@@/lib/components/icons/SIconEye.vue'
import StoryBase from '@/components/StoryBase.vue'

export default createComponent({
  components: {
    StoryBase
  },

  setup () {
    const icons = [
      { component: SIconArrowDown, name: 'ArrowDown' },
      { component: SIconArrowLeft, name: 'ArrowLeft' },
      { component: SIconArrowRight, name: 'ArrowRight' },
      { component: SIconArrowUp, name: 'ArrowUp' },
      { component: SIconCalendar, name: 'Calendar' },
      { component: SIconCheck, name: 'Check' },
      { component: SIconCheckCircle, name: 'CheckCircle' },
      { component: SIconChevronDown, name: 'ChevronDown' },
      { component: SIconChevronLeft, name: 'ChevronLeft' },
      { component: SIconChevronRight, name: 'ChevronRight' },
      { component: SIconChevronUp, name: 'ChevronUp' },
      { component: SIconEdit, name: 'Edit' },
      { component: SIconEye, name: 'Eye' }
    ]

    return {
      icons
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.list {
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
}

.item {
  position: relative;
  padding: 4px;
  width: 50%;

  @media (min-width: 375px) {
    width: calc(100% / 3);
  }

  @media (min-width: 512px) {
    width: 25%;
  }

  @media (min-width: 768px) {
    width: 20%;
  }
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 32px 0 16px;
  background-color: var(--c-white-mute);
}

.icon {
  width: 16px;
  height: 16px;
  fill: var(--c-text-light-1);
}

.name {
  margin-bottom: 0;
  padding-top: 32px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-light-2);
}
</style>
