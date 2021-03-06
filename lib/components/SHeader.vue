<template>
  <div class="SHeader" :class="[size, mode]">
    <div class="main">
      <div class="primary">
        <component :is="icon" v-if="icon" class="SHeader-icon" />
        <p v-if="title" class="title">{{ title }}</p>
        <slot />
      </div>

      <div class="actions">
        <div
          v-for="(action, index) in cActions"
          :key="index"
          class="action"
          :class="[`gap-${action.gap}`]"
        >
          <SAction :action="action" />
        </div>

        <slot name="after-actions" />
      </div>
    </div>

    <div v-if="cTags.length > 0" class="sub">
      <div class="tags">
        <div v-for="(tag, index) in cTags" :key="index" class="tag">
          <STag v-bind="tag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Size, Mode, Search, Action, Tag } from '../composables/Header'
import SAction from './SAction.vue'
import STag from './STag.vue'

export default defineComponent({
  components: {
    SAction,
    STag
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    icon: { type: Object, default: null },
    title: { type: String, default: null },
    search: { type: Object as PropType<Search>, default: null },
    actions: { type: Array as PropType<Action[]>, default: () => [] },
    tags: { type: Array as PropType<Tag[]>, default: () => [] }
  },

  setup(props) {
    const cActions = computed(() => {
      return props.actions.map(action => ({
        size: 'small',
        ...action
      }))
    })

    const cTags = computed(() => {
      return props.tags.map(tag => ({
        size: 'small',
        ...tag
      }))
    })

    return {
      cActions,
      cTags
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SHeader {
  flex-shrink: 0;
}

.SHeader.small {
  .SHeader-icon {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }

  .title {
    line-height: 32px;
    font-size: 14px;
  }

  .tags { margin: 0 -8px; }
  .tag  { padding: 0 8px; }
}

.SHeader.medium {
  .SHeader-icon {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }

  .title {
    line-height: 32px;
    font-size: 16px;
  }

  .tags { margin: 0 -8px; }
  .tag  { padding: 0 8px; }
}

.SHeader.large {
  .SHeader-icon {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }

  .title {
    line-height: 32px;
    font-size: 20px;
  }

  .tags { margin: 0 -8px; }
  .tag  { padding: 0 8px; }
}

.SHeader.neutral .title { color: var(--c-text-1); }
.SHeader.info .title    { color: var(--c-text-1); }
.SHeader.success .title { color: var(--c-text-1); }
.SHeader.warning .title { color: var(--c-text-1); }
.SHeader.danger .title  { color: var(--c-danger); }

.SHeader.neutral .SHeader-icon { fill: var(--c-text-1); }
.SHeader.info .SHeader-icon    { fill: var(--c-info); }
.SHeader.success .SHeader-icon { fill: var(--c-success); }
.SHeader.warning .SHeader-icon { fill: var(--c-warning); }
.SHeader.danger .SHeader-icon  { fill: var(--c-danger); }

.main {
  display: flex;
}

.primary {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.title {
  font-weight: 500;
}

.actions {
  display: flex;
  align-items: center;
}

.action        { padding-left: 8px; }
.action.gap-4  { padding-left: 4px; }
.action.gap-8  { padding-left: 8px; }
.action.gap-12 { padding-left: 12px; }
.action.gap-16 { padding-left: 16px; }
.action.gap-24 { padding-left: 24px; }
.action.gap-32 { padding-left: 32px; }

.sub {
  padding-top: 2px;
}

.tags {
  display: flex;
}
</style>
