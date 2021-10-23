import { RESASApiPopulationComposition } from '../RESASApi'
import axios from 'axios'

jest.mock('axios')

describe('api/resas/RESASApiPopulationComposition', () => {
  describe('正常系', () => {
    it('レスポンスが正常に返ってくる(axios get then)', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: {
          result: {
            boundaryYear: '',
            data: [
              {
                label: '総人口',
                data: [
                  { year: 1980, value: 12817 },
                  { year: 1985, value: 12707 },
                  { year: 1990, value: 12571 },
                  { year: 1995, value: 12602 },
                ],
              },
            ],
          },
        },
      })

      setEnv('aaa', 'hoge.com')
      const result = await RESASApiPopulationComposition(1)

      if (!result) fail()

      expect(result.length).toEqual(4)
    })
  })

  describe('異常系', () => {
    it('RESAS_API_KEYがない', async () => {
      setEnv('', 'hoge.com')

      await expect(RESASApiPopulationComposition(1)).rejects.toThrowError(Error)
    })

    it('RESAS_API_ENDPOINTがない', async () => {
      setEnv('aaa', '')

      await expect(RESASApiPopulationComposition(1)).rejects.toThrowError(Error)
    })

    it('RESAS APIをコールしてエラーが発生する(axios get catch)', async () => {
      ;(axios.get as jest.Mock).mockRejectedValue(new Error('error'))

      setEnv('aaa', 'hoge.com')
      const result = await RESASApiPopulationComposition(1)

      if (!result) fail()

      expect(result.length).toEqual(0)
    })
  })
})

function setEnv(apiKey: string, endpoint: string) {
  process.env.RESAS_API_KEY = apiKey
  process.env.RESAS_API_ENDPOINT = endpoint
}
