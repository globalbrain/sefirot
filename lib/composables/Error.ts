/**
 * Adapted from
 * @see https://github.com/vuejs/core/blob/1755ac0a108ba3486bd8397e56d3bdcd69196594/packages/runtime-core/src/component.ts
 * @see https://github.com/vuejs/core/blob/ac9e7e8bfa55432a73a10864805fdf48bda2ff73/packages/runtime-core/src/warning.ts
 * @see https://github.com/getsentry/sentry-javascript/blob/04711c20246f7cdaac2305286fec783ab1859a18/packages/vue/src/errorhandler.ts
 * @see https://github.com/vercel/ai/blob/d544886d4f61440bacd6e44c86144bfac7c98282/packages/provider-utils/src/get-error-message.ts
 *
 * Original licenses:
 *
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 *
 * (c) 2012-2024 Functional Software, Inc. dba Sentry
 * @license MIT
 *
 * (c) 2023 Vercel, Inc.
 * @license Apache-2.0
 */

import * as Sentry from '@sentry/browser'
import { createSentryPiniaPlugin } from '@sentry/vue'
import { pauseTracking, resetTracking } from '@vue/reactivity'
import { getActivePinia } from 'pinia'
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
import { isError } from '../support/Utils'

export interface User {
  id?: string | number
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
  return typeof Component === 'function'
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
  return `at <${formatComponentName(vnode.component)}${vnode.props ? ` ${formatProps(vnode.props)}` : ''}>\
${recurseCount > 0 ? ` ... (${recurseCount} recursive call${recurseCount > 1 ? 's' : ''})` : ''}`
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

const ignoreErrors = [
  /Network Error/,
  /Non-Error (?:exception|promise rejection) captured/,
  /ResizeObserver loop/,
  /Can't find variable: gmo/,
  /\[Cloudflare Turnstile\] Error: (?:10[2-46]|1106[02]|[36]00)/
]

export function useErrorHandler({
  dsn,
  environment,
  user
}: {
  dsn?: string
  environment?: string
  user?: MaybeRefOrGetter<User | null>
}) {
  const error = useError()

  function set(value: any) {
    const message = getErrorMessage(value)
    if (ignoreErrors.some((ignore) => ignore.test(message))) {
      return
    }
    error.set(value)
  }

  const enabled = !!dsn && import.meta.env.PROD

  // No need to manually report these errors as they are automatically
  // captured by Sentry. And skip registering these in SSR. We can't use
  // onMounted because it's not available outside component lifecycle.
  if (typeof document !== 'undefined') {
    addEventListener('error', (event) => {
      set(event.error)
    })
    addEventListener('unhandledrejection', (event) => {
      set(event.reason)
    })
  }

  if (enabled) {
    Sentry.init({ dsn, environment, ignoreErrors })
    getActivePinia()?.use(createSentryPiniaPlugin())
  }

  return function errorHandler(
    e: any,
    instance: ComponentPublicInstance | null = null,
    info: string = ''
  ) {
    if (enabled) {
      pauseTracking()

      let userValue = toValue(user) || null
      if (!userValue?.id && !userValue?.email && !userValue?.username) {
        userValue = null
      }

      if (![403, 404].includes(e?.cause?.statusCode)) {
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
            Sentry.captureException(e)
          })
        })
      }

      resetTracking()
    } else {
      console.error(e)
    }

    set(e)
  }
}

function getErrorMessage(error: unknown | undefined) {
  if (error == null) {
    return 'unknown error'
  }

  if (typeof error === 'string') {
    return error
  }

  if (isError(error)) {
    return error.message
  }

  return JSON.stringify(error)
}
