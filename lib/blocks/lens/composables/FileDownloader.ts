import { useGet } from '../../../composables/Api'
import { type FileDownloader } from '../FileDownloader'

export function useFileDownloader(): FileDownloader {
  const { execute: fileDownloader } = useGet<any, [url: string]>(async (http, url) => {
    return http.download(url)
  })

  return fileDownloader
}
