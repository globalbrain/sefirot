<template>
  <div class="Home" />
</template>

<script>
export default {
  head: {
    title: 'Sefirot | We Shape Our Buildings. Thereafter, They Shape Us.'
  },

  fetch ({ redirect }) {
    return redirect('/components')
  }
}
</script>
