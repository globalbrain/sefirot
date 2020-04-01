<template>
  <SModalBase name="dialog" :closable="false">
    <div class="SDialog">
      <p v-if="data.title" class="title">{{ data.title }}</p>
      <p v-if="data.text" class="text">{{ data.text }}</p>

      <div v-if="isTypeLoading" class="load">
        <div class="load-icon">
          <SIconPreloaderDark class="load-svg" />
        </div>
      </div>

      <div v-if="isTypeProgress" class="progress">
        <SProgressBar :now="data.progress.now" :max="data.progress.max" />
      </div>

      <div v-if="hasActions" class="actions">
        <div v-for="(action, index) in data.actions" :key="index" class="action">
          <SButton
            :type="getActionType(action.type)"
            :label="action.label"
            @click="action.callback"
          />
        </div>
      </div>
    </div>
  </SModalBase>
</template>

<script>
import SIconPreloaderDark from './icons/SIconPreloaderDark'
import SButton from './SButton'
import SProgressBar from './SProgressBar'
import SModalBase from './SModalBase'

export default {
  components: {
    SIconPreloaderDark,
    SButton,
    SProgressBar,
    SModalBase
  },

  computed: {
    data () {
      return this.$store.state.modal.data
    },

    hasActions () {
      const actions = this.data.actions

      return actions ? actions.length > 0 : false
    },

    isTypeLoading () {
      return this.data.type === 'loading'
    },

    isTypeProgress () {
      return this.data.type === 'progress'
    }
  },

  methods: {
    getActionType (value) {
      if (value === 'mute') {
        return 'mute'
      }

      return 'text'
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SDialog {
  margin: 48px 16px;
  border-radius: 2px;
  padding: 32px;
  width: 100%;
  max-width: 512px;
  background-color: var(--c-white);
  box-shadow: var(--shadow-depth-5);
  transition: opacity .25s, transform .25s;
  transition-delay: .05s;

  @media (min-width: 544px) {
    margin: 128px auto;
  }
}

.title {
  line-height: 38px;
  font-size: 20px;
}

.text {
  .title + & {
    padding-top: 8px;
  }
}

.load {
  margin-bottom: -16px;
  margin-left: -8px;
  padding-top: 24px;
}

.load-svg {
  width: 48px;
  height: 48px;
}

.progress {
  padding-top: 32px;
}

.actions {
  display: flex;
  margin-right: -16px;
  margin-bottom: -16px;
  padding-top: 32px;
  justify-content: flex-end;
}

.action {
  & + & {
    padding-left: 4px;
  }
}
</style>
