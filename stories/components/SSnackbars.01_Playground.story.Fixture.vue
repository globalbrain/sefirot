<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SSnackbars from 'sefirot/components/SSnackbars.vue'
import { useSnackbars } from 'sefirot/stores/Snackbars'

const snackbars = useSnackbars()

function pushNeutralSnackbar() {
  snackbars.push({
    text: 'This is the neutral snackbar message.'
  })
}

function pushInfoSnackbar() {
  snackbars.push({
    mode: 'info',
    text: 'This is the info snackbar message.'
  })
}

function pushWarningSnackbar() {
  snackbars.push({
    mode: 'warning',
    text: 'This is the warning snackbar message.'
  })
}

function pushDangerSnackbar() {
  snackbars.push({
    mode: 'danger',
    text: 'This is the danger snackbar message.'
  })
}
</script>

<template>
  <div>
    <div class="list">
      <SButton size="small" mode="mute" label="Neutral snackbar" @click="pushNeutralSnackbar" />
      <SButton size="small" mode="info" label="Info snackbar" @click="pushInfoSnackbar" />
      <SButton size="small" mode="warning" label="Warning snackbar" @click="pushWarningSnackbar" />
      <SButton size="small" mode="danger" label="Danger snackbar" @click="pushDangerSnackbar" />
    </div>

    <SSnackbars />
  </div>
</template>

<style scoped lang="postcss">
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
