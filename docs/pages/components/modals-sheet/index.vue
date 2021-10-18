<template lang="md">
# Modals: Sheet

Sheets display various content on the modal screen to users.

<StorySheetShowcase />

## Description

Sheets are perfect for displaying various contents on a modal screen. You may display a description of some features, simple form input to update something, or give users more detailed application feedback such as successes or errors.

The difference between Sheet and [Dialog](/components/modals-dialog) is that Dialog should always only ever contain single paragraph text as content. In other words, Dialog should be used for very very simple feedbacks. If you find yourself wanting to use more than one paragraph of text in Dialog, use Sheet instead.

## How to use

To create a new Sheet, first, define your component in a dedicated SFC file. A Sheet should be defined using multiple combinations of predefined components. Wrap everything in `SSheet` component, and add child components such as `SSheetHeader` or `SSheetMedium`. You may use a mixin to load all available components at once.

```vue
<template>
  <SSheet #default="{ close }">
    <SSheetHeader>
      <SSheetHeaderTitle>
        Sheet title
      </SSheetHeaderTitle>
    </SSheetHeader>

    <SSheetMedium>
      <p>Lorem ipsum...</p>
    </SSheetMedium>

    <SSheetFooter>
      <SSheetFooterActions>
        <SSheetFooterAction type="mute" label="CANCEL" @click="close" />
      </SSheetFooterActions>
    </SSheetFooter>
  </SSheet>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Sheet from '@globalbrain/sefirot/lib/mixins/Sheet'

export default defineComponent({
  mixins: [Sheet()]
})
</script>
```

As you can see, we use many child components within `SSheet`. You may learn more about individual child components in its dedicated sections so please read the doc further. Available components are listed below.

- `SSheet`
- `SSheetHeader`
- `SSheetHeaderTitle`
- `SSheetMedium`
- `SSheetFooter`
- `SSheetFooterActions`
- `SSheetFooterAction`

Let's call the component we've created `ExampleSheet.vue`. To open this Sheet in modal, create another component that uses a Modal composable to open the Sheet as a Modal.

```vue
<template>
  <SButton label="OPEN SHEET" @click="open" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useModal } from '@globalbrain/sefirot/lib/composables/Modal'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import ExampleSheet from './ExampleSheet.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    const sheet = useModal(ExampleSheet)

    function open() {
      sheet.open()
    }

    return {
      open
    }
  }
})
</script>
```

When user clicks the "OPEN SHEET" button on this component, the Sheet will open as a modal screen.

## Mixin

Sefirot provides a mixin to load all available Sheet related components.

```ts
import { defineComponent } from '@vue/composition-api'
import Sheet from '@globalbrain/sefirot/lib/mixins/Sheet'

export default defineComponent({
  mixins: [Sheet()]
})
```

The only thing this mixin does is to define components, and nothing more. If you don't want to use the mixin, you can simply import individual components. The following code is equivalant to using the mixin.

```ts
import { defineComponent } from '@vue/composition-api'
import SSheet from '@globalbrains/sefirot/lib/components/SSheet.vue'
import SSheetHeader from '@globalbrains/sefirot/lib/components/SSheetHeader.vue'
import SSheetHeaderTitle from '@globalbrains/sefirot/lib/components/SSheetHeaderTitle.vue'
import SSheetMedium from '@globalbrains/sefirot/lib/components/SSheetMedium.vue'
...

export default defineComponent({
  components: {
    SSheet,
    SSheetHeader,
    SSheetHeaderTitle,
    SSheetMedium,
    ...
  }
})
```

## Components

We can customize the various aspect of the Sheet by combining child components. In this section, we'll walk through each component and its options.

### SSheet

This is the base component for the Sheet. Every other components must be nested under the SSheet component.

```vue
<template>
  <SSheet>
    ...
  </SSheet>
</template>
```

You may pass in plain content as a default `slot`. The content will be displayed as is. You may style the content as however you like.

```vue
<template>
  <SSheet>
    <p class="title">This is title.</p>
  </SSheet>
</template>

<style scoped>
.title {
  font-weight: 700;
}
</style>
```

The `SSheet` comes with 3 different sizes. `small`, `medium`, and `large`. You can pass the `size` prop to change the Sheet size. The default is `medium`.

```vue
<template>
  <SSheet size="large">
    ...
  </SSheet>
</template>
```

The `SSheet` exposes scoped slot `close` function to close the Sheet. You can execute this function to close the currently open Sheet.

```vue
<template>
  <SSheet #default="{ close }">
    <button @click="close">CLOSE SHEET</button>
  </SSheet>
</template>
```

### SSheetHeader

To add "header" to the Sheet, you may use `SSheetHeader` component. You can use `SSheetTitle` component to add title text to the header.

```vue
<SSheet>
  <SSheetHeader>
    <SSheetHeaderTitle>
      Sheet title
    </SSheetHeaderTitle>
  </SSheetHeader>
</SSheet>
```

The header component will by default show "close" button, which closes the current Sheet when clicked. You may hide this button by passing `:closable="false"` prop.

```vue
<SSheet>
  <SSheetHeader :closable="false">
    ...
  </SSheetHeader>
</SSheet>
```

### SSheetMedium

The `SSheetMeidum` is a convenient component that provides basic stylings for its content. For example, when authoring messages, you might want to style `p`, `ul`, or `strong` tags. This component will apply predefined styles to those basic tags.

```vue
<SSheet>
  <SSheetMedium>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.</p>

    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </SSheetMedium>
</SSheet>
```

With the above code, the `p` tag will have a dedicated styles. See below to see all predefined tags.

- `h1`
- `p`

### SSheetFooter

Similar to `SSheetHeader`, `SSheetFooter` adds "footer" section to the Sheet.

```vue
<SSheet>
  <SSheetFooter>
    ...
  </SSheetFooter>
</SSheet>
```

You may list action buttons to the footer by using `SSheetActions` and `SSheetAction` components.

```vue
<SSheet #default="{ close }">
  <SSheetFooter>
    <SSheetFooterActions>
      <SSheetFooterAction type="mute" label="CANCEL" @click="close" />
      <SSheetFooterAction type="primary" mode="info" label="CLOSE SHEET" @click="close" />
    </SSheetFooterActions>
  </SSheetFooter>
</SSheet>
```

The `SSheetActions` is just a wrapper for `SSheetAction` to correctly style the nested buttons. The `SSheetAction` wraps [Button](/components/buttons) component with fixed "size". You may pass `type`, `mode`, and `label` props to configure the button.

The size of the button is not configurable in order to ensure it has correct style used in Sheet component.
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StorySheetShowcase from '@/components/sheet/StorySheetShowcase.vue'

export default defineComponent({
  components: {
    StorySheetShowcase
  },

  scrollToTop: true,

  head: {
    title: 'Modals: Sheet'
  }
})
</script>
