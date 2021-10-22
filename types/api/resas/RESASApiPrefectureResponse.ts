import { Prefecture } from '../../Prefecture'

export type RESASApiPrefectureResponse = {
  statusCode?: string
  message: string | null
  description?: string
  result?: Prefecture[]
}
