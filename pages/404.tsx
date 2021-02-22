import { GetStaticProps } from 'next'
import Layout from 'components/Layout'
import BlackButton from 'components/BlackButton'
import { Grad } from 'components/Grad'

const NotFoundPage = () => (
  <>
    <Layout title="Page not found">
      <div className="not-found">
        <div><Grad><div className="title">Page not found</div></Grad></div>
        <div className="button"><BlackButton link="/">Back to Top</BlackButton></div>
      </div>
    </Layout >
    <style jsx>{`
      .not-found
        min-height calc(100vh - 80px - 150px)
        margin-right 80px
        padding-top 70px
        box-sizing border-box
        display flex
        flex-direction column
        justify-content center
        align-items center
        .title
          font-size 60px
          font-weight 700
        .button
          margin-top 60px
      @media (--mobile)
        .not-found
          min-height 70vh
          margin-right 50px
          padding-top 0
          padding-bottom 40px
          .title
            font-size 30px
            font-weight 700
          .button
            margin-top 50px
    `}</style>
  </>
)

export default NotFoundPage

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}
