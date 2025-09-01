import { getExtension } from 'sefirot/support/File'

describe('support/File', () => {
  describe('getExtension', () => {
    it('returns simple extension', () => {
      const file = f('example.txt')
      expect(getExtension(file)).toBe('txt')
    })

    it('normalizes to lowercase', () => {
      const file = f('report.PDF')
      expect(getExtension(file)).toBe('pdf')
    })

    it('handles filenames with multiple dots', () => {
      const file = f('my.photo.final.jpeg')
      expect(getExtension(file)).toBe('jpeg')
    })

    it('treats hidden files with no other dot as no extension', () => {
      const file = f('.gitignore')
      expect(getExtension(file)).toBe('')
    })

    it('allows hidden files with additional dot to have an extension', () => {
      const file = f('.env.local')
      expect(getExtension(file)).toBe('local')
    })

    it('returns \'\' when there is no dot', () => {
      const file = f('README')
      expect(getExtension(file)).toBe('')
    })

    it('ignores query-ish characters if present in odd filenames', () => {
      const file = f('weird.name.txt?cache=1')
      expect(getExtension(file)).toBe('txt')
    })

    it('strips ?query', () => {
      expect(getExtension(f('file.css?v=123.456'))).toBe('css')
    })

    it('strips #hash', () => {
      expect(getExtension(f('bundle.js#abc.def'))).toBe('js')
    })

    it('strips both ? and #', () => {
      expect(getExtension(f('img.jpeg?x=1.2#y=3.4'))).toBe('jpeg')
    })

    it('handles file:// with Windows drive', () => {
      expect(getExtension(f('file:///C:/Users/Alice/Doc/report.PDF'))).toBe('pdf')
    })

    it('treats percent-encoded dot literally', () => {
      expect(getExtension(f('image%2Ejpeg'))).toBe('')
    })

    it('handles Windows fakepath', () => {
      expect(getExtension(f('C:\\fakepath\\photo.JPG'))).toBe('jpg')
      expect(getExtension(f('C:\\fake.path\\photo'))).toBe('')
    })

    it('handles POSIX absolute path', () => {
      expect(getExtension(f('/home/user/.bashrc'))).toBe('')
      expect(getExtension(f('/home/user/.app/config'))).toBe('')
    })

    it('handles POSIX relative path with extension', () => {
      expect(getExtension(f('./dist/app.mjs'))).toBe('mjs')
    })

    it('should yield empty for directory-like names', () => {
      expect(getExtension(f('/var/log/'))).toBe('')
      expect(getExtension(f('C:\\temp\\folder\\'))).toBe('')
    })

    it('handles trailing dot', () => {
      expect(getExtension(f('readme.md.'))).toBe('')
    })

    it('handles non-meaningful triple dots before simple ext', () => {
      expect(getExtension(f('weird...txt'))).toBe('txt')
    })

    it('handles tilde backups', () => {
      expect(getExtension(f('notes.txt~'))).toBe('')
      expect(getExtension(f('~draft.md'))).toBe('md')
    })

    it('handles temp suffixes', () => {
      expect(getExtension(f('report.pdf.tmp'))).toBe('tmp')
      expect(getExtension(f('report.tmp.pdf'))).toBe('pdf')
    })

    it('ignores leading/trailing spaces', () => {
      expect(getExtension(f('  doc.TXT  '))).toBe('txt')
    })

    it('handles spaces and parentheses', () => {
      expect(getExtension(f('report (final).PDF'))).toBe('pdf')
    })

    it('ignores semicolons and commas in name', () => {
      expect(getExtension(f('weird;name,ok.jpeg'))).toBe('jpeg')
    })

    it('handles unicode names', () => {
      expect(getExtension(f('фото.jpeg'))).toBe('jpeg')
    })

    it('ignores emoji in basename', () => {
      expect(getExtension(f('🎉-party.PNG'))).toBe('png')
    })

    it('ignores zero-width joiner around dot', () => {
      const zwj = '\u200D'
      expect(getExtension(f(`file${zwj}.MP3`))).toBe('mp3')
    })

    it('ignores RTL mark near dot', () => {
      const rlm = '\u200F'
      expect(getExtension(f(`file${rlm}.PDF`))).toBe('pdf')
    })

    it('handles numbers and numeric extensions', () => {
      expect(getExtension(f('file.0'))).toBe('0')
      expect(getExtension(f('v1.2.3.log'))).toBe('log')
    })

    it('handles dot-only and empty-ish names', () => {
      expect(getExtension(f('.'))).toBe('')
      expect(getExtension(f('..'))).toBe('')
      expect(getExtension(f('...'))).toBe('')
    })

    it('handles forward slashes inside name', () => {
      expect(getExtension(f('dir/sub.dir/file.tar'))).toBe('tar')
    })

    it('handles backslashes inside name', () => {
      expect(getExtension(f('dir\\sub.dir\\video.mp4'))).toBe('mp4')
    })

    it('handles mixed separators and scheme', () => {
      expect(getExtension(f('https://ex.com\\mix/sep\\photo.GIF'))).toBe('gif')
    })
  })
})

function f(name: string) {
  return new File([], name)
}
