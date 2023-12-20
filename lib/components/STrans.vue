<script setup lang="ts">
import { type Lang, useLang } from '../composables/Lang'

defineProps<{
  lang: Lang
}>()

const currentLang = useLang()
</script>

<template>
  <slot v-if="currentLang === lang" />
</template>
