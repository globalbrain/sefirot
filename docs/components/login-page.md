# SLoginPage <Badge text="3.8.0" />

`<SLoginPage>` is the component to render login page used across GB products.

## Import

```ts
import SLoginPage from '@globalbrain/sefirot/lib/components/SLoginPage.vue'
```

## Usage

`<SLoginPage>` takes 4 props, and you must pass all of them. When using this component, the page should only contain this component and should not be used for anything other than the login screen.

```vue-html
<SLoginPage
  cover="<path-to-cover-image>"
  :cover-title="{
    text: 'Cover Title',
    link: 'https://example.com'
  }"
  :cover-photographer="{
    text: 'Photographer Name',
    link: 'https://example.com'
  }"
  :actions="[
    { type: 'google', onClick: () => {} }
  ]"
/>
```

## Props

```ts
interface Props {
  cover: string
  coverTitle: CoverTitle
  coverPhotographer: CoverPhotographer
  actions: Action[]
}

interface CoverTitle {
  text: string
  link: string
}

interface CoverPhotographer {
  text: string
  link: string
}

type Action = ActionPassword | ActionSocial

interface ActionPassword {
  type: 'password'
  onSubmit(email: string, password: string): Promise<void>
}

interface ActionSocial {
  type: 'google'
  onClick(): Promise<void>
}
```

### `:cover`

This prop is the URL of cover image, which is used as background image.

```ts
interface Props {
  cover: string
}
```

### `:cover-title`

This prop is an object whose `text` is the title of the cover image and `link` is its link.

```ts
interface Props {
  coverTitle: CoverTitle
}

interface CoverTitle {
  text: string
  link: string
}
```

### `:cover-photographer`

This prop is an object whose `text` is the name of photographer of the cover image and `link` is its link.

```ts
interface Props {
  coverPhotographer: CoverPhotographer
}

interface CoverPhotographer {
  text: string
  link: string
}
```

### `:actions`

This prop is an array of login buttons, where `type` is auth provider.

```ts
interface Props {
  actions: Action[]
}

type Action = ActionPassword | ActionSocial

interface ActionPassword {
  type: 'password'
  onSubmit(email: string, password: string): Promise<void>
}

interface ActionSocial {
  type: 'google'
  onClick(): Promise<void>
}
```

When selecting `type: 'password'`, it will open a email/password form modal when a user clicks the action button, and `onSubmit` will be called when the user submits the form.

You can await for a promise to show a loading spinner while the form is being submitted. If you return `false`, the form will not close and the error message will be shown.

```ts
const actions = [
  {
    type: 'password',
    async onSubmit(email, password) {
      // The email/password dialog will show loading spinner
      // while this promise is being awaited
      const result = await login(email, password)

      // If the promise returns false, the dialog will not close
      // and the error message will be shown.
      return result
    }
  }
]
```
