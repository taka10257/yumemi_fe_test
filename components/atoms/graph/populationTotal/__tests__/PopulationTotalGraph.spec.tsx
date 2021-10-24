import React from 'react'
import { PopulationTotalData } from '../../../../../types/PopulationTotalData'
import PopulationTotalGraph from '../PopulationTotalGraph'
import { shallow } from 'enzyme'

describe('components/atoms/graph/populationTotal/PopulationTotalGraph', function () {
  it('表示するデータがないとき', () => {
    const graph = shallow(<PopulationTotalGraph dataList={[]} />)
    expect(graph).toMatchSnapshot()
  })
  it('表示するデータがあるとき', () => {
    const graph = shallow(<PopulationTotalGraph dataList={testData()} />)
    expect(graph).toMatchSnapshot()
  })
})

function testData(): PopulationTotalData[] {
  return [
    {
      prefCode: 1,
      prefName: '北海道',
      data: [
        { year: 1960, value: 5039206 },
        { year: 1965, value: 5171800 },
      ],
    },
    {
      prefCode: 2,
      prefName: '青森',
      data: [
        { year: 1960, value: 1426606 },
        { year: 1965, value: 1416591 },
      ],
    },
  ]
}
