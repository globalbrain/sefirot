import { type Lang, useBrowserLang } from 'sefirot/composables/Lang'
import { type HttpOptions, useHttpConfig } from 'sefirot/stores/HttpConfig'

export interface HasLang {
  lang: Lang
}

export function useSetupHttp(): (user?: HasLang | null, options?: HttpOptions) => void {
  const browserLang = useBrowserLang()
  const httpConfig = useHttpConfig()

  return (user, options = {}) => {
    httpConfig.apply({
      lang: user?.lang ?? browserLang,
      ...options
    })
  }
}
