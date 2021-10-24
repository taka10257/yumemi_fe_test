import React, { ReactNode } from 'react'
import AppHeader from '../../organisms/header/AppHeader'
import MetaHead from '../../organisms/header/MetaHead'
import AppFooter from '../../organisms/footer/AppFooter'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MetaHead />
      <AppHeader />
      <>{children}</>
      <AppFooter />
    </>
  )
}
