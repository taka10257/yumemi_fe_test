import axios from 'axios'
import { RESASApiPrefectureResponse } from '../../types/api/resas/RESASApiPrefectureResponse'
import { RESASApiConfig } from '../../types/api/resas/RESASApiConfig'
import { Prefecture } from '../../types/Prefecture'
import { RESASApiPopulationCompositionResponse } from '../../types/api/resas/RESASApiPopulationCompositionResponse'
import { PopulationComposition } from '../../types/PopulationComposition'

export async function RESASApiPrefectures(): Promise<Prefecture[] | undefined> {
  return await axios
    .get<RESASApiPrefectureResponse>(prefectureUrl(), config())
    .then((value) => {
      return value.data.result
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export async function RESASApiPopulationComposition(
  prefCode: number
): Promise<PopulationComposition[] | undefined> {
  return await axios
    .get<RESASApiPopulationCompositionResponse>(
      populationCompositionUrl(prefCode),
      config()
    )
    .then((value) => {
      const result = value.data.result
      if (!result) return []

      const populationData = result.data.find((data) => data.label === '総人口')
      if (!populationData) return []

      return populationData.data
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

function populationCompositionUrl(prefCode: number): string {
  return `${endpoint()}/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`
}

function prefectureUrl(): string {
  return `${endpoint()}/api/v1/prefectures`
}

function config(): RESASApiConfig {
  return {
    headers: {
      'X-API-KEY': apiKey(),
    },
  }
}

function apiKey(): string {
  const apiKey: string | undefined = process.env.RESAS_API_KEY

  if (!apiKey) throw new Error('RESAS_API_KEYが設定されていません')

  return apiKey
}

function endpoint(): string {
  const endpoint: string | undefined = process.env.RESAS_API_ENDPOINT

  if (!endpoint) throw new Error('RESAS_API_ENDPOINTが設定されていません')

  return endpoint
}
