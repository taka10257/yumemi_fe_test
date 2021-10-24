import React, { ChangeEvent } from 'react'
import styles from './CheckBoxPrefecture.module.sass'

type CheckBoxPrefectureProps = {
  prefCode: number
  prefName: string
  onCheck(prefCode: number, prefName: string): void
  onUnCheck(prefCode: number): void
}

export default function CheckBoxPrefecture({
  prefCode,
  prefName,
  onCheck,
  onUnCheck,
}: CheckBoxPrefectureProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onCheck(prefCode, prefName)
      return
    }
    onUnCheck(prefCode)
  }

  return (
    <label className={styles.label}>
      <input type="checkbox" value={prefCode} onChange={onChange} />
      <span>{prefName}</span>
    </label>
  )
}
