import { useRouter } from 'next/router'
import Link from 'next/link'

const LangLink = ({ lang, label, activeColor, inactiveColor }: { lang: string, label: string, activeColor: string, inactiveColor: string }) => {
  const { locale, pathname, query } = useRouter()
  return (
    <>
      { locale != lang
        ? <Link href={{ pathname, query }} locale={lang}><a style={{ color: inactiveColor }}>{label}</a></Link>
        : <span style={{ color: activeColor }}>{label}</span>}
      <style jsx>{`
        a
          border none
          padding 0
      `}</style>
    </>
  )
}

const LanguageSelector = ({ activeColor = 'black', inactiveColor = '#cccccc', separator = ' / ' }: { activeColor?: string, inactiveColor?: string, separator?: string }) => (
  <>
    <div className="language-selector"><LangLink lang="ja" label="JA" activeColor={activeColor} inactiveColor={inactiveColor} /><span className="sp" style={{ color: inactiveColor }}>{separator}</span><LangLink lang="en" label="EN" activeColor={activeColor} inactiveColor={inactiveColor} /><span className="sp" style={{ color: inactiveColor }}>{separator}</span><LangLink lang="zh-hans" label="ZH" activeColor={activeColor} inactiveColor={inactiveColor} /></div>
    <style jsx>{`
      .sp
        white-space pre
    `}</style>
  </>
)

export default LanguageSelector
