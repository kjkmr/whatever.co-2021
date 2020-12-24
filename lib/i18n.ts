import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import { resources } from './resources'

function _t(key: string): string | any[] | null {
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
  return paths.length == 0 ? result : null
}

export function t(key: string): string {
  const ret = _t(key)
  return ret ? ret as string : `{${key}}`
}

export function ta(key: string): any[] {
  const ret = _t(key)
  return ret ? ret as any[] : []
}

export function LangStyle(classes?: string): string {
  const router = useRouter()
  const langStyle: { [key: string]: any } = {}
  langStyle[router.locale!] = true;
  return classNames(classes, langStyle)
}
