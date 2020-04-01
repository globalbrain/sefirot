<template>
  <SModalBase :name="name" :closable="closable">
    <div class="SWindow">
      <button v-if="closable" class="close" @click="close">
        <SIconX class="close-icon" />
      </button>

      <div v-if="showHeader" class="header">
        <p class="title">{{ title }}</p>
        <p v-if="lead" class="lead">{{ lead }}</p>
      </div>

      <div class="content">
        <slot />
      </div>

      <div v-if="actions" class="actions">
        <div v-for="(action, index) in actions" :key="index" class="action">
          <SButton
            :label="action.label"
            :type="action.type"
            :mode="action.mode"
            size="large"
            @click="action.callback"
          />
        </div>
      </div>
    </div>
  </SModalBase>
</template>

<script>
import SIconX from './icons/SIconX'
import SButton from './SButton'
import SModalBase from './SModalBase'

export default {
  components: {
    SIconX,
    SButton,
    SModalBase
  },

  props: {
    name: { type: String, required: true },
    title: { type: String, default: null },
    lead: { type: String, default: null },
    actions: { type: Array, default: null },
    closable: { type: Boolean, default: false }
  },

  computed: {
    showHeader () {
      return !!this.title
    }
  },

  methods: {
    close () {
      this.$store.dispatch('window/close')
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SWindow {
  position: relative;
  margin: 48px 24px;
  border-radius: 2px;
  max-width: 768px;
  background-color: var(--c-white);
  box-shadow: var(--shadow-depth-5);
  transition: opacity .25s, transform .25s;
  transition-delay: .05s;

  @media (min-width: 768px) {
    margin: 96px auto;
  }
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;

  &:hover .close-icon {
    fill: var(--c-black);
  }
}

.close-icon {
  width: 16px;
  height: 16px;
  fill: var(--c-gray);
  transition: fill .25s;
}

.header {
  border-radius: 2px 2px 0 0;
  padding: 32px;
  background-color: var(--c-white-soft);

  @media (min-width: 768px) {
    padding: 48px 64px 40px;
  }
}

.title {
  line-height: 32px;
  text-align: center;
  font-size: 24px;
}

.lead {
  padding-top: 8px;
  text-align: center;
  color: var(--c-gray);
}

.content {
  padding: 32px;

  @media (min-width: 768px) {
    padding: 48px 64px;
  }
}

.actions {
  display: flex;
  justify-content: center;
  padding: 32px;

  @media (min-width: 768px) {
    padding: 32px 64px 48px;
  }
}

.action {
  & + & {
    padding-left: 16px;
  }
}
</style>
