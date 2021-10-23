import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from '../../../../types/pages/ApiError'
import { RESASApiPopulationTotal } from '../../../../apis/resas/RESASApi'
import { PopulationCompositionData } from '../../../../types/PopulationCompositionData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationCompositionData[] | ApiError>
) {
  const { prefCode } = req.query
  if (inValidPrefCode(prefCode)) {
    setErrorResponse(res)
    return
  }

  await RESASApiPopulationTotal(Number(prefCode))
    .then((value: PopulationCompositionData[] | undefined) => {
      if (!value || value.length === 0) {
        setErrorResponse(res)
        return
      }
      res.status(200).json(value)
    })
    .catch((err) => {
      console.log(err)
      setErrorResponse(res)
    })
}

function inValidPrefCode(prefCode: string | string[]): boolean {
  if (typeof prefCode !== 'string') return false

  const prefCodeNum = Number(prefCode)
  if (!prefCodeNum) return false

  return !(1 <= prefCodeNum && prefCodeNum <= 47)
}

function setErrorResponse(
  res: NextApiResponse<PopulationCompositionData[] | ApiError>
): void {
  res.status(500).json({ errorMessage: 'エラーが発生しました' })
}
