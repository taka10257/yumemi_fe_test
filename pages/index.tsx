import React, { useState } from 'react'
import styles from './index.module.sass'
import PopulationTotalGraph from '../components/atoms/graph/populationTotal/PopulationTotalGraph'
import { PopulationTotalData } from '../types/PopulationTotalData'
import { PopulationCompositionData } from '../types/PopulationCompositionData'
import axios from 'axios'
import { ApiError } from '../types/pages/ApiError'
import CheckBoxPrefectureList from '../components/organisms/prefecture/CheckBoxPrefectureList'
import SectionTitle from '../components/atoms/title/SectionTitle'

export default function Index() {
  const [PopulationTotalDataList, setPopulationTotalDataList] = useState<
    PopulationTotalData[]
  >([])

  const addPopulationTotalData = async (prefCode: number, prefName: string) => {
    await axios
      .get<PopulationCompositionData[] | ApiError>(
        `/api/population/total/${prefCode}`
      )
      .then((result) => {
        const dataList = result.data as PopulationCompositionData[]
        if (!dataList || dataList.length === 0) {
          error()
          return
        }
        const addData = createPopulationTotalData(prefCode, prefName, dataList)
        setPopulationTotalDataList((data) => data.concat(addData))
      })
      .catch((err: ApiError) => {
        console.log(err)
        error()
      })
  }

  const removePopulationTotalData = (prefCode: number) => {
    setPopulationTotalDataList((dataList) =>
      dataList.filter((data) => data.prefCode !== prefCode)
    )
  }

  return (
    <div className={styles.root}>
      <div>
        <CheckBoxPrefectureList
          onCheck={addPopulationTotalData}
          onUnCheck={removePopulationTotalData}
        />
      </div>
      <div>
        <SectionTitle title={'総人口グラフ'} />
        <PopulationTotalGraph dataList={PopulationTotalDataList} />
      </div>
    </div>
  )
}

function createPopulationTotalData(
  prefCode: number,
  prefName: string,
  dataList: PopulationCompositionData[]
): PopulationTotalData {
  return {
    prefCode: prefCode,
    prefName: prefName,
    data: dataList,
  }
}

function error() {
  alert('エラーが発生しました。画面を更新してやり直してください')
}
