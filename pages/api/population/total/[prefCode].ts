import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from '../../../../types/pages/ApiError'
import { RESASApiPopulationTotal } from '../../../../apis/resas/RESASApi'
import { PopulationCompositionData } from '../../../../types/PopulationCompositionData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationCompositionData[] | ApiError>
) {
  const { prefCode } = req.query

  await RESASApiPopulationTotal(Number(prefCode))
    .then((value: PopulationCompositionData[] | undefined) => {
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

function setErrorResponse(
  res: NextApiResponse<PopulationCompositionData[] | ApiError>
): void {
  res.status(500).json({ errorMessage: 'エラーが発生しました' })
}
