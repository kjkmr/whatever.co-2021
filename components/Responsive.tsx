import { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

export const Desktop = ({ children }: { children?: ReactNode }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  return isDesktop ? <>{children}</> : null
}
// export const Tablet = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
//   return isTablet ? children : null
// }

export const Mobile = ({ children }: { children?: ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 })
  return isMobile ? <>{children}</> : null
}
// export const Default = ({ children }) => {
//   const isNotMobile = useMediaQuery({ minWidth: 768 })
//   return isNotMobile ? children : null
// }

// const Example = () => (
//   <div>
//     <Desktop>Desktop or laptop</Desktop>
//     <Tablet>Tablet</Tablet>
//     <Mobile>Mobile</Mobile>
//     <Default>Not mobile (desktop or laptop or tablet)</Default>
//   </div>
// )

// export default Example
