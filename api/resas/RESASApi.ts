import axios from 'axios'
import { RESASApiPrefectureResponse } from '../../types/api/resas/RESASApiPrefectureResponse'
import { RESASApiConfig } from '../../types/api/resas/RESASApiConfig'
import { Prefecture } from '../../types/Prefecture'

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
