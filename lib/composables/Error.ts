/**
 * Adapted from
 * @see https://github.com/vuejs/core/blob/76c9c742e9b045d1342f5952866972498e59f00b/packages/runtime-core/src/component.ts
 * @see https://github.com/vuejs/core/blob/bc37258caa2f6f67f4554ab8587aca3798d92124/packages/runtime-core/src/warning.ts
 * @see https://github.com/getsentry/sentry-javascript/blob/2cfb0ef3fa5c40f90c317267a4d10b969994d021/packages/vue/src/errorhandler.ts
 *
 * Original licenses:
 *
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 *
 * (c) 2019 Sentry (https://sentry.io) and individual contributors
 * @license MIT
 */

import * as Sentry from '@sentry/browser'
import { pauseTracking, resetTracking } from '@vue/reactivity'
import {
  type ComponentInternalInstance,
  type ComponentOptions,
  type ComponentPublicInstance,
  type ConcreteComponent,
  type MaybeRefOrGetter,
  type VNode,
  toValue
} from 'vue'
import { useError } from '../stores/Error'
import { isFunction } from '../support/Utils'

export interface User {
  [key: string]: any
  id?: string | number
  ip_address?: string
  email?: string
  username?: string
}

type TraceEntry = { vnode: VNode; recurseCount: number }

type ComponentTraceStack = TraceEntry[]

const classifyRE = /(?:^|[-_])(\w)/g
function classify(str: string): string {
  return str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, '')
}

function getComponentName(Component: ConcreteComponent): string | undefined {
  return isFunction(Component)
    ? Component.displayName || Component.name
    : Component.name || Component.__name
}

function formatComponentName(instance: ComponentInternalInstance | null): string {
  if (!instance) {
    return 'Anonymous'
  }

  const Component = instance.type
  const isRoot = instance.parent == null

  let name = getComponentName(Component)
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/)
    if (match) {
      name = match[1]
    }
  }

  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry: Record<string, unknown> | undefined) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key
        }
      }
    }
    name
      = inferFromRegistry(
        // @ts-expect-error internal api
        instance.components || (instance.parent.type as ComponentOptions).components
      ) || inferFromRegistry(instance.appContext.components)
  }

  return name ? classify(name) : isRoot ? 'App' : 'Anonymous'
}

function getComponentTrace(currentVNode: VNode | null): ComponentTraceStack {
  if (!currentVNode) {
    return []
  }

  const normalizedStack: ComponentTraceStack = []

  while (currentVNode) {
    const last = normalizedStack[0]
    if (last && last.vnode === currentVNode) {
      last.recurseCount++
    } else {
      normalizedStack.push({ vnode: currentVNode, recurseCount: 0 })
    }
    const parentInstance: ComponentInternalInstance | null
      = currentVNode.component && currentVNode.component.parent
    currentVNode = parentInstance && parentInstance.vnode
  }

  return normalizedStack
}

function formatTrace(instance: ComponentInternalInstance | null): string {
  return getComponentTrace(instance && instance.vnode)
    .map(formatTraceEntry)
    .join('\n')
}

function formatTraceEntry({ vnode, recurseCount }: TraceEntry): string {
  return `at <${formatComponentName(vnode.component)}${
    vnode.props ? ` ${formatProps(vnode.props)}` : ''
  }>${
    recurseCount > 0 ? ` ... (${recurseCount} recursive call${recurseCount > 1 ? 's' : ''})` : ''
  }`
}

function formatProps(props: Record<string, unknown>): string {
  return Object.keys(props)
    .map((key) => {
      let value = props[key]
      if (typeof value === 'string') {
        value = JSON.stringify(value)
        return `${key}=${value}`
      } else if (typeof value === 'function') {
        return `:${key}="fn${value.name ? `<${value.name}>` : ''}"`
      } else if (typeof value !== 'object' || value === null) {
        return `:${key}="${String(value)}"`
      } else {
        return `${key}="..."`
      }
    })
    .join(' ')
}

export function useErrorHandler({
  dsn,
  environment,
  user
}: {
  dsn: string
  environment: string
  user?: MaybeRefOrGetter<User | null>
}) {
  const { setError } = useError()

  const enabled = !!dsn && import.meta.env.PROD

  // No need to manually report these errors as they are automatically
  // captured by Sentry. And skip registering these in SSR. We can't use
  // onMounted because it's not available outside component lifecycle.
  if (typeof document !== 'undefined') {
    addEventListener('error', (event) => {
      setError(event.error)
    })
    addEventListener('unhandledrejection', (event) => {
      setError(event.reason)
    })
  }

  if (enabled) {
    Sentry.init({
      dsn,
      environment,
      ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications'
      ]
    })
  }

  return function errorHandler(
    error: any,
    instance: ComponentPublicInstance | null = null,
    info: string = ''
  ) {
    setError(error)

    pauseTracking()

    if (enabled) {
      const userValue = toValue(user) || null

      if (![403, 404].includes(error?.cause?.statusCode)) {
        const $ = instance && instance.$
        const metadata = $ && {
          componentName: formatComponentName($),
          lifecycleHook: info,
          trace: formatTrace($),
          propsData: $ && $.props
        }

        setTimeout(() => {
          Sentry.withScope((scope) => {
            scope.setUser(userValue)
            scope.setContext('vue', metadata)
            Sentry.captureException(error)
          })
        })
      }
    }

    resetTracking()
  }
}
