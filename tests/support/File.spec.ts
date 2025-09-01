import { getExtension } from 'sefirot/support/File'

describe('support/File', () => {
  describe('getExtension', () => {
    it('returns simple extension', () => {
      expect(getExtension(new File([], 'example.txt'))).toBe('txt')
    })

    it('normalizes to lowercase', () => {
      expect(getExtension(new File([], 'report.PDF'))).toBe('pdf')
    })

    it('handles filenames with multiple dots', () => {
      expect(getExtension(new File([], 'my.photo.final.jpeg'))).toBe('jpeg')
    })

    it('treats hidden files with no other dot as no extension', () => {
      expect(getExtension(new File([], '.gitignore'))).toBe('')
    })

    it('allows hidden files with additional dot to have an extension', () => {
      expect(getExtension(new File([], '.env.local'))).toBe('local')
    })

    it('returns \'\' when there is no dot', () => {
      expect(getExtension(new File([], 'README'))).toBe('')
    })

    it('ignores query-ish characters if present in odd filenames', () => {
      expect(getExtension(new File([], 'weird.name.txt?cache=1'))).toBe('txt')
    })

    it('strips ?query', () => {
      expect(getExtension(new File([], 'file.css?v=123.456'))).toBe('css')
    })

    it('strips #hash', () => {
      expect(getExtension(new File([], 'bundle.js#abc.def'))).toBe('js')
    })

    it('strips both ? and #', () => {
      expect(getExtension(new File([], 'img.jpeg?x=1.2#y=3.4'))).toBe('jpeg')
    })

    it('handles file:// with Windows drive', () => {
      expect(getExtension(new File([], 'file:///C:/Users/Alice/Doc/report.PDF'))).toBe('pdf')
    })

    it('treats percent-encoded dot literally', () => {
      expect(getExtension(new File([], 'image%2Ejpeg'))).toBe('')
    })

    it('handles Windows fakepath', () => {
      expect(getExtension(new File([], 'C:\\fakepath\\photo.JPG'))).toBe('jpg')
      expect(getExtension(new File([], 'C:\\fake.path\\photo'))).toBe('')
    })

    it('handles POSIX absolute path', () => {
      expect(getExtension(new File([], '/home/user/.bashrc'))).toBe('')
      expect(getExtension(new File([], '/home/user/.app/config'))).toBe('')
    })

    it('handles POSIX relative path with extension', () => {
      expect(getExtension(new File([], './dist/app.mjs'))).toBe('mjs')
    })

    it('should yield empty for directory-like names', () => {
      expect(getExtension(new File([], '/var/log/'))).toBe('')
      expect(getExtension(new File([], 'C:\\temp\\folder\\'))).toBe('')
    })

    it('handles trailing dot', () => {
      expect(getExtension(new File([], 'readme.md.'))).toBe('')
    })

    it('handles non-meaningful triple dots before simple ext', () => {
      expect(getExtension(new File([], 'weird...txt'))).toBe('txt')
    })

    it('handles tilde backups', () => {
      expect(getExtension(new File([], 'notes.txt~'))).toBe('')
      expect(getExtension(new File([], '~draft.md'))).toBe('md')
    })

    it('handles temp suffixes', () => {
      expect(getExtension(new File([], 'report.pdf.tmp'))).toBe('tmp')
      expect(getExtension(new File([], 'report.tmp.pdf'))).toBe('pdf')
    })

    it('ignores leading/trailing spaces', () => {
      expect(getExtension(new File([], '  doc.TXT  '))).toBe('txt')
    })

    it('handles spaces and parentheses', () => {
      expect(getExtension(new File([], 'report (final).PDF'))).toBe('pdf')
    })

    it('ignores semicolons and commas in name', () => {
      expect(getExtension(new File([], 'weird;name,ok.jpeg'))).toBe('jpeg')
    })

    it('handles unicode names', () => {
      expect(getExtension(new File([], 'фото.jpeg'))).toBe('jpeg')
    })

    it('ignores emoji in basename', () => {
      expect(getExtension(new File([], '🎉-party.PNG'))).toBe('png')
    })

    it('ignores zero-width joiner around dot', () => {
      const zwj = '\u200D'
      expect(getExtension(new File([], `file${zwj}.MP3`))).toBe('mp3')
    })

    it('ignores RTL mark near dot', () => {
      const rlm = '\u200F'
      expect(getExtension(new File([], `file${rlm}.PDF`))).toBe('pdf')
    })

    it('handles numbers and numeric extensions', () => {
      expect(getExtension(new File([], 'file.0'))).toBe('0')
      expect(getExtension(new File([], 'v1.2.3.log'))).toBe('log')
    })

    it('handles dot-only and empty-ish names', () => {
      expect(getExtension(new File([], '.'))).toBe('')
      expect(getExtension(new File([], '..'))).toBe('')
      expect(getExtension(new File([], '...'))).toBe('')
    })

    it('handles forward slashes inside name', () => {
      expect(getExtension(new File([], 'dir/sub.dir/file.tar'))).toBe('tar')
    })

    it('handles backslashes inside name', () => {
      expect(getExtension(new File([], 'dir\\sub.dir\\video.mp4'))).toBe('mp4')
    })

    it('handles mixed separators and scheme', () => {
      expect(getExtension(new File([], 'https://ex.com\\mix/sep\\photo.GIF'))).toBe('gif')
    })
  })
})
