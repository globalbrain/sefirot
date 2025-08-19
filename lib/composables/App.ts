import { type HttpOptions, useHttpConfig } from '../stores/HttpConfig'
import { type HasLang, getBrowserLang, provideLang } from './Lang'
import { type HasTheme, useTheme } from './Theme'

export interface SetupAppUser extends HasLang, HasTheme {}

export interface SetupAppOptions {
  http?: HttpOptions
}

export function useSetupApp(): (user?: Partial<SetupAppUser> | null, options?: SetupAppOptions) => void {
  const theme = useTheme()
  const httpConfig = useHttpConfig()

  return (user, options) => {
    const lang = user?.lang ?? getBrowserLang()
    provideLang(lang)
    if (user?.theme) { theme.value = user.theme }
    httpConfig.apply({ lang, ...options?.http })
  }
}
