<template lang="md">
<StoryBase>
  <div class="actions">
    <div class="item"><SButton mode="info" label="INFO" @click="openAlertInfo" /></div>
    <div class="item"><SButton mode="success" label="SUCCESS" @click="openAlertSuccess" /></div>
    <div class="item"><SButton mode="warning" label="WARNING" @click="openAlertWarning" /></div>
    <div class="item"><SButton mode="danger" label="DANGER" @click="openAlertDanger" /></div>
  </div>
</StoryBase>

```html
<template>
  <div class="actions">
    <div class="item"><SButton mode="info" label="INFO" @click="openAlertInfo" /></div>
    <div class="item"><SButton mode="success" label="SUCCESS" @click="openAlertSuccess" /></div>
    <div class="item"><SButton mode="warning" label="WARNING" @click="openAlertWarning" /></div>
    <div class="item"><SButton mode="danger" label="DANGER" @click="openAlertDanger" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useStore } from '@globalbrain/sefirot/lib/composables/Store'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const store = useStore()

    function openAlertInfo() {
      store.dispatch('alert/open', {
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'info', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function openAlertSuccess() {
      store.dispatch('alert/open', {
        type: 'success',
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'success', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function openAlertWarning() {
      store.dispatch('alert/open', {
        type: 'warning',
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'warning', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function openAlertDanger() {
      store.dispatch('alert/open', {
        type: 'danger',
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'danger', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function close() {
      store.dispatch('alert/close')
    }

    return {
      openAlertInfo,
      openAlertSuccess,
      openAlertWarning,
      openAlertDanger
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
}
</style>
```
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useStore } from '@@/lib/composables/Store'
import SButton from '@@/lib/components/SButton.vue'
import StoryBase from '@/components/StoryBase.vue'

export default defineComponent({
  components: {
    SButton,
    StoryBase
  },

  setup() {
    const store = useStore()

    function openAlertInfo() {
      store.dispatch('alert/open', {
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'info', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function openAlertSuccess() {
      store.dispatch('alert/open', {
        type: 'success',
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'success', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function openAlertWarning() {
      store.dispatch('alert/open', {
        type: 'warning',
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'warning', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function openAlertDanger() {
      store.dispatch('alert/open', {
        type: 'danger',
        title: 'The alert title',
        text: 'This is the alert message.',
        actions: [
          { type: 'mute', label: 'DISMISS', callback: close },
          { type: 'primary', mode: 'danger', label: 'CLOSE ALERT', callback: close }
        ]
      })
    }

    function close() {
      store.dispatch('alert/close')
    }

    return {
      openAlertInfo,
      openAlertSuccess,
      openAlertWarning,
      openAlertDanger
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  padding: 8px;
}
</style>
