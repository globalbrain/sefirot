<template>
  <div class="MixinsIndex" />
</template>

<script>
export default {

  fetch ({ redirect }) {
    return redirect('/mixins/form')
  },
  head: {
    title: 'Mixins'
  }
}
</script>
