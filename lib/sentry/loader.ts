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
let sentry: MakeVoid<Pick<typeof import('@sentry/browser'), (typeof defer)[number]>> = {} as any
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
  sentry[f] = (...args: any[]) => {
    enqueue({ a: args, f })
  }
}

_window?.addEventListener('error', onError)
_window?.addEventListener('unhandledrejection', onUnhandledRejection)

export const Sentry = {
  init: (...args: Parameters<typeof sentry.init>) => sentry.init(...args),
  addBreadcrumb: (...args: Parameters<typeof sentry.addBreadcrumb>) => sentry.addBreadcrumb(...args),
  captureMessage: (...args: Parameters<typeof sentry.captureMessage>) => sentry.captureMessage(...args),
  captureException: (...args: Parameters<typeof sentry.captureException>) => sentry.captureException(...args),
  captureEvent: (...args: Parameters<typeof sentry.captureEvent>) => sentry.captureEvent(...args),
  withScope: (...args: Parameters<typeof sentry.withScope>) => sentry.withScope(...args),
  showReportDialog: (...args: Parameters<typeof sentry.showReportDialog>) => sentry.showReportDialog(...args)
}
