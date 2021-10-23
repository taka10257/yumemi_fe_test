import { PopulationComposition } from '../../PopulationComposition'

export type RESASApiPopulationCompositionResponse = {
  statusCode?: string
  message: string | null
  description?: string
  result?: {
    boundaryYear: string
    data: { label: string; data: PopulationComposition[] }[]
  }
}
