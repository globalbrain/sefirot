<script setup lang="ts">
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import SButton from 'sefirot/components/SButton.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import SModal from 'sefirot/components/SModal.vue'
import { nextTick, ref } from 'vue'

const title = 'Components / SModal / 01. Focus'
const open = ref(false)
const nested = ref(false)
const editor = ref(false)
const external = ref<HTMLElement>()
const selected = ref<number | null>(null)

async function openEditor() {
  editor.value = true
  await nextTick()
  external.value?.querySelector('input')?.focus()
}

function closeEditor(event: KeyboardEvent) {
  if (event.isComposing) { return }
  event.preventDefault()
  event.stopPropagation()
  editor.value = false
}
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title docs="/components/modal">
      <SButton label="Open managed dialog" @click="open = true" />
      <SModal :open manage-focus aria-labelledby="dialog-title" initial-focus="#dialog-name" :focus-containers="[external]" @close="open = false">
        <SCard size="small">
          <SCardBlock class="contents">
            <h2 id="dialog-title">Edit profile</h2>
            <label>Name <input id="dialog-name" value="Example member"></label>
            <a href="#dialog-title">Profile details</a>
            <SInputDropdown v-model="selected" :options="[{ label: 'One', value: 1 }]" />
            <SActionMenu label="Actions" :options="[{ type: 'menu', options: [{ label: 'Example action' }] }]" />
            <SButton label="Open nested dialog" @click="nested = true" />
            <button aria-controls="external-editor" :aria-expanded="editor" @click="openEditor">Open teleported editor</button>
            <SButton label="Close dialog" @click="open = false" />
          </SCardBlock>
          <SModal :open="nested" manage-focus aria-label="Nested dialog" @close="nested = false">
            <SCard size="small">
              <SCardBlock class="contents">
                <label>Notes <textarea /></label>
                <SButton label="Close nested dialog" @click="nested = false" />
              </SCardBlock>
            </SCard>
          </SModal>
        </SCard>
      </SModal>
      <Teleport to="#sefirot-modals">
        <div v-if="open && editor" id="external-editor" ref="external" class="editor" @keydown.esc="closeEditor">
          <label>Teleported value <input></label>
          <button @click="editor = false">Close editor</button>
        </div>
      </Teleport>
    </Board>
  </Story>
</template>

<style scoped>
.contents { display: grid; gap: 16px; padding: 24px; }
input, textarea { display: block; width: 100%; border: 1px solid var(--c-divider); padding: 8px; }
.editor { position: fixed; top: 12px; right: 12px; z-index: calc(var(--z-index-backdrop) + 1); padding: 16px; background: var(--c-bg-1); border: 1px solid var(--c-divider); }
</style>
