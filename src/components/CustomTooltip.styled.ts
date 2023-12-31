import { styled } from 'styled-components'

export const TooltipStyled = styled.div`
  overflow: hidden;
  width: 100px;
  height: fit-content;
  border-radius: 5px;

  background-color: white;
  opacity: 0.85;
`

export const LocStyled = styled.div`
  padding: 4px 0;
  background-color: ${({ theme }) => theme.colors.tooltipLoc};
  text-align: center;
  color: white;
`

export const ValueStyled = styled.p`
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.tooltipText};
`
