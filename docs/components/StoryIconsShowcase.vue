<template lang="md">
<StoryBase>
  <ul class="flex flex-wrap -m-4">
    <li v-for="icon in icons" :key="icon.name" class="item relative">
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
import { defineComponent } from '@nuxtjs/composition-api'
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
import SIconClock from '@@/lib/components/icons/SIconClock.vue'
import SIconDownload from '@@/lib/components/icons/SIconDownload.vue'
import SIconDownloadCloud from '@@/lib/components/icons/SIconDownloadCloud.vue'
import SIconEdit from '@@/lib/components/icons/SIconEdit.vue'
import SIconEye from '@@/lib/components/icons/SIconEye.vue'
import SIconGlobe from '@@/lib/components/icons/SIconGlobe.vue'
import SIconInfo from '@@/lib/components/icons/SIconInfo.vue'
import SIconMapPin from '@@/lib/components/icons/SIconMapPin.vue'
import SIconPlus from '@@/lib/components/icons/SIconPlus.vue'
import SIconSave from '@@/lib/components/icons/SIconSave.vue'
import SIconShare2 from '@@/lib/components/icons/SIconShare2.vue'
import SIconUser from '@@/lib/components/icons/SIconUser.vue'
import SIconUsers from '@@/lib/components/icons/SIconUsers.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
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
      { component: SIconClock, name: 'Clock' },
      { component: SIconDownload, name: 'Download' },
      { component: SIconDownloadCloud, name: 'DownloadCloud' },
      { component: SIconEdit, name: 'Edit' },
      { component: SIconEye, name: 'Eye' },
      { component: SIconGlobe, name: 'Globe' },
      { component: SIconInfo, name: 'Info' },
      { component: SIconMapPin, name: 'MapPin' },
      { component: SIconPlus, name: 'Plus' },
      { component: SIconSave, name: 'Save' },
      { component: SIconShare2, name: 'Share2' },
      { component: SIconUser, name: 'User' },
      { component: SIconUsers, name: 'Users' }
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

.item {
  padding: 4px;
  width: 50%;

  @media (min-width: 375px) {
    width: calc(100% / 3);
  }

  @media (min-width: 512px) {
    width: calc(100% / 4);
  }

  @media (min-width: 768px) {
    width: calc(100% / 5);
  }
}

.item + .item {
  padding-top: 4px;
}
</style>
