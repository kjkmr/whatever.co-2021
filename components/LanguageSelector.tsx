import { useRouter } from 'next/router'
import Link from 'next/link'

const LangLink = ({ lang, label, activeColor, inactiveColor, onSelected }: { lang: string, label: string, activeColor: string, inactiveColor: string, onSelected: any }) => {
  const { locale, pathname, query } = useRouter()
  return (
    <>
      { locale != lang
        ? <Link href={{ pathname, query }} locale={lang}><a onClick={onSelected}>{label}</a></Link>
        : <span style={{ color: activeColor }}>{label}</span>}
      <style jsx>{`
        a
          border none
          padding 0
          color ${inactiveColor}
          &:hover
            color ${activeColor}
      `}</style>
    </>
  )
}


const LanguageSelector = ({ activeColor = 'black', inactiveColor = '#cccccc', separator = ' / ', onSelected = null }: { activeColor?: string, inactiveColor?: string, separator?: string, onSelected?: any }) => (
  <>
    <div className="language-selector"><LangLink lang="ja" label="JA" activeColor={activeColor} inactiveColor={inactiveColor} onSelected={onSelected} /><span className="sp" style={{ color: inactiveColor }} >{separator}</span><LangLink lang="en" label="EN" activeColor={activeColor} inactiveColor={inactiveColor} onSelected={onSelected} /><span className="sp" style={{ color: inactiveColor }}>{separator}</span><LangLink lang="zh-hans" label="ZH" activeColor={activeColor} inactiveColor={inactiveColor} onSelected={onSelected} /></div>
    <style jsx>{`
      .language-selector
        font-size 1.2rem
        letter-spacing 0.12em
        color #cccccc
        user-select none
      .sp
        white-space pre
      @media (--mobile)
        .language-selector
          font-size 1.0rem
    `}</style>
  </>
)

export default LanguageSelector
