<template>
  <div class="SGrid">
    <div v-if="$slots.header" class="header">
      <slot name="header" />
    </div>

    <VueSimplebar class="body">
      <div v-if="$slots.columns" class="columns">
        <div class="columns-row">
          <slot name="columns" />
        </div>
      </div>

      <div v-if="records.length > 0" class="body-records" :class="{ loading }">
        <div
          v-for="record in records"
          :key="record[primaryKey]"
          class="row"
          :class="{ clickable }"
          role="button"
          @click="handleClick(record)"
        >
          <slot :record="record" />

          <div v-if="actions" class="actions">
            <component
              :is="actionComponent"
              :action="actions"
              :actions="actions"
            />
          </div>
        </div>
      </div>

      <div v-else class="body-empty">
        <slot name="empty" />
      </div>
    </VueSimplebar>

    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>

    <transition name="fade">
      <div v-if="loading" class="body-loading">
        <SIconPreloaderDark class="body-loading-icon" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import VueSimplebar from 'simplebar-vue'
import SIconPreloaderDark from './icons/SIconPreloaderDark.vue'
import SGridActionLink from './SGridActionLink.vue'
import SGridActionSingle from './SGridActionSingle.vue'
import SGridActionMulti from './SGridActionMulti.vue'

export default defineComponent({
  components: {
    VueSimplebar,
    SIconPreloaderDark
  },

  props: {
    primaryKey: { type: String, default: 'id' },
    records: { type: Array, required: true },
    actions: { type: [String, Object, Array], default: null },
    clickable: { type: Boolean, default: true },
    loading: { type: Boolean, default: false }
  },

  setup(props, context) {
    const actionComponent = computed(() => {
      if (typeof props.actions === 'string') {
        return SGridActionLink
      }

      if (Array.isArray(props.actions)) {
        return SGridActionMulti
      }

      return SGridActionSingle
    })

    function handleClick(record: object): void {
      props.clickable && context.emit('click', record)
    }

    return {
      actionComponent,
      handleClick
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGrid {
  border-radius: 8px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow-depth-1);
}

.columns {
  display: inline-flex;
}

.columns-row {
  display: inline-flex;
  padding: 0 12px;

  & >>> .cell {
    flex-grow: 1;
    flex-shrink: 0;
    padding: 16px 12px 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--c-text-light-2);
  }
}

.body {
  position: relative;
  overflow: hidden;
  overflow-x: auto;
}

.body-records {
  display: inline-flex;
  flex-direction: column;
  border-top: 1px solid var(--c-divider-lighter);
  min-width: 100%;

  & >>> .row {
    display: flex;
    border-top: 1px solid var(--c-divider-lighter);
    padding: 22px 12px 21px;
    transition: background-color .25s;
    cursor: default;

    &:first-child {
      border-top: 0;
    }

    &:hover {
      background-color: var(--c-white-soft);
    }

    &.clickable {
      cursor: pointer;
    }
  }

  & >>> .cell {
    flex-shrink: 0;
    margin: 0;
    padding: 0 12px;
    line-height: 20px;
    font-size: 14px;
    color: var(--c-text-light-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      color: var(--c-info-light);
      transition: color .25s;

      &:hover {
        color: var(--c-info-dark);
      }
    }
  }

  & >>> .cell-main {
    margin: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & >>> .cell-sub {
    margin: 0;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    color: var(--c-text-light-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & >>> .actions {
    flex-grow: 1;
    height: 100%;
  }
}

.body-empty {
  border-top: 1px solid var(--c-divider-lighter);
  min-width: 100%;
}

.footer {
  border-top: 1px solid var(--c-divider);
}

.body-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--c-bg);
  transition: opacity .25s, transform .25s;
}

.body-loading.fade-enter,
.body-loading.fade-leave-to {
  opacity: 0;
}

.body-loading-icon {
  position: absolute;
  top: 24px;
  left: 50%;
  width: 48px;
  height: 48px;
  transform: translateX(-50%);
}
</style>
