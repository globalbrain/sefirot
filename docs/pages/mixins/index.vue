<template>
  <div class="MixinsIndex" />
</template>

<script>
export default {
  head: {
    title: 'Mixins'
  },

  fetch ({ redirect }) {
    return redirect('/mixins/form')
  }
}
</script>
