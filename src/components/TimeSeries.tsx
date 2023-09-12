import { useEffect, useState } from 'react'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { dataAPI } from 'apis/data'

interface Data {
  time: string
  loc: string
  valueArea: number
  valueBar: number
}

function TimeSeries() {
  const [datas, setDatas] = useState<Data[]>([])

  useEffect(() => {
    dataAPI.get().then((res) => {
      const unprocessedDatas = res.data.response
      const processedDatas = []

      for (const time in unprocessedDatas) {
        const unprocessedData = unprocessedDatas[time]

        processedDatas.push({
          time: time.split(' ')[1],
          loc: unprocessedData.id,
          valueArea: unprocessedData.value_area,
          valueBar: unprocessedData.value_bar,
        })
      }

      setDatas(processedDatas)
    })
  }, [])

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart
        data={datas}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="time" scale="band" />
        <YAxis
          yAxisId="Area"
          dataKey="valueArea"
          orientation="left"
          label={{ value: 'Area', angle: -90, position: 'insideLeft' }}
          domain={[0, 200]}
        />
        <YAxis
          yAxisId="Bar"
          dataKey="valueBar"
          orientation="right"
          label={{ value: 'Bar', angle: -90, position: 'insideRight' }}
        />
        <Tooltip />
        <Legend />
        <Bar yAxisId="Bar" dataKey="valueBar" barSize={20} fill="#9EA1FE" />
        <Area yAxisId="Area" type="monotone" dataKey="valueArea" fill="#EC8091" stroke="#EC8091" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default TimeSeries
