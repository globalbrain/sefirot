<template lang="md">
<StoryBase title="Icons">
  <ul class="flex flex-wrap -m-4">
    <li v-for="icon in icons" :key="icon.name" class="item relative">
      <div class="bg-white-mute flex flex-col justify-center items-center rounded-4 pt-32 pb-16">
        <component :is="icon.component" class="w-20 h-20 text-light-1 fill-current" />
        <p class="name pt-32 leading-20 text-12 text-light-2">{{ icon.name }}</p>
      </div>
    </li>
  </ul>
</StoryBase>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SIconActivity from '@@/lib/components/icons/SIconActivity.vue'
import SIconArrowDown from '@@/lib/components/icons/SIconArrowDown.vue'
import SIconArrowLeft from '@@/lib/components/icons/SIconArrowLeft.vue'
import SIconArrowRight from '@@/lib/components/icons/SIconArrowRight.vue'
import SIconArrowUp from '@@/lib/components/icons/SIconArrowUp.vue'
import SIconBarChart from '@@/lib/components/icons/SIconBarChart.vue'
import SIconBriefcase from '@@/lib/components/icons/SIconBriefcase.vue'
import SIconBuilding from '@@/lib/components/icons/SIconBuilding.vue'
import SIconCalendar from '@@/lib/components/icons/SIconCalendar.vue'
import SIconCheck from '@@/lib/components/icons/SIconCheck.vue'
import SIconCheckCircle from '@@/lib/components/icons/SIconCheckCircle.vue'
import SIconCheckSquare from '@@/lib/components/icons/SIconCheckSquare.vue'
import SIconChevronDown from '@@/lib/components/icons/SIconChevronDown.vue'
import SIconChevronLeft from '@@/lib/components/icons/SIconChevronLeft.vue'
import SIconChevronRight from '@@/lib/components/icons/SIconChevronRight.vue'
import SIconChevronUp from '@@/lib/components/icons/SIconChevronUp.vue'
import SIconClock from '@@/lib/components/icons/SIconClock.vue'
import SIconCode from '@@/lib/components/icons/SIconCode.vue'
import SIconDatabase from '@@/lib/components/icons/SIconDatabase.vue'
import SIconDollarSign from '@@/lib/components/icons/SIconDollarSign.vue'
import SIconDownload from '@@/lib/components/icons/SIconDownload.vue'
import SIconDownloadCloud from '@@/lib/components/icons/SIconDownloadCloud.vue'
import SIconEdit from '@@/lib/components/icons/SIconEdit.vue'
import SIconEdit2 from '@@/lib/components/icons/SIconEdit2.vue'
import SIconEdit3 from '@@/lib/components/icons/SIconEdit3.vue'
import SIconEdit3Off from '@@/lib/components/icons/SIconEdit3Off.vue'
import SIconEye from '@@/lib/components/icons/SIconEye.vue'
import SIconExternalLink from '@@/lib/components/icons/SIconExternalLink.vue'
import SIconFile from '@@/lib/components/icons/SIconFile.vue'
import SIconFilePlus from '@@/lib/components/icons/SIconFilePlus.vue'
import SIconFileText from '@@/lib/components/icons/SIconFileText.vue'
import SIconFlag from '@@/lib/components/icons/SIconFlag.vue'
import SIconGrid from '@@/lib/components/icons/SIconGrid.vue'
import SIconGitBranch from '@@/lib/components/icons/SIconGitBranch.vue'
import SIconGitCommit from '@@/lib/components/icons/SIconGitCommit.vue'
import SIconGitPullRequest from '@@/lib/components/icons/SIconGitPullRequest.vue'
import SIconGlobe from '@@/lib/components/icons/SIconGlobe.vue'
import SIconHome from '@@/lib/components/icons/SIconHome.vue'
import SIconInbox from '@@/lib/components/icons/SIconInbox.vue'
import SIconInfo from '@@/lib/components/icons/SIconInfo.vue'
import SIconLayout from '@@/lib/components/icons/SIconLayout.vue'
import SIconLock from '@@/lib/components/icons/SIconLock.vue'
import SIconList from '@@/lib/components/icons/SIconList.vue'
import SIconMapPin from '@@/lib/components/icons/SIconMapPin.vue'
import SIconMoon from '@@/lib/components/icons/SIconMoon.vue'
import SIconMoreHorizontal from '@@/lib/components/icons/SIconMoreHorizontal.vue'
import SIconPauseFill from '@@/lib/components/icons/SIconPauseFill.vue'
import SIconPlayFill from '@@/lib/components/icons/SIconPlayFill.vue'
import SIconPlus from '@@/lib/components/icons/SIconPlus.vue'
import SIconPlusCircle from '@@/lib/components/icons/SIconPlusCircle.vue'
import SIconPlusOff from '@@/lib/components/icons/SIconPlusOff.vue'
import SIconPlayCircle from '@@/lib/components/icons/SIconPlayCircle.vue'
import SIconProgress from '@@/lib/components/icons/SIconProgress.vue'
import SIconRadio from '@@/lib/components/icons/SIconRadio.vue'
import SIconSave from '@@/lib/components/icons/SIconSave.vue'
import SIconSettings from '@@/lib/components/icons/SIconSettings.vue'
import SIconSkipBackFill from '@@/lib/components/icons/SIconSkipBackFill.vue'
import SIconShare2 from '@@/lib/components/icons/SIconShare2.vue'
import SIconSliders from '@@/lib/components/icons/SIconSliders.vue'
import SIconSun from '@@/lib/components/icons/SIconSun.vue'
import SIconTelescope from '@@/lib/components/icons/SIconTelescope.vue'
import SIconTrash from '@@/lib/components/icons/SIconTrash.vue'
import SIconTrash2 from '@@/lib/components/icons/SIconTrash2.vue'
import SIconTrash2Off from '@@/lib/components/icons/SIconTrash2Off.vue'
import SIconTrello from '@@/lib/components/icons/SIconTrello.vue'
import SIconUser from '@@/lib/components/icons/SIconUser.vue'
import SIconUsers from '@@/lib/components/icons/SIconUsers.vue'
import SIconX from '@@/lib/components/icons/SIconX.vue'
import SIconXCircle from '@@/lib/components/icons/SIconXCircle.vue'
import SIconXSquare from '@@/lib/components/icons/SIconXSquare.vue'
import SIconZap from '@@/lib/components/icons/SIconZap.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    StoryBase
  },

  setup() {
    const icons = [
      { component: SIconActivity, name: 'Activity' },
      { component: SIconArrowDown, name: 'ArrowDown' },
      { component: SIconArrowLeft, name: 'ArrowLeft' },
      { component: SIconArrowRight, name: 'ArrowRight' },
      { component: SIconArrowUp, name: 'ArrowUp' },
      { component: SIconDatabase, name: 'Database' },
      { component: SIconBarChart, name: 'BarChart' },
      { component: SIconBriefcase, name: 'Briefcase' },
      { component: SIconBuilding, name: 'Building' },
      { component: SIconCalendar, name: 'Calendar' },
      { component: SIconCheck, name: 'Check' },
      { component: SIconCheckCircle, name: 'CheckCircle' },
      { component: SIconCheckSquare, name: 'CheckSquare' },
      { component: SIconChevronDown, name: 'ChevronDown' },
      { component: SIconChevronLeft, name: 'ChevronLeft' },
      { component: SIconChevronRight, name: 'ChevronRight' },
      { component: SIconChevronUp, name: 'ChevronUp' },
      { component: SIconClock, name: 'Clock' },
      { component: SIconCode, name: 'Code' },
      { component: SIconDollarSign, name: 'DollarSign' },
      { component: SIconDownload, name: 'Download' },
      { component: SIconDownloadCloud, name: 'DownloadCloud' },
      { component: SIconEdit, name: 'Edit' },
      { component: SIconEdit2, name: 'Edit2' },
      { component: SIconEdit3, name: 'Edit3' },
      { component: SIconEdit3Off, name: 'Edit3Off' },
      { component: SIconEye, name: 'Eye' },
      { component: SIconExternalLink, name: 'ExternalLink' },
      { component: SIconFile, name: 'File' },
      { component: SIconFilePlus, name: 'FilePlus' },
      { component: SIconFileText, name: 'FileText' },
      { component: SIconFlag, name: 'Flag' },
      { component: SIconGrid, name: 'Grid' },
      { component: SIconGitBranch, name: 'GitBranch' },
      { component: SIconGitCommit, name: 'GitCommit' },
      { component: SIconGitPullRequest, name: 'GitPullRequest' },
      { component: SIconGlobe, name: 'Globe' },
      { component: SIconHome, name: 'Home' },
      { component: SIconInbox, name: 'Inbox' },
      { component: SIconInfo, name: 'Info' },
      { component: SIconLayout, name: 'Layout' },
      { component: SIconLock, name: 'Lock' },
      { component: SIconList, name: 'List' },
      { component: SIconMapPin, name: 'MapPin' },
      { component: SIconMoreHorizontal, name: 'MoreHorizontal' },
      { component: SIconMoon, name: 'Moon' },
      { component: SIconPauseFill, name: 'PauseFill' },
      { component: SIconPlayFill, name: 'PlayFill' },
      { component: SIconPlus, name: 'Plus' },
      { component: SIconPlusCircle, name: 'PlusCircle' },
      { component: SIconPlusOff, name: 'PlusOff' },
      { component: SIconPlayCircle, name: 'PlayCircle' },
      { component: SIconProgress, name: 'Progress' },
      { component: SIconRadio, name: 'Radio' },
      { component: SIconSave, name: 'Save' },
      { component: SIconSettings, name: 'Settings' },
      { component: SIconSkipBackFill, name: 'SkipBackFill' },
      { component: SIconShare2, name: 'Share2' },
      { component: SIconSliders, name: 'Sliders' },
      { component: SIconSun, name: 'Sun' },
      { component: SIconTelescope, name: 'Telescope' },
      { component: SIconTrash, name: 'Trash' },
      { component: SIconTrash2, name: 'Trash2' },
      { component: SIconTrash2Off, name: 'Trash2Off' },
      { component: SIconTrello, name: 'Trello' },
      { component: SIconUser, name: 'User' },
      { component: SIconUsers, name: 'Users' },
      { component: SIconX, name: 'X' },
      { component: SIconXCircle, name: 'XCircle' },
      { component: SIconXSquare, name: 'XSquare' },
      { component: SIconZap, name: 'Zap' }
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
