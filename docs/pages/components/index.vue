<template>
  <div class="ComponentsIndex" />
</template>

<script>
export default {

  fetch ({ redirect }) {
    return redirect('/components/buttons')
  },
  head: {
    title: 'Components'
  }
}
</script>
