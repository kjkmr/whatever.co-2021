import fs from 'fs'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import resources from './resource.json'

var LAST_UPDATE: number = 0
var LANGS: string[] = resources.langs
var STRINGS: { [key: string]: string[] } = resources.strings

export async function loadResources() {
  if (Date.now() - LAST_UPDATE > 5 * 60 * 1000) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyBPS0U7V3I1fDhUITigGzioonYX4L58B_DjLpaH_0QYC1b3WW5NwXRvw/exec')
    const data = await response.json()
    LANGS = data.shift().slice(1)
    STRINGS = {}
    data.forEach((row: string[]) => {
      const key = row.shift()
      if (key) {
        STRINGS![key] = row
      }
    })
    fs.writeFileSync('lib/resource.json', JSON.stringify({ langs: LANGS, strings: STRINGS }))
    console.log('Translate resource updated')
    LAST_UPDATE = Date.now()
  }
  return
}

/*
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
*/

export function t(key: string): string {
  if (STRINGS.hasOwnProperty(key)) {
    const router = useRouter()
    const lang = router.locale || router.defaultLocale!
    const i = LANGS?.findIndex(c => c === lang)
    if (i !== undefined) {
      return STRINGS[key][i] || `{${key}}`
    }
  }
  return `{${key}}`
  // const ret = _t(key)
  // return typeof ret === 'string' ? ret : `{${key}}`
}

export function ta(key: string): any[] {
  // const ret = _t(key)
  // return Array.isArray(ret) ? ret : []
  return t(key).split('\n')
}

export function LangStyle(classes?: string): string {
  const router = useRouter()
  const langStyle: { [key: string]: any } = {}
  langStyle[router.locale!] = true;
  return classNames(classes, langStyle)
}
