import { mount } from '@vue/test-utils'
import { type Lang, SefirotLangKey, useLang, useTrans } from 'sefirot/composables/Lang'

describe('composables/Lang', () => {
  describe('useLang', () => {
    test('it returns the default language', () => {
      const lang = useLang()
      expect(lang).toBe('en')
    })

    test('it returns the language provided by provideLang', () => {
      const c = createComponent(() => ({
        lang: useLang()
      }))

      const vm = createWrapperWithLang('ja', c)

      expect(vm.lang).toBe('ja')
    })
  })

  describe('useTrans', () => {
    test('it returns the current translations', () => {
      const c = createComponent(() => ({
        trans: useTrans({
          en: { msg: 'English' },
          ja: { msg: 'Japanese' }
        })
      }))

      const vm = createWrapperWithLang('ja', c)

      expect(vm.trans.t.msg).toBe('Japanese')
    })
  })
})

function createComponent(setup: () => any): any {
  return {
    setup,
    template: '<div />'
  }
}

function createWrapperWithLang(lang: Lang, component: any): any {
  const wrapper = mount(component, {
    global: {
      provide: {
        [SefirotLangKey]: 'ja'
      }
    }
  })

  return wrapper.vm
}
