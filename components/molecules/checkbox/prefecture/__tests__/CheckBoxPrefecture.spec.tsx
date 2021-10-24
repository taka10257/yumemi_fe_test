import React from 'react'
import { shallow } from 'enzyme'
import CheckBoxPrefecture from '../CheckBoxPrefecture'
import { expect } from '@jest/globals'

describe('components/molecules/checkbox/prefecture/CheckBoxPrefecture', () => {
  describe('正常系', () => {
    it('label/valueの確認', () => {
      const checkbox = shallow(
        <CheckBoxPrefecture
          prefCode={1}
          prefName={'北海道'}
          onCheck={jest.fn}
          onUnCheck={jest.fn}
        />
      )
      expect(checkbox).toMatchSnapshot()
    })

    it('onCheck/onUnCheckの確認', () => {
      const prefCode = 1
      const prefName = '北海道'

      let resultPrefCode = 0
      let resultPrefName = ''

      const mockOnCheck = (_prefCode: number, _prefName: string) => {
        resultPrefCode = _prefCode
        resultPrefName = _prefName
      }
      const mockOnUnCheck = (_prefCode: number) => {
        resultPrefCode = _prefCode
        resultPrefName = ''
      }

      const checkbox = shallow(
        <CheckBoxPrefecture
          prefCode={prefCode}
          prefName={prefName}
          onCheck={mockOnCheck}
          onUnCheck={mockOnUnCheck}
        />
      )

      const input = checkbox.find('input')

      input.simulate('change', { target: { checked: true } })
      expect(resultPrefCode).toEqual(prefCode)
      expect(resultPrefName).toEqual(prefName)

      input.simulate('change', { target: { checked: false } })
      expect(resultPrefCode).toEqual(prefCode)
      expect(resultPrefName).toEqual('')
    })
  })
})
