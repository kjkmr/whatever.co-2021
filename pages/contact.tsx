import { GetStaticProps, } from 'next'
import { getPageDetails } from '../lib/api'
import Layout from '../components/Layout'


type Props = {
  page: {
    title: string
    content: string
  }
}

const AboutPage = ({ page }: Props) => (
  < Layout title="ABOUT" >
    <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
  </Layout >
)

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
  const page = await getPageDetails('contact')
  return { props: { page } }
}
