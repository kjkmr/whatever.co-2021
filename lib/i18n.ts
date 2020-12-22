import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import { resources } from './resources'

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

export function LangStyle(classes?: string): string {
  const router = useRouter()
  const langStyle: { [key: string]: any } = {}
  langStyle[router.locale!] = true;
  return classNames(classes, langStyle)
}
