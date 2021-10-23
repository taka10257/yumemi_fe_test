import { PopulationCompositionData } from '../../PopulationCompositionData'

export type RESASApiPopulationCompositionResponse = {
  statusCode?: string
  message: string | null
  description?: string
  result?: {
    boundaryYear: string
    data: { label: string; data: PopulationCompositionData[] }[]
  }
}
