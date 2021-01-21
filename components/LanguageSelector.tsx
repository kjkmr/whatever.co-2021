import { useRouter } from 'next/router'
import Link from 'next/link'

const LangLink = ({ lang, label }: { lang: string, label: string }) => {
  const { locale, pathname, query } = useRouter()
  return (
    <span>
      { locale != lang
        ? <Link href={{ pathname, query }} locale={lang}><a>{label}</a></Link>
        : <>{label}</>}
      <style jsx>{`
        span
          color black
        a
          color #cccccc
          border none
      `}</style>
    </span>
  )
}

const LanguageSelector = () => (
  <>
    <div className="language-selector"><LangLink lang="ja" label="JA" /> / <LangLink lang="en" label="EN" /> / <LangLink lang="zh-hans" label="ZH" /></div>

  </>
)

export default LanguageSelector
