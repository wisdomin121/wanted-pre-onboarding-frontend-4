import { TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

import { LocStyled, TooltipStyled, ValueStyled } from './CustomTooltip.styled'

function Tooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <TooltipStyled>
        <LocStyled>{data.loc}</LocStyled>
        <ValueStyled>Area: {data.valueArea}</ValueStyled>
        <ValueStyled>Bar: {data.valueBar}</ValueStyled>
      </TooltipStyled>
    )
  }

  return <></>
}

export default Tooltip
