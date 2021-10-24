import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '@jest/globals'
import AppHeader from '../AppHeader'

describe('components/organisms/header/AppHeader', () => {
  describe('正常系', () => {
    it('初期表示', () => {
      const header = shallow(<AppHeader />)
      expect(header).toMatchSnapshot()
    })
  })
})
