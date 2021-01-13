import fs from 'fs'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import resources from './resource.json'

var LANGS: string[] = resources.langs
var STRINGS: { [key: string]: string[] } = resources.strings

export async function loadResources() {
  if (global.window) {
    // do nothing on browser
    return
  }
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
  fs.writeFileSync('lib/resource.json', JSON.stringify({ langs: LANGS, strings: STRINGS }, null, 2))
  console.log('Translate resource updated')
  return
}

export function t(key: string, returnKeyIfNotFound: boolean = true): string | undefined {
  if (STRINGS.hasOwnProperty(key)) {
    const router = useRouter()
    const lang = router.locale || router.defaultLocale!
    const i = LANGS?.findIndex(c => c === lang)
    if (i !== undefined && STRINGS[key][i]) {
      return STRINGS[key][i]
    }
  }
  console.log(`key '${key}' not found`)
  return returnKeyIfNotFound ? `{${key}}` : undefined
}

export function ta(key: string): any[] | undefined {
  return t(key)?.split('\n')
}

export function langStyle(classes?: string): string {
  const router = useRouter()
  const langStyle: { [key: string]: any } = {}
  langStyle[router.locale!] = true;
  return classNames(classes, langStyle)
}
