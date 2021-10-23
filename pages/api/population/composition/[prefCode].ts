import type { NextApiRequest, NextApiResponse } from 'next'
import { PopulationComposition } from '../../../../types/PopulationComposition'
import { ApiError } from '../../../../types/pages/ApiError'
import { RESASApiPopulationComposition } from '../../../../apis/resas/RESASApi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationComposition[] | ApiError>
) {
  const { prefCode } = req.query
  if (inValidPrefCode(prefCode)) {
    setErrorResponse(res)
    return
  }

  await RESASApiPopulationComposition(Number(prefCode))
    .then((value: PopulationComposition[] | undefined) => {
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
  res: NextApiResponse<PopulationComposition[] | ApiError>
): void {
  res.status(500).json({ errorMessage: 'エラーが発生しました' })
}
