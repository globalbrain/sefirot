<template>
  <div v-show="show" class="SModal" ref="el" @click="closeIfClosable">
    <div class="content" @click="closeIfClosable">
      <component :is="component" v-bind="data" @close="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const props = defineProps({
  id: { type: Number, default: null },
  component: { type: [Object, Function], default: () => ({}) },
  data: { type: Object, default: () => ({}) },
  show: { type: Boolean, required: true },
  closable: { type: Boolean, default: true }
})

const emit = defineEmits(['close'])

const el = ref<any>(null)

onMounted(lock)
onBeforeUnmount(release)

function close() {
  emit('close', props.id)
}

function closeIfClosable(e: any): void {
  if (props.closable) {
    if (!isDescendant(e.target)) {
      close()
    }
  }
}

function isDescendant(el: any): boolean {
  if (el.classList && el.classList.contains('content')) {
    return false
  }

  const parent = document.getElementsByClassName('content')[0]

  return parent && parent.contains(el)
}

function lock(): void {
  disableBodyScroll(el.value!, { reserveScrollBarGap: true })
}

function release(): void {
  enableBodyScroll(el.value!)
}
</script>

<style lang="postcss" scoped>
.SModal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  padding: 32px 16px 96px;
  overflow: hidden;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 48px 24px 96px;
  }
}

.SModal.fade-enter-active .content,
.SModal.fade-leave-active .content,
.content.fade-enter-active,
.content.fade-leave-active {
  transition: opacity .25s, transform .25s;
}

.SModal.fade-enter-active .content,
.content.fade-enter-active {
  transition-delay: .15s;
}

.SModal.fade-enter-from .content,
.content.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.SModal.fade-leave-to .content,
.content.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.content {
  margin: 0 auto;
  transition: opacity .25s, transform .25s;
}
</style>
