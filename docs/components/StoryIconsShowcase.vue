<template lang="md">
<StoryBase>
  <ul class="flex flex-wrap -m-4">
    <li v-for="icon in icons" :key="icon.name" class="item relative p-4 w-1/2 at375:w-1/3 at512:w-1/4 md:w-1/5">
      <div class="bg-white-mute flex flex-col justify-center items-center rounded-4 pt-32 pb-16">
        <component :is="icon.component" class="w-20 h-20 text-light-1 fill-current" />
        <p class="name pt-32 leading-20 text-12 text-light-2">{{ icon.name }}</p>
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
import SIconDownload from '@@/lib/components/icons/SIconDownload.vue'
import SIconDownloadCloud from '@@/lib/components/icons/SIconDownloadCloud.vue'
import SIconEdit from '@@/lib/components/icons/SIconEdit.vue'
import SIconEye from '@@/lib/components/icons/SIconEye.vue'
import SIconSave from '@@/lib/components/icons/SIconSave.vue'
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
      { component: SIconDownload, name: 'Download' },
      { component: SIconDownloadCloud, name: 'DownloadCloud' },
      { component: SIconEdit, name: 'Edit' },
      { component: SIconEye, name: 'Eye' },
      { component: SIconSave, name: 'Save' }
    ]

    return {
      icons
    }
  }
})
</script>

<style lang="postcss" scoped>
.name {
  margin-bottom: 0;
  font-weight: 500;
}

.item + .item {
  padding-top: 4px;
}
</style>
