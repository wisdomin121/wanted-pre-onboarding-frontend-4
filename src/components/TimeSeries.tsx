import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { CustomTooltip } from 'components'
import { Data } from 'types/type'

import { TimeSeriesStyled } from './TimeSeries.styled'

interface TimeSeriesProps {
  datas: Data[]
  clickedLoc: Set<string>
  locClicked: (loc: string) => void
}

function TimeSeries({ datas, clickedLoc, locClicked }: TimeSeriesProps) {
  return (
    <TimeSeriesStyled>
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            yAxisId="Bar"
            dataKey="valueBar"
            barSize={20}
            fill="#9EA1FE"
            onClick={(data) => {
              locClicked(data.loc)
            }}
          >
            {datas.map((data: Data, idx: number) => {
              return <Cell key={idx} fill={clickedLoc.has(data.loc) ? '#5641C0' : '#9EA1FE'} />
            })}
          </Bar>
          <Area
            yAxisId="Area"
            type="monotone"
            dataKey="valueArea"
            fill="#EC8091"
            stroke="#EC8091"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </TimeSeriesStyled>
  )
}

export default TimeSeries
