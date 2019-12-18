<template>
  <div class="TheHeaderNavScreen" :class="classes">
    <div class="container">
      <ul class="list">
        <li class="item">
          <NuxtLink class="link" to="/guide" @click.native="$emit('close')">Guide</NuxtLink>
        </li>
        <li class="item">
          <NuxtLink class="link" to="/components" @click.native="$emit('close')">Components</NuxtLink>
        </li>
        <li class="item">
          <a class="link" href="https://github.com/globalbrain/sefirot" target="_blank">GitHub</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed, watch } from '@vue/composition-api'

export default createComponent({
  props: {
    open: { type: Boolean, required: true }
  },

  setup (props) {
    const active = ref(false)
    const on = ref(false)

    const classes = computed(() => {
      return {
        active: active.value,
        on: on.value
      }
    })

    watch(() => props.open, (value) => {
      value ? show() : hide()
    })

    function show (): void {
      active.value = true
      setTimeout(() => { on.value = true }, 50)
    }

    function hide (): void {
      on.value = false
      setTimeout(() => { active.value = false }, 50)
    }

    return {
      active,
      on,
      classes
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheHeaderNavScreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: none;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: var(--c-white);
  transition: opacity .25s;
}

.TheHeaderNavScreen.active {
  display: block;

  @media (min-width: 512px) {
    display: none;
  }
}

.TheHeaderNavScreen.on {
  opacity: 1;

  .search,
  .socials,
  .copyright {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  padding: 104px 24px;

  @media (min-width: 375px) {
    padding: 104px 32px;
  }
}

.item {
  & + & {
    padding-top: 16px;
  }
}

.link {
  font-size: 20px;
  font-family: var(--font-family-primary);
  font-weight: 500;
  transition: color .25s;

  &:hover {
    color: var(--c-gray);
  }
}
</style>
