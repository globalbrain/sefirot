import { useGet } from '../../../composables/Api'
import { useTrans } from '../../../composables/Lang'
import { useSnackbars } from '../../../stores/Snackbars'
import { type FileDownloader } from '../FileDownloader'
import { isAuthError } from '../validation/ServerErrors'

export function useFileDownloader(): FileDownloader {
  const snackbars = useSnackbars()

  const { t } = useTrans({
    en: { download_error: 'We couldn’t download this file. Please try again.' },
    ja: { download_error: 'ファイルをダウンロードできませんでした。もう一度お試しください。' }
  })

  const { execute: fileDownloader } = useGet<any, [url: string]>(async (http, url) => {
    return http.download(url)
  })

  // The click binding (e.g. SDescFile's `@click`) doesn't await the returned
  // promise, so a failed download would otherwise be an unhandled rejection with
  // no feedback — the click just appears to do nothing. Catch and surface a
  // snackbar. The response is a blob, so the server's message isn't readily
  // decodable here; generic copy is the right level.
  return async (url) => {
    try {
      return await fileDownloader(url)
    } catch (e) {
      // Let auth / session-expiry failures (401 / 419) propagate to the app's
      // error flow so it can prompt re-authentication — the click path doesn't
      // await this, so the rejection reaches the global handler as it did before.
      if (isAuthError(e)) {
        throw e
      }
      snackbars.push({ mode: 'danger', text: t.download_error })
    }
  }
}
