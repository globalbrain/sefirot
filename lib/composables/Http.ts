import { type Lang, useBrowserLang } from 'sefirot/composables/Lang'
import { Http, type HttpOptions } from 'sefirot/http/Http'

export interface HasLang {
  lang: Lang
}

export function useSetupHttp(): (user?: HasLang | null, options?: HttpOptions) => void {
  const browserLang = useBrowserLang()

  return (user, options = {}) => {
    Http.config({
      lang: user?.lang ?? browserLang,
      ...options
    })
  }
}
