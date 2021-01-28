import { useMediaQuery } from 'react-responsive'

export const isMobile = () => {
  return useMediaQuery({ query: '(max-width: 800px)' })
}
