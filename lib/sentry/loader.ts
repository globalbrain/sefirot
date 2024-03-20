/**
 * Adapted from
 * @see https://github.com/getsentry/sentry-javascript/blob/2014d6a9f51c9e5ef57577bf5701ddae2cbc02af/packages/browser/src/loader.js
 * @see https://github.com/getsentry/sentry/blob/48da227c4c6f3c551f6104fc3eec209f4431d73a/src/sentry/templates/sentry/js-sdk-loader.ts
 *
 * Original licenses:
 *
 * (c) 2019 Sentry (https://sentry.io) and individual contributors.
 * @license MIT
 *
 * (c) 2008-2024 Functional Software, Inc. dba Sentry
 * @license FSL-1.1-Apache-2.0
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type Scope } from '@sentry/types'

const _window = /* #__PURE__ */ typeof document !== 'undefined' ? window : undefined

const defer = [
  'init',
  'addBreadcrumb',
  'captureMessage',
  'captureException',
  'captureEvent',
  'withScope',
  'showReportDialog'
] as const

// eslint-disable-next-line @typescript-eslint/ban-types
type Simplify<T> = { [K in keyof T]: T[K] } & {}

type MakeVoid<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => any ? (...args: A) => void : T[K]
}

type ErrorQueueItem = { e: ErrorEvent }
type PromiseRejectionQueueItem = { p: PromiseRejectionEvent }
type FunctionQueueItem = { a: any[]; f: (typeof defer)[number] }
type QueueItem = ErrorQueueItem | PromiseRejectionQueueItem | FunctionQueueItem

function queueIsError(item: QueueItem): item is ErrorQueueItem {
  return 'e' in item
}

function queueIsPromiseRejection(item: QueueItem): item is PromiseRejectionQueueItem {
  return 'p' in item
}

function queueIsFunction(item: QueueItem): item is FunctionQueueItem {
  return 'f' in item
}

function onError(e: ErrorEvent) {
  enqueue({ e })
}

function onUnhandledRejection(p: PromiseRejectionEvent) {
  enqueue({ p })
}

function sdkIsLoaded() {
  const __sentry = (_window as any).__SENTRY__
  return !!(!(typeof __sentry === 'undefined') && __sentry.hub && __sentry.hub.getClient())
}

let started = false

let sentry: MakeVoid<
  Pick<typeof import('@sentry/browser'), Exclude<(typeof defer)[number], 'withScope'>>
> & {
  withScope(callback: (scope: Scope) => any): void
  withScope(scope: Scope | undefined, callback: (scope: Scope) => any): void
} = {} as any

const queue: QueueItem[] = []

function enqueue(item: QueueItem) {
  if (
    !started
    && (queueIsError(item)
      || queueIsPromiseRejection(item)
      || (queueIsFunction(item) && item.f.includes('capture'))
      || (queueIsFunction(item) && item.f.includes('showReportDialog')))
  ) {
    try {
      started = true

      import('@sentry/browser').then((mod) => {
        sentry = mod

        const originalInit = mod.init
        sentry.init = (config: any) => {
          _window?.removeEventListener('error', onError)
          _window?.removeEventListener('unhandledrejection', onUnhandledRejection)

          return originalInit(config)
        }

        setTimeout(() => {
          for (const item of queue) {
            if (queueIsFunction(item) && item.f === 'init') {
              sentry.init(...item.a)
            }
          }

          if (!sdkIsLoaded()) {
            sentry.init() // failsafe
          }

          const sentryPatchedErrorHandler = _window?.onerror
          const sentryPatchedUnhandledRejectionHandler = _window?.onunhandledrejection

          for (const item of queue) {
            if (queueIsFunction(item)) {
              if (item.f !== 'init') {
                // @ts-expect-error
                sentry[item.f](...item.a)
              }
            } else if (queueIsError(item) && sentryPatchedErrorHandler) {
              sentryPatchedErrorHandler.apply(_window, [item.e])
            } else if (queueIsPromiseRejection(item) && sentryPatchedUnhandledRejectionHandler) {
              sentryPatchedUnhandledRejectionHandler.apply(_window, [item.p])
            }
          }

          queue.length = 0 // gc
        })
      })
    } catch (e) {
      console.error(e)
    }
  }
  queue.push(item)
}

for (const f of defer) {
  sentry[f] = (...args) => {
    enqueue({ a: args, f })
  }
}

_window?.addEventListener('error', onError)
_window?.addEventListener('unhandledrejection', onUnhandledRejection)

export const Sentry: Simplify<typeof sentry> = {
  init: (...args) => sentry.init(...args),
  addBreadcrumb: (...args) => sentry.addBreadcrumb(...args),
  captureMessage: (...args) => sentry.captureMessage(...args),
  captureException: (...args) => sentry.captureException(...args),
  captureEvent: (...args) => sentry.captureEvent(...args), // @ts-expect-error
  withScope: (...args) => sentry.withScope(...args),
  showReportDialog: (...args) => sentry.showReportDialog(...args)
}
