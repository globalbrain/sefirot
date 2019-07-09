<template lang="md">
# Placeholders

Placeholders are for showing temporary state when waiting for a certain component to be loaded, for example, a preloader icon could be shown while waiting for an image to be downloaded.


<SPlaceholderBlank />
<SPlaceholderImage />
</template>

<script>
import SPlaceholderBlank from '@/components/stories/placeholders/SPlaceholderBlank'
import SPlaceholderImage from '@/components/stories/placeholders/SPlaceholderImage'

export default {
  components: {
    SPlaceholderBlank,
    SPlaceholderImage
  },

  head: {
    title: 'Placeholders'
  },

  scrollToTop: true
}
</script>
