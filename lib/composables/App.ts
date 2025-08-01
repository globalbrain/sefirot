import { type HttpOptions } from 'sefirot/stores/HttpConfig'
import { useSetupHttp } from './Http'
import { type HasLang, useSetupLang } from './Lang'
import { type HasTheme, useSetupTheme } from './Theme'

export interface SetupAppUser extends HasLang, HasTheme {}

export interface SetupAppOptions {
  http?: HttpOptions
}

export function useSetupApp(): (user?: SetupAppUser | null, options?: SetupAppOptions) => void {
  const setupLang = useSetupLang()
  const setupTheme = useSetupTheme()
  const setupHttp = useSetupHttp()

  return (user, options) => {
    setupLang(user)
    setupTheme(user)
    setupHttp(user, options?.http)
  }
}
