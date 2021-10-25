import type { NextApiRequest, NextApiResponse } from 'next'
import { Prefecture } from '../../types/Prefecture'
import { RESASApiPrefectures } from '../../apis/resas/RESASApi'
import { ApiError } from '../../types/pages/ApiError'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prefecture[] | ApiError>
) {
  await RESASApiPrefectures()
    .then((value: Prefecture[] | undefined) => {
      if (!value || value.length === 0) {
        setErrorResponse(res)
        return
      }
      res.status(200).json(value)
    })
    .catch(() => {
      setErrorResponse(res)
    })
}

function setErrorResponse(res: NextApiResponse<Prefecture[] | ApiError>): void {
  res.status(500).json({ errorMessage: 'エラーが発生しました' })
}
