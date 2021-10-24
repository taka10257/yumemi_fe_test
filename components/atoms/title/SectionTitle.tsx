import React from 'react'
import styles from './SectionTitle.module.sass'

type SectionTitleProps = {
  title: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}
