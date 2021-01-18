<template>
  <div class="SHeader" :class="[size]">
    <div class="main">
      <div class="primary">
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
import { Size, Search, Action, Tag } from '../composables/Header'
import SAction from './SAction.vue'
import STag from './STag.vue'

export default defineComponent({
  components: {
    SAction,
    STag
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
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
  .title {
    line-height: 32px;
    font-size: 14px;
  }

  .tags { margin: 0 -8px; }
  .tag  { padding: 0 8px; }
}

.SHeader.medium {
  .title {
    line-height: 32px;
    font-size: 16px;
  }

  .tags { margin: 0 -8px; }
  .tag  { padding: 0 8px; }
}

.SHeader.large {
  .title {
    line-height: 32px;
    font-size: 20px;
  }

  .tags { margin: 0 -8px; }
  .tag  { padding: 0 8px; }
}

.main {
  display: flex;
}

.primary {
  flex-grow: 1;
}

.title {
  font-weight: 500;
}

.actions {
  display: flex;
}

.action       { padding-left: 8px; }
.action.gap-4 { padding-left: 4px; }
.action.gap-8 { padding-left: 8px; }

.sub {
  padding-top: 2px;
}

.tags {
  display: flex;
}
</style>
