<template>
  <div class="SGrid">
    <div class="wrapper">
      <div class="container">
        <div v-if="$slots.columns" class="columns">
          <div class="columns-row">
            <slot name="columns" />
          </div>
        </div>

        <div class="body">
          <div class="body-records" :class="{ loading }">
            <div
              class="row"
              :class="{ clickable }"
              role="button"
              :key="record[primaryKey]"
              @click="handleClick(record)"
              v-for="record in records"
            >
              <slot :record="record" />

              <div class="actions" v-if="actions">
                <component
                  :is="actionComponent"
                  :action="actions"
                  :actions="actions"
                />
              </div>
            </div>
          </div>

          <transition name="fade">
            <div class="body-loading" v-if="loading">
              <SIconPreloaderDark class="body-loading-icon" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SIconPreloaderDark from './icons/SIconPreloaderDark'
import SGridActionLink from './SGridActionLink'
import SGridActionSingle from './SGridActionSingle'
import SGridActionMulti from './SGridActionMulti'

export default {
  components: {
    SIconPreloaderDark
  },

  props: {
    primaryKey: { type: String, default: 'id' },
    records: { type: Array, required: true },
    actions: { type: [String, Object, Array], default: null },
    clickable: { type: Boolean, default: true },
    loading: { type: Boolean, default: false }
  },

  computed: {
    actionComponent () {
      if (typeof this.actions === 'string') {
        return SGridActionLink
      }

      if (Array.isArray(this.actions)) {
        return SGridActionMulti
      }

      return SGridActionSingle
    }
  },

  methods: {
    handleClick (record) {
      this.clickable && this.$emit('click', record)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SGrid {
  margin: -8px -8px -16px;
  min-width: 100%;
  overflow: hidden;
  overflow-x: auto;
}

.wrapper {
  display: inline-flex;
  flex-direction: column;
  padding: 8px 8px 16px;
  min-width: 100%;
}

.container {
  display: inline-flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: var(--c-white);
  box-shadow: var(--shadow-depth-1);
}

.columns {
  display: inline-flex;
}

.columns-row {
  display: inline-flex;
  padding: 0 16px;

  .cell {
    flex-grow: 1;
    flex-shrink: 0;
    padding: 16px 16px 12px;
    font-size: 12px;
    font-weight: 700;
    color: var(--c-text-light-2);
  }
}

.body {
  position: relative;
  border-top: 1px solid var(--c-divider-lighter);

  .body-records {
    transition: opacity .25s;
  }

  .body-records.loading {
    opacity: 0;
  }

  .row {
    display: flex;
    border-top: 1px solid var(--c-divider-lighter);
    padding: 22px 16px 21px;
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

  .cell {
    flex-shrink: 0;
    margin: 0;
    padding: 0 16px;
    line-height: 20px;
    font-size: 14px;
    color: var(--c-text-light-1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
      text-decoration: underline;
      transition: color .25s;

      &:hover {
        color: var(--c-gray);
      }
    }
  }

  .cell-main {
    margin: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cell-sub {
    margin: 0;
    width: 100%;
    font-size: 12px;
    color: var(--c-gray);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a:hover {
      color: var(--c-black);
    }
  }

  .actions {
    flex-grow: 1;
    height: 100%;
  }
}

.body-loading {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity .25s, transform .25s;
}

.body-loading.fade-enter,
.body-loading.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(.8);
}

.body-loading-icon {
  width: 48px;
  height: 48px;
}
</style>
