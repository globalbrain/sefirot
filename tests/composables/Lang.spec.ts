import { SefirotLangKey, useLang, useTrans } from 'sefirot/composables/Lang'
import { setup } from 'tests/Utils'

describe('composables/Lang', () => {
  describe('useLang', () => {
    it('returns the default language', () => {
      const vm = setup(() => ({
        lang: useLang()
      }))

      expect(vm.lang).toBe('en')
    })

    it('returns the language provided by provideLang', () => {
      const vm = setup(() => ({
        lang: useLang()
      }), {
        global: {
          provide: {
            [SefirotLangKey]: 'ja'
          }
        }
      })

      expect(vm.lang).toBe('ja')
    })
  })

  describe('useTrans', () => {
    it('returns the current translations', () => {
      const vm = setup(() => ({
        trans: useTrans({
          en: { msg: 'English' },
          ja: { msg: 'Japanese' }
        })
      }), {
        global: {
          provide: {
            [SefirotLangKey]: 'ja'
          }
        }
      })

      expect(vm.trans.t.msg).toBe('Japanese')
    })
  })
})
