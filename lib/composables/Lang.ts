import { type InjectionKey, getCurrentInstance, inject } from 'vue'

export type Lang = 'en' | 'ja'

export interface Trans<T> {
  t: T
}

export interface TransMessages<T> {
  en: T
  ja: T
}

export const SefirotLangKey: InjectionKey<Lang> = Symbol.for('sefirot-lang-key')

export function provideLang(lang: Lang) {
  getCurrentInstance()!.appContext.app._context.provides[SefirotLangKey] = lang
}

export function useLang(): Lang {
  return inject(SefirotLangKey, 'en')
}

export function getBrowserLang(): Lang {
  const lang = String(globalThis.navigator?.language || 'en')
  return lang.split('-')[0] === 'ja' ? 'ja' : 'en'
}

/** @deprecated use `getBrowserLang` instead */
export function useBrowserLang(): Lang {
  return getBrowserLang()
}

export function useTrans<T>(messages: TransMessages<T>): Trans<T> {
  const lang = useLang()

  const t = messages[lang]

  return {
    t
  }
}
