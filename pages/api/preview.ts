import { getPreviewData } from "lib/api";
import { NextApiRequest, NextApiResponse } from "next";

const VALID_CATEGORIES = ['work', 'news', 'team']
const VALID_LOCALES = ['ja', 'en', 'zh-hant']

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug, category, locale } = req.query
  if (!secret || Array.isArray(secret) || secret !== process.env.WP_PREVIEW_SECRET
    || !slug || Array.isArray(slug)
    || !category || Array.isArray(category) || VALID_CATEGORIES.indexOf(category) == -1
    || !locale || Array.isArray(locale) || VALID_LOCALES.indexOf(locale) == -1) {
    return res.status(401).send('Invalid params')
  }
  const isPost = category != 'team'
  const data = await getPreviewData(slug, locale, isPost)
  if (!data) {
    return res.status(401).send('Post not found')
  }
  res.setPreviewData({}, { maxAge: 60 * 15 })
  res.redirect(`/${locale}/${category}/${data.slug}/`)
}
