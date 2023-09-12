import styled, { css } from 'styled-components'

export const LocButtonStyled = styled.button<{ $isClicked: boolean }>`
  padding: 4px 8px;
  border: 0.5px solid #807f7d;
  border-radius: 20px;
  background-color: white;
  text-align: center;
  color: #807f7d;
  cursor: pointer;

  &:hover {
    border: 0.5px solid #467ced;
    color: #467ced;
  }

  ${({ $isClicked }) =>
    $isClicked &&
    css`
      border: 0.5px solid #467ced;
      color: #467ced;
    `}
`
