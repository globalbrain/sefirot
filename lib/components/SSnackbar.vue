<template>
  <div class="SSnackbar">
    <button class="close" @click="close">
      <SIconX class="close-icon" />
    </button>

    <p class="content">{{ text }}</p>

    <div class="actions" v-if="actions">
      <div class="action" :key="index" v-for="(action, index) in actions">
        <SButton
          :type="getActionType(action.type)"
          :label="action.label"
          :inverse="true"
          @click="action.callback"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SIconX from '../icons/SIconX'
import SButton from '../buttons/SButton'

export default {
  components: {
    SIconX,
    SButton
  },

  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    actions: { type: Array, default: null }
  },

  methods: {
    getActionType (value) {
      if (value === 'mute') {
        return 'mute'
      }

      return 'text'
    },

    close () {
      this.$store.dispatch('snackbars/pop', this.id)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SSnackbar {
  position: relative;
  border-radius: 2px;
  width: 100%;
  color: var(--c-white);
  background-color: rgba(0, 0, 0, .9);
  box-shadow: var(--shadow-depth-5);
}

.close {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;

  &:hover {
    .close-icon {
      fill: var(--c-white);
    }
  }
}

.close-icon {
  width: 12px;
  height: 12px;
  fill: var(--c-gray);
  transition: fill .25s;
}

.content {
  position: relative;
  z-index: 10;
  padding: 16px 68px 16px 20px;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 8px;
}

.action {
  & + & {
    padding-left: 4px;
  }
}
</style>
