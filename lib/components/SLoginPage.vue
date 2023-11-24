<script setup lang="ts">
import { computed } from 'vue'
import SButton from './SButton.vue'
import SLink from './SLink.vue'
import SIconGbLogoWhite from './icon/SIconGbLogoWhite.vue'
import SIconGoogle from './icon/SIconGoogle.vue'

export interface CoverTitle {
  text: string
  link: string
}

export interface CoverPhotographer {
  text: string
  link: string
}

export interface Action {
  type: 'google'
  label?: string
  onClick: () => Promise<void>
}

const props = defineProps<{
  cover: string
  coverTitle: CoverTitle
  coverPhotographer: CoverPhotographer
  actions: Action[]
}>()

const coverBgImageStyle = computed(() => props.cover ? `url(${props.cover})` : '')

function getActionLabel(type: Action['type']) {
  switch (type) {
    case 'google':
      return 'Sign in via Google'
    default:
      throw new Error('Invalid action type')
  }
}

function getIconComponent(type: Action['type']) {
  switch (type) {
    case 'google':
      return SIconGoogle
    default:
      throw new Error('Invalid action type')
  }
}
</script>

<template>
  <div class="SLoginPage">
    <div class="cover">
      <div class="cover-caption">
        <p class="cover-caption-text">
          <SLink class="cover-caption-link" :href="coverTitle.link">
            {{ coverTitle.text }}
          </SLink>
          by
          <SLink class="cover-caption-link" :href="coverPhotographer.link">
            {{ coverPhotographer.text }}
          </SLink>
        </p>
      </div>
    </div>
    <div class="form">
      <div class="form-container">
        <div class="form-logo">
          <SIconGbLogoWhite class="form-logo-icon" />
        </div>

        <div class="form-content">
          <h1 class="form-title">Sign in to account</h1>
          <p class="form-lead">This is a very closed login form meant for specific audiences only. If you can’t login, well, you know who to ask.</p>
        </div>

        <div class="form-actions">
          <SButton
            v-for="action in actions"
            :key="action.type"
            size="large"
            mode="white"
            rounded
            block
            :label="action.label || getActionLabel(action.type)"
            :icon="getIconComponent(action.type)"
            @click="action.onClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SLoginPage {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 4px;
  background-color: var(--c-black);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 392px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 480px;
  }
}

.cover {
  width: 100%;
  height: 100%;
  background-image: v-bind(coverBgImageStyle);
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;

  @media (min-width: 768px) {
    display: block;
  }
}

.cover-caption {
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 4px solid var(--c-bg-elv-1);
  border-right: 4px solid var(--c-bg-elv-1);
  padding: 16px 24px;
  font-size: 12px;
  background-color: var(--c-bg-elv-2);

  @media (min-width: 768px) {
    display: block;
  }
}

.cover-caption-text {
  color: var(--c-text-2);
}

.cover-caption-link {
  color: var(--c-text-1);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-2);
  }
}

.form {
  padding: 96px 32px 48px;
  min-height: 100vh;
  background-color: var(--c-black-soft);

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 48px;
  }
}

.form-container {
  @media (min-width: 768px) {
    margin-top: -96px;
  }
}

.form-logo {
  margin: 0 auto;
  width: 80px;
}

.form-content {
  padding-top: 64px;
  text-align: center;
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--c-text-dark-1);
}

.form-lead {
  margin: 0 auto;
  padding: 12px;
  max-width: 336px;
  font-size: 14px;
  color: var(--c-text-dark-2);
}

.form-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 170px;
  padding-top: 24px;
  text-align: center;
  margin: 0 auto;
}
</style>
