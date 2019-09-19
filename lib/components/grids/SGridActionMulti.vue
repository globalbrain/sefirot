<template>
  <div class="SGridActionMulti">
    <div class="menu">
      <SIconMoreHorizontal class="menu-icon" />
    </div>

    <div class="actions">
      <STooltip
        class="action"
        :style="actionStyles(index)"
        :key="index"
        :text="action.name"
        position="top"
        v-for="(action, index) in actions"
      >
        <div class="action-content">
          <component :is="action.icon" class="action-icon" />
        </div>
      </STooltip>
    </div>
  </div>
</template>

<script>
import SIconMoreHorizontal from '../icons/SIconMoreHorizontal'
import STooltip from '../tooltips/STooltip'

export default {
  components: {
    SIconMoreHorizontal,
    STooltip
  },

  props: {
    actions: { type: Array, required: true }
  },

  methods: {
    actionStyles (index) {
      const size = this.actions.length

      const sec = (size - (index + 1)) * 0.1

      return {
        transition: `background-color .25s, opacity .25s ${sec}s, transform .25s ${sec}s`
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGridActionMulti {
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin: -6px 0;
  padding-right: 8px;
}

.SGrid .row:hover {
  .menu {
    opacity: 0;
  }

  .action {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: opacity .25s;
}

.menu-icon {
  display: block;
  width: 12px;
  height: 12px;
  fill: var(--c-gray-light);
  transition: fill .25s;
}

.actions {
  position: absolute;
  top: 0;
  right: 8px;
  display: flex;
}

.action {
  border-radius: 50%;
  opacity: 0;
  transform: translateY(-8px);

  & + & {
    margin-left: 4px;
  }

  &:hover {
    background-color: var(--c-gray-lighter);

    .action-icon {
      fill: var(--c-black);
    }
  }

  &:active {
    background-color: var(--c-gray-light);
  }
}

.action-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}

.action-icon {
  width: 14px;
  height: 14px;
  fill: var(--c-gray);
  transition: fill .25s;
}
</style>
