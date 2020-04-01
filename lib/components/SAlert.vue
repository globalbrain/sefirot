<template>
  <SModalBase name="alert" :closable="false">
    <div class="SAlert" :class="classes">
      <div class="icon">
        <component :is="icon" class="icon-svg" />
      </div>

      <p class="title">{{ data.title }}</p>
      <p class="text">{{ data.text }}</p>

      <div class="actions">
        <div v-for="(action, index) in data.actions" :key="index" class="action">
          <SButton
            :label="action.label"
            :type="getActionType(action.type)"
            :mode="action.mode"
            @click="action.callback"
          />
        </div>
      </div>
    </div>
  </SModalBase>
</template>

<script>
import SIconInfo from './icons/SIconInfo'
import SIconCheckCircleThin from './icons/SIconCheckCircleThin'
import SIconWarning from './icons/SIconWarning'
import SIconXCircleThin from './icons/SIconXCircleThin'
import SButton from './SButton'
import SModalBase from './SModalBase'

export default {
  components: {
    SButton,
    SModalBase
  },

  computed: {
    data () {
      return this.$store.state.modal.data
    },

    classes () {
      return {
        info: this.data.type === 'info',
        success: this.data.type === 'success',
        warning: this.data.type === 'warning',
        danger: this.data.type === 'danger',
        error: this.data.type === 'error'
      }
    },

    icon () {
      if (this.data.type === 'success') {
        return SIconCheckCircleThin
      }

      if (this.data.type === 'warning') {
        return SIconWarning
      }

      if (this.data.type === 'danger') {
        return SIconWarning
      }

      if (this.data.type === 'error') {
        return SIconXCircleThin
      }

      return SIconInfo
    }
  },

  methods: {
    getActionType (value) {
      if (value === 'mute') {
        return 'mute'
      }

      return 'primary'
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SAlert {
  margin: 48px 16px;
  border-radius: 2px;
  padding: 48px;
  width: 100%;
  max-width: 512px;
  background-color: var(--c-white);
  box-shadow: var(--shadow-depth-5);
  transition: opacity .25s, transform .5s var(--ease-out-quint);
  transition-delay: .5s;

  @media (min-width: 544px) {
    margin: 128px auto;
  }
}

.modal-content-enter .SAlert {
  transform: scale(1.1);
}

.modal-content-leave-to .SAlert {
  transform: scale(.9);
}

.SAlert.info {
  .icon-svg { fill: var(--c-gray); }
}

.SAlert.success {
  .icon-svg { fill: var(--c-success); }
}

.SAlert.warning {
  .icon-svg { fill: var(--c-warning); }
}

.SAlert.danger {
  .title    { color: var(--c-danger); }
  .icon-svg { fill: var(--c-danger); }
}

.SAlert.error {
  .title    { color: var(--c-danger); }
  .icon-svg { fill: var(--c-danger); }
}

.icon-svg {
  display: block;
  margin: 0 auto;
  width: 48px;
  height: 48px;
}

.title {
  padding-top: 24px;
  text-align: center;
  line-height: 32px;
  font-size: 24px;
}

.text {
  padding-top: 12px;
  text-align: center;
}

.actions {
  display: flex;
  padding-top: 48px;
  justify-content: center;
}

.action {
  & + & {
    padding-left: 8px;
  }
}
</style>
