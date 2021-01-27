import { useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Entry, getNews } from 'lib/api'
import Layout from 'components/Layout'
import { Grad, GradImg } from 'components/Grad'

const NewsItem = ({ entry }: { entry: Entry }) => {
  const [entered, setEntered] = useState(false)
  return (
    <>
      <div className="news-item">
        <Link href={`/news/${entry.slug}`}>
          <a onMouseEnter={() => setEntered(true)} onMouseLeave={() => setEntered(false)}>
            <GradImg mouseEntered={entered}><img src={entry.hero_image} alt="" /></GradImg>
            <div><Grad className="date">{entry.date}</Grad></div>
            <div><Grad className="title">{entry.title}</Grad></div>
            <div><Grad className="desc"><div className="desc-inner" dangerouslySetInnerHTML={{ __html: entry.content?.split('<!--more-->')[0] || '' }}></div></Grad></div>
          </a>
        </Link>
      </div>
      <style jsx>{`
        @import 'lib/vw.styl'
        .news-item
          font-size 0
          width vwpx(593)
          img
            width vwpx(593)
            height vwpx(334)
            object-fit cover
          :global(.date)
            font-size 1.2rem
            font-weight 300
            margin-top 3.0rem
          :global(.title)
            font-size 2.0rem
            font-weight bold
            line-height 3.0rem
            margin-top 1.3rem
          :global(.desc)
            margin-top 1.6rem
            width vwpx(561)
          .desc-inner
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 3
            overflow hidden
            text-overflow ellipsis
            font-size var(--font-size-ja)
            font-weight 300
            line-height 3.0rem
            :global(p)
              margin 0
            :global(a)
              border none
              padding 0
      `}</style>
    </>
  )
}

const NewsIndex = ({ entries }: { entries: Entry[] }) => {
  const locale = useRouter().locale || ''
  return (
    <>
      <Layout title="News" side="News">
        <div className="news-index">
          {entries.map(entry => <NewsItem key={entry.slug + locale} entry={entry} />)}
        </div>
      </Layout >
      <style jsx>{`
        @import 'lib/vw.styl'
        .news-index
          margin-top 90px
          margin-bottom 150px
          display grid
          grid-template-columns 1fr 1fr
          grid-gap vwpx(92) vwpx(100)
      `}</style>
    </>
  )
}

export default NewsIndex

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const entries = await getNews(100, locale)
  return { props: { entries } }
}
