import React, { useEffect, useState } from 'react'
import { Prefecture } from '../../../types/Prefecture'
import CheckBoxPrefecture from '../../molecules/checkbox/prefecture/CheckBoxPrefecture'
import styles from './CheckBoxPrefectureList.module.sass'
import axios from 'axios'
import { ApiError } from '../../../types/pages/ApiError'
import SectionTitle from '../../atoms/title/SectionTitle'

type CheckBoxPrefectureListProps = {
  onCheck(prefCode: number, prefName: string): void
  onUnCheck(prefCode: number): void
}

export default function CheckBoxPrefectureList({
  onCheck,
  onUnCheck,
}: CheckBoxPrefectureListProps) {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [message, setMessage] = useState<string>('都道府県データの取得中...')

  useEffect(() => {
    if (prefectures.length === 0) {
      getPrefectures()
        .then((apiResult) => {
          setPrefectures(apiResult)
        })
        .catch((err: ApiError) => {
          setMessage(err.errorMessage)
        })
    }
  })

  return (
    <>
      <SectionTitle title={'都道府県'} />
      {prefectures.length === 0 ? (
        <>{message}</>
      ) : (
        <>
          <div className={styles.checkbox_list}>
            {prefectures.map((prefecture) => (
              <div key={prefecture.prefCode} className={styles.checkbox}>
                <CheckBoxPrefecture
                  onCheck={onCheck}
                  onUnCheck={onUnCheck}
                  {...prefecture}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

function getPrefectures(): Promise<Prefecture[]> {
  return new Promise<Prefecture[]>((resolve, reject) => {
    axios
      .get<Prefecture[] | ApiError>('/api/prefectures')
      .then((result) => {
        const dataList = result.data as Prefecture[]
        if (!dataList || dataList.length === 0) {
          reject({ errorMessage: 'エラーが発生しました' })
          return
        }
        resolve(dataList)
      })
      .catch((err: ApiError) => {
        reject(err)
      })
  })
}
