import { NextApiRequest, NextApiResponse } from 'next'
import httpMocks, { MockResponse } from 'node-mocks-http'
import { expect } from '@jest/globals'
import * as RESASApi from '../../../../../apis/resas/RESASApi'
import handler from '../[prefCode]'
import { PopulationCompositionData } from '../../../../../types/PopulationCompositionData'

describe('pages/api/population/composition', () => {
  describe('正常系', () => {
    it('総人口データが返ってくる', async () => {
      const prefectures: PopulationCompositionData[] = [
        { year: 1980, value: 12817 },
        { year: 1985, value: 12707 },
        { year: 1990, value: 12571 },
        { year: 1995, value: 12602 },
      ]
      setupMock(prefectures)

      const mockReq = httpMocks.createRequest<NextApiRequest>()
      const mockRes = httpMocks.createResponse<NextApiResponse>()

      await handler(mockReq, mockRes)
      expect(mockRes.statusCode).toEqual(200)
      expect(mockRes._getJSONData()).toEqual(prefectures)
    })
  })

  describe('異常系', () => {
    describe('prefCode不正', () => {
      it('prefCode=null or undefined', async () => {
        setupMock([])
        const mockReq = createRequestMock(null)
        const mockRes = httpMocks.createResponse<NextApiResponse>()

        await handler(mockReq, mockRes)
        expectError(mockRes)
      })

      it('prefCode=0', async () => {
        setupMock([])
        const mockReq = createRequestMock(0)
        const mockRes = httpMocks.createResponse<NextApiResponse>()

        await handler(mockReq, mockRes)
        expectError(mockRes)
      })

      it('prefCode=string', async () => {
        setupMock([])
        const mockReq = createRequestMock('aaa')
        const mockRes = httpMocks.createResponse<NextApiResponse>()

        await handler(mockReq, mockRes)
        expectError(mockRes)
      })
    })

    it('何か問題が発生しデータが返ってこない', async () => {
      setupMock([])

      const mockReq = httpMocks.createRequest<NextApiRequest>()
      const mockRes = httpMocks.createResponse<NextApiResponse>()

      await handler(mockReq, mockRes)
      expectError(mockRes)
    })
  })
})

function expectError(mockRes: MockResponse<NextApiResponse>) {
  expect(mockRes.statusCode).toEqual(500)
  expect(mockRes._getJSONData()).toEqual({
    errorMessage: 'エラーが発生しました',
  })
}

function createRequestMock(prefCode: number | string | null) {
  return httpMocks.createRequest<NextApiRequest>({
    query: {
      prefCode: prefCode,
    },
  })
}

function setupMock(prefectures: PopulationCompositionData[]): void {
  jest
    .spyOn(RESASApi, 'RESASApiPopulationTotal')
    .mockReturnValue(
      new Promise<PopulationCompositionData[]>((resolve) =>
        resolve(prefectures)
      )
    )
}
