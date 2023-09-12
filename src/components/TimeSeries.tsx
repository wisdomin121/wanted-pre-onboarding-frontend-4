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
import { Theme } from 'styles/DefaultTheme'

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
          <CartesianGrid stroke={Theme.colors.grid} />
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
            fill={Theme.colors.unclickedBar}
            onClick={(data) => {
              locClicked(data.loc)
            }}
          >
            {datas.map((data: Data, idx: number) => {
              return (
                <Cell
                  key={idx}
                  fill={
                    clickedLoc.has(data.loc) ? Theme.colors.clickedBar : Theme.colors.unclickedBar
                  }
                />
              )
            })}
          </Bar>
          <Area
            yAxisId="Area"
            type="monotone"
            dataKey="valueArea"
            fill={Theme.colors.area}
            stroke={Theme.colors.area}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </TimeSeriesStyled>
  )
}

export default TimeSeries
