<template>
  <div class="GuideIndex" />
</template>

<script>
export default {

  fetch ({ redirect }) {
    return redirect('/guide/getting-started')
  },
  head: {
    title: 'Guide'
  }
}
</script>
