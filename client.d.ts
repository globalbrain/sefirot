declare module '~icons/*' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'

  const component: FunctionalComponent<SVGAttributes>
  export default component
}

// this file contains public types which are exposed to external modules
