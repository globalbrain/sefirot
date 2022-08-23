<template>
  <div v-show="show" class="SModal" ref="el">
    <div class="content">
      <component :is="component" v-bind="data ?? {}" @close="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  id?: number
  component: any
  data?: Record<string, any>
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close', id?: number): void
}>()

const el = ref<any>(null)

onMounted(lock)
onBeforeUnmount(release)

function close() {
  emit('close', props.id)
}

function lock() {
  disableBodyScroll(el.value!, { reserveScrollBarGap: true })
}

function release() {
  enableBodyScroll(el.value!)
}
</script>

<style scoped lang="postcss">
.SModal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
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
