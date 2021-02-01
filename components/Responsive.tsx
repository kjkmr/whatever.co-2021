import { ReactNode, useState } from "react"
import { useLayoutEffect } from 'lib/useLayoutEffect'
import { isMobile } from "lib/isMobile"

export const Desktop = ({ children }: { children?: ReactNode }) => {
  const [enabled, setEnabled] = useState(false)
  const desktop = !isMobile()
  useLayoutEffect(() => { setEnabled(desktop) })
  return <>{enabled ? children : null}</>
}

export const Mobile = ({ children }: { children?: ReactNode }) => {
  const [enabled, setEnabled] = useState(false)
  const mobile = isMobile()
  useLayoutEffect(() => { setEnabled(mobile) })
  return <>{enabled ? children : null}</>
}
