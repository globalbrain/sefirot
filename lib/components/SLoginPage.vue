<script setup lang="ts">
import LockKey from '@iconify-icons/ph/lock-key-fill'
import IconGoogle from '@iconify-icons/ri/google-fill'
import { computed, ref } from 'vue'
import { usePower } from '../composables/Power'
import SButton from './SButton.vue'
import SLink from './SLink.vue'
import SLoginPagePasswordDialog from './SLoginPagePasswordDialog.vue'
import SModal from './SModal.vue'
import SIconGbLogoWhite from './icon/SIconGbLogoWhite.vue'

export interface CoverTitle {
  text: string
  link: string
}

export interface CoverPhotographer {
  text: string
  link: string
}

export type Action = ActionPassword | ActionSocial

export interface ActionPassword {
  type: 'password'
  onSubmit(email: string, password: string): Promise<boolean>
}

export interface ActionSocial {
  type: 'google'
  onClick(): Promise<void>
}

export type ActionType = 'password' | 'google'

const props = defineProps<{
  cover: string
  coverTitle: CoverTitle
  coverPhotographer: CoverPhotographer
  actions: Action[]
}>()

const passwordDialog = usePower()

const selectedPasswordAction = ref<ActionPassword | null>(null)
const actionInProgress = ref(false)
const actionError = ref(false)

const coverBgImageStyle = computed(() => `url(${props.cover})`)

function getActionLabel(type: ActionType) {
  switch (type) {
    case 'password':
      return 'Sign in via Password'
    case 'google':
      return 'Sign in via Google'
  }
}

function getIconComponent(type: ActionType) {
  switch (type) {
    case 'password':
      return LockKey
    case 'google':
      return IconGoogle
  }
}

function onAction(action: Action) {
  switch (action.type) {
    case 'password':
      selectedPasswordAction.value = action
      return passwordDialog.on()
    case 'google':
      return action.onClick()
  }
}

async function onSubmit(email: string, password: string) {
  actionInProgress.value = true

  actionError.value = !(await selectedPasswordAction.value!.onSubmit(email, password))

  actionInProgress.value = false

  if (!actionError.value) {
    passwordDialog.off()
  }
}
</script>

<template>
  <div class="SLoginPage dark">
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

        <div class="form-actions" :class="{ multi: actions.length > 1 }">
          <div v-for="action in actions" :key="action.type" class="form-action">
            <SButton
              size="large"
              mode="white"
              block
              rounded
              :label="getActionLabel(action.type)"
              :icon="getIconComponent(action.type)"
              @click="onAction(action)"
            />
          </div>
        </div>
      </div>
    </div>

    <SModal :open="passwordDialog.state.value" @close="passwordDialog.off">
      <SLoginPagePasswordDialog
        :loading="actionInProgress"
        :error="actionError"
        @cancel="passwordDialog.off"
        @submit="onSubmit"
      />
    </SModal>
  </div>
</template>

<style scoped lang="postcss">
.SLoginPage {
  position: relative;
  background-color: var(--c-bg-elv-1);

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 392px;
    gap: 4px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 480px;
  }
}

.cover {
  display: none;
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
  background-color: var(--c-bg-elv-2);

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
  color: var(--c-text-1);
}

.form-lead {
  margin: 0 auto;
  padding: 12px;
  max-width: 336px;
  font-size: 14px;
  color: var(--c-text-2);
}

.form-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  text-align: center;
  margin: 0 auto;
}

.form-actions.multi .form-action {
  display: block;
  width: 100%;
  max-width: 256px;
}
</style>
