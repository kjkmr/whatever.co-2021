import querystring from 'querystring'

export const getOptimized = (url: string, width = 1920, quarity = 90): string => {
  return '/_next/image?' + querystring.stringify({ url, w: width, q: quarity })
}
