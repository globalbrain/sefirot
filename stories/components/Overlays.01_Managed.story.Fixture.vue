<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import SButton from 'sefirot/components/SButton.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import SModal from 'sefirot/components/SModal.vue'
import { computed, ref } from 'vue'
import { provideLayout } from '../../lib/composables/Layout'
import { provideOverlays } from '../../lib/composables/Overlays'

const smallScreen = useMediaQuery('(max-width: 959px)')
const desktop = ref(false)
const managed = ref(true)
provideLayout(computed(() => smallScreen.value && !desktop.value ? 'mobile' : 'desktop'))
provideOverlays(managed)
const open = ref(false)
const nested = ref(false)
const closable = ref(true)
const text = ref('Populated dialog input')
const selected = ref<number | null>(null)
const options = Array.from({ length: 20 }, (_, value) => ({ label: `Choice ${value + 1} with a long descriptive label`, value }))
</script>

<template>
  <div class="example" :class="{ desktop: desktop && smallScreen }">
    <label><input v-model="desktop" type="checkbox"> Force desktop layout</label>
    <label><input v-model="managed" type="checkbox"> Enable managed overlays</label>
    <SButton label="Open dialog" @click="open = true" />
    <SActionMenu label="Open menu" :options="[{ type: 'menu', options: [{ label: 'A long menu option that wraps on a narrow screen' }] }]" />
    <SModal :open :closable aria-label="Example dialog" initial-focus="#dialog-first" @close="open = false">
      <SCard size="medium">
        <SCardBlock :padding="{ desktop: 24, mobile: 16 }">
          <h2>Example dialog</h2>
          <SInputText v-model="text" name="dialog-first" label="Dialog input" size="mini" />
          <SInputDropdown v-model="selected" label="Dialog dropdown" :options />
          <label><input v-model="closable" type="checkbox"> Allow dismissal</label>
          <p><a href="#example">A focusable link</a></p>
          <SControl>
            <SControlLeft><SButton label="Open nested dialog" @click="nested = true" /></SControlLeft>
            <SControlRight><SButton label="Close this dialog with a long button label" @click="open = false" /></SControlRight>
          </SControl>
        </SCardBlock>
      </SCard>
      <SModal :open="nested" aria-label="Nested dialog" @close="nested = false">
        <SCard size="small"><SCardBlock :padding="16"><SButton label="Close nested dialog" @click="nested = false" /></SCardBlock></SCard>
      </SModal>
    </SModal>
  </div>
</template>

<style scoped>
.example { padding: 12px; display: grid; justify-items: start; gap: 16px; }
.example.desktop { min-width: 1200px; }
h2 { margin-bottom: 16px; }
</style>
