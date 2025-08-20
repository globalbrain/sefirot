import { type HttpOptions, useHttpConfig } from '../stores/HttpConfig'
import { type Lang, getBrowserLang, provideLang } from './Lang'
import { type Theme, useTheme } from './Theme'

export interface SetupAppUser {
  lang?: Lang
  theme?: Theme
}

export interface SetupAppOptions {
  http?: HttpOptions
}

export function useSetupApp(): (user?: SetupAppUser | null, options?: SetupAppOptions) => void {
  const theme = useTheme()
  const httpConfig = useHttpConfig()

  return (user, options) => {
    const lang = user?.lang ?? getBrowserLang()
    provideLang(lang)
    if (user?.theme) { theme.value = user.theme }
    httpConfig.apply({ lang, ...options?.http })
  }
}
