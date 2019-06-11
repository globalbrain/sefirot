<template>
  <div class="ComponentsIndex" />
</template>

<script>
export default {
  head: {
    title: 'Components'
  },

  fetch ({ redirect }) {
    return redirect('/components/buttons')
  }
}
</script>
