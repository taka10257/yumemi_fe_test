import React from 'react'
import Highcharts, { SeriesLineOptions } from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import { PopulationTotalData } from '../../../../types/PopulationTotalData'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

const defaultOptions: Highcharts.Options = {
  title: {
    text: '総人口',
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
  },
  exporting: {
    enabled: false,
  },
  xAxis: {
    title: {
      text: '年度',
      align: 'high',
    },
  },
  yAxis: {
    labels: {
      format: '{value}',
    },
    title: {
      align: 'high',
      offset: 0,
      text: '人口数',
      rotation: 0,
      y: -15,
      x: -15,
    },
  },
}

type PopulationTotalGraphProps = {
  dataList: PopulationTotalData[]
}

export default function PopulationTotalGraph({
  dataList,
}: PopulationTotalGraphProps) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{ ...defaultOptions, series: createSeries(dataList) }}
    />
  )
}

function createSeries(dataList: PopulationTotalData[]): SeriesLineOptions[] {
  return dataList.map((totalData) => {
    return {
      type: 'line',
      id: totalData.prefCode.toString(),
      name: totalData.prefName,
      data: totalData.data.map((value) => Object.values(value)),
    }
  })
}
