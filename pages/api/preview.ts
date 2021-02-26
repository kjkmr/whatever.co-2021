import { getPreviewData } from "lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const { slug, locale } = req.query
  if (!slug || Array.isArray(slug) || !locale || Array.isArray(locale)) {
    return res.status(401).send('Invalid params')
  }
  const data = await getPreviewData(slug, locale)
  if (!data) {
    return res.status(401).send('Post not found')
  }
  res.setPreviewData({}, { maxAge: 60 * 15 })
  res.redirect(`/${locale}/work/${data.slug}/`)
}
