<template>
  <div class="TheHeaderNavScreen" :class="classes">
    <div class="container">
      <ul class="list">
        <li class="item">
          <NuxtLink class="link" to="/components" @click.native="$emit('close')">Components</NuxtLink>
        </li>
        <li class="item">
          <NuxtLink class="link" to="/mixins" @click.native="$emit('close')">Mixins</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, required: true }
  },

  data () {
    return {
      active: false,
      on: false
    }
  },

  computed: {
    classes () {
      return {
        active: this.active,
        on: this.on
      }
    }
  },

  watch: {
    open (value) {
      value ? this.show() : this.hide()
    }
  },

  methods: {
    show () {
      this.active = true

      setTimeout(() => { this.on = true }, 50)
    },

    hide () {
      this.on = false

      setTimeout(() => { this.active = false }, 250)
    }
  }
}
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
  transition: color .25s;

  &:hover {
    color: var(--c-gray);
  }
}
</style>
