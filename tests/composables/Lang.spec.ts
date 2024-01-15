import { SefirotLangKey, useLang, useTrans } from 'sefirot/composables/Lang'
import { setup } from 'tests/Utils'

describe('composables/Lang', () => {
  describe('useLang', () => {
    test('it returns the default language', () => {
      const vm = setup(() => ({
        lang: useLang()
      }))

      expect(vm.lang).toBe('en')
    })

    test('it returns the language provided by provideLang', () => {
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
    test('it returns the current translations', () => {
      const vm = setup(() => ({
        trans: useTrans({
          en: { msg: 'English' },
          ja: { msg: 'Japanese' },
          vi: { msg: 'Vietnamese' }
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
