import { inject, provide } from 'vue'

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

export const SefirotLangKey = 'sefirot-lang-key'

export function useSetupLang(): (user?: HasLang | null) => void {
  const browserLang = useBrowserLang()

  return (user) => {
    provideLang(user?.lang ?? browserLang)
  }
}

export function provideLang(lang: Lang) {
  provide(SefirotLangKey, lang)
}

export function useLang(): Lang {
  // Doing `||` check here because for some reason it doesn't return
  // the default value in tests but becomes `undefined`.
  return inject(SefirotLangKey, 'en') || 'en'
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
