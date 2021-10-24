import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '@jest/globals'
import SectionTitle from '../SectionTitle'

describe('components/atoms/title/SectionTitle', () => {
  describe('正常系', () => {
    it('初期表示', () => {
      const header = shallow(<SectionTitle title={'タイトル'} />)
      expect(header).toMatchSnapshot()
    })
  })
})
