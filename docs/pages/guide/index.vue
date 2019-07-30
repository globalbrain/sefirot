<template>
  <div class="GuideIndex" />
</template>

<script>
export default {
  head: {
    title: 'Guide'
  },

  fetch ({ redirect }) {
    return redirect('/guide/getting-started')
  }
}
</script>
