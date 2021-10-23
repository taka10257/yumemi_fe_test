import { NextApiRequest, NextApiResponse } from 'next'
import httpMocks from 'node-mocks-http'
import { expect } from '@jest/globals'
import * as RESASApi from '../../../apis/resas/RESASApi'
import { Prefecture } from '../../../types/Prefecture'
import handler from '../prefectures'

describe('pages/api/prefectures', () => {
  describe('正常系', () => {
    it('都道府県データが返ってくる', async () => {
      const prefectures: Prefecture[] = [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
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
    it('何か問題が発生しデータが返ってこない', async () => {
      setupMock([])

      const mockReq = httpMocks.createRequest<NextApiRequest>()
      const mockRes = httpMocks.createResponse<NextApiResponse>()

      await handler(mockReq, mockRes)
      expect(mockRes.statusCode).toEqual(500)
      expect(mockRes._getJSONData()).toEqual({
        errorMessage: 'エラーが発生しました',
      })
    })
  })
})

function setupMock(prefectures: Prefecture[]): void {
  jest
    .spyOn(RESASApi, 'RESASApiPrefectures')
    .mockReturnValue(
      new Promise<Prefecture[]>((resolve) => resolve(prefectures))
    )
}
