import { onMounted } from '@nuxtjs/composition-api'

export function useAnchors() {
  onMounted(() => {
    window.addEventListener('click', (e) => {
      const link = (e.target as Element).closest('a')

      if (link) {
        const { pathname, hash } = link
        const currentUrl = window.location

        if (hash && pathname === currentUrl.pathname) {
          e.preventDefault()
          scrollTo(hash)
        }
      }
    }, { capture: true })
  })
}

function scrollTo(hash: string) {
  const pageOffset = (document.querySelector('.TheHeader') as HTMLElement).offsetHeight
  const target: HTMLElement | null = document.querySelector(decodeURIComponent(hash))

  if (target) {
    const targetTop = target.offsetTop - pageOffset + (
      /^h[1-6]$/i.test(target.nodeName)
        ? parseInt(window.getComputedStyle(target).marginTop)
        : 0
    )

    window.scrollTo({
      left: 0,
      top: targetTop,
      behavior: 'smooth'
    })
  }
}
