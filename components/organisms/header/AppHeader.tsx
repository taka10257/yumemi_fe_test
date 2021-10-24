import React from 'react'
import styles from './AppHeader.module.sass'

export default function AppHeader() {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>都道府県別の総人口推移</h1>
    </div>
  )
}
