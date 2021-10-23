import { RESASApiPrefectures } from '../RESASApi'
import axios from 'axios'

jest.mock('axios')

describe('api/resas/RESASApiPrefectures', () => {
  describe('正常系', () => {
    it('レスポンスが正常に返ってくる(axios get then)', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          result: [
            { prefCode: 1, prefName: '北海道' },
            { prefCode: 2, prefName: '青森県' },
          ],
        },
      })

      setEnv('aaa', 'hoge.com')
      const result = await RESASApiPrefectures()

      if (!result) fail()

      expect(result.length).toEqual(2)
    })
  })

  describe('異常系', () => {
    it('RESAS_API_KEYがない', async () => {
      setEnv('', 'hoge.com')

      await expect(RESASApiPrefectures()).rejects.toThrowError(Error)
    })

    it('RESAS_API_ENDPOINTがない', async () => {
      setEnv('aaa', '')

      await expect(RESASApiPrefectures()).rejects.toThrowError(Error)
    })

    it('RESAS APIをコールしてエラーが発生する(axios get catch)', async () => {
      ;(axios.get as jest.Mock).mockRejectedValue(new Error('error'))

      setEnv('aaa', 'hoge.com')
      const result = await RESASApiPrefectures()

      if (!result) fail()

      expect(result.length).toEqual(0)
    })
  })
})

function setEnv(apiKey: string, endpoint: string) {
  process.env.RESAS_API_KEY = apiKey
  process.env.RESAS_API_ENDPOINT = endpoint
}
