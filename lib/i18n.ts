import { useRouter } from 'next/router'

const resources = {
  'en': {
    contactform: {
      contacthere: 'For new business, career and media inquires, contact us.',
      inquiry: 'Contact us',
      register: 'Subscribe to our newsletter',
    },
    index: {
      whateveris1: 'Whatever is a cross-border creative studio.',
      whateveris2: '',
    },
  },
  'ja': {
    contactform: {
      contacthere: '新規プロジェクト、採用、メディア掲載など各種ご相談はこちらまで',
      inquiry: 'お問い合わせ',
      register: 'ニュースレターに登録',
    },
    index: {
      whateveris1: 'Whateverは様々な領域を越えて活動する',
      whateveris2: 'クロスボーダー・クリエイティブ・スタジオです。',
    }
  },
  'zh-hans': {},
}


export function t(key: string): string {
  const router = useRouter()
  const paths = key.split('.')
  paths.unshift(router.locale || router.defaultLocale!)
  let result: any = resources
  while (paths.length) {
    // console.log(paths)
    // console.log(result)
    // console.log(result.hasOwnProperty(paths[0]))
    if (result.hasOwnProperty(paths[0])) {
      result = result[paths[0]]
      paths.shift()
    } else {
      break;
    }
  }
  return typeof result == 'string' ? result : `{${key}}`
}
