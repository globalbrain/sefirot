import { type InjectionKey, getCurrentInstance, inject } from 'vue'

export type Lang = 'en' | 'ja'

export interface Trans<T> {
  t: T
}

export interface TransMessages<T> {
  en: T
  ja: T
}

export interface HasLang {
  lang: Lang
}

export const SefirotLangKey: InjectionKey<Lang> = Symbol.for('sefirot-lang-key')

export function useSetupLang(): (user?: HasLang | null) => void {
  const browserLang = useBrowserLang()

  return (user) => {
    provideLang(user?.lang ?? browserLang)
  }
}

export function provideLang(lang: Lang) {
  getCurrentInstance()?.appContext.app.provide(SefirotLangKey, lang)
}

export function useLang(): Lang {
  return inject(SefirotLangKey, 'en')
}

export function useBrowserLang(): Lang {
  const lang = navigator.language

  return lang.split('-')[0] === 'ja' ? 'ja' : 'en'
}

export function useTrans<T>(messages: TransMessages<T>): Trans<T> {
  const lang = useLang()

  const t = messages[lang]

  return {
    t
  }
}
