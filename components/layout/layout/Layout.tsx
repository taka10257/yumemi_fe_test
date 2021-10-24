import React, { ReactNode } from 'react'
import AppHeader from '../../organisms/header/AppHeader'
import MetaHead from '../../organisms/header/MetaHead'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MetaHead />
      <AppHeader />
      <>{children}</>
    </>
  )
}
