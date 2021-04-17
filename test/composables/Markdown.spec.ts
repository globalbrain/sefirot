import { useMarkdown } from 'sefirot/composables/Markdown'

describe('useMarkdown', () => {
  it('should apply user config', () => {
    const config = jest.fn()

    useMarkdown({ config })

    expect(config).toHaveBeenCalled()
  })
})
