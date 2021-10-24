import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '@jest/globals'
import CheckBoxPrefectureList from '../CheckBoxPrefectureList'
import axios from 'axios'
import { Prefecture } from '../../../../types/Prefecture'

jest.mock('axios')

describe('components/organisms/prefecture/CheckBoxPrefectureList', () => {
  describe('正常系', () => {
    it('初期表示', () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: testData(),
      })
      const checkboxList = shallow(
        <CheckBoxPrefectureList onCheck={jest.fn} onUnCheck={jest.fn} />
      )
      expect(checkboxList).toMatchSnapshot()
    })

    // TODO: useEffect利用時のテストを動かす
    it('都道府県データ更新した状態', async () => {
      // const checkboxList = shallow(
      //   <CheckBoxPrefectureList onCheck={jest.fn} onUnCheck={jest.fn} />
      // )
      //
      // // MEMO: このコードを入れることでstateが更新される(なぜ動くのかあまりわかってない)
      // //   参考: https://www.fixes.pub/program/325238.html
      // await act(async () => {
      //   await new Promise((resolve) => setTimeout(resolve, 0))
      // })
      //
      // expect(checkboxList).toMatchSnapshot()
    })
  })
})

function testData(): Prefecture[] {
  return [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ]
}
