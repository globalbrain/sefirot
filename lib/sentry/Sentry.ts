/**
 * Adapted from @vue/runtime-core v3.4.21
 * @see https://github.com/vuejs/core/blob/ab59bedae4e5e40b28804d88a51305b236d4a873/packages/runtime-core/src/component.ts
 * @see https://github.com/vuejs/core/blob/ab59bedae4e5e40b28804d88a51305b236d4a873/packages/runtime-core/src/warning.ts
 *
 * Original license:
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/

import { consoleSandbox } from '@sentry/utils'
import {
  type ComponentInternalInstance,
  type ComponentOptions,
  type ComponentPublicInstance,
  type ConcreteComponent,
  type VNode,
  isRef,
  toRaw
} from 'vue'
import { isFunction, isString } from '../support/Utils'
import { Sentry } from './loader'

export * from './loader'

type Data = Record<string, unknown>

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
  }>${recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ''}`
}

function formatProps(props: Data): string {
  const res: string[] = []
  const keys = Object.keys(props)
  keys.slice(0, 3).forEach((key) => {
    res.push(formatProp(key, props[key]))
  })
  if (keys.length > 3) {
    res.push(' ...')
  }
  return res.join(' ')
}

function formatProp(key: string, value: unknown): string
function formatProp(key: string, value: unknown, raw: true): unknown
function formatProp(key: string, value: unknown, raw?: boolean): unknown {
  if (isString(value)) {
    value = JSON.stringify(value)
    return raw ? value : `${key}=${value}`
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : `${key}=${value}`
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true)
    return raw ? value : `${key}=Ref<${value}>`
  } else if (isFunction(value)) {
    return `${key}=fn${value.name ? `<${value.name}>` : ''}`
  } else {
    value = toRaw(value)
    return raw ? value : `${key}=${value}`
  }
}

// Adapted from https://github.com/getsentry/sentry-javascript/blob/0b8540fd0f9dbd436aba4ec705570d21c09c4cdd/packages/vue/src/errorhandler.ts
export function errorHandler(
  err: unknown,
  instance: ComponentPublicInstance | null = null,
  info: string = ''
) {
  const $ = instance && instance.$
  const metadata = {
    componentName: formatComponentName($),
    lifecycleHook: info,
    trace: formatTrace($),
    propsData: $ && $.props
  }

  setTimeout(() => {
    Sentry.captureException(err, {
      captureContext: { contexts: { vue: metadata } },
      mechanism: { handled: false }
    })
  })

  if (typeof console !== 'undefined') {
    consoleSandbox(() => {
      console.error(err)
    })
  }
}
