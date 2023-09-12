import styled, { css } from 'styled-components'

export const LocButtonStyled = styled.button<{ $isClicked: boolean }>`
  padding: 4px 8px;
  border: 0.5px solid ${({ theme }) => theme.colors.unclickedButton};
  border-radius: 20px;
  background-color: white;
  text-align: center;
  color: ${({ theme }) => theme.colors.unclickedButton};
  cursor: pointer;

  &:hover {
    border: 0.5px solid ${({ theme }) => theme.colors.clickedButton};
    color: ${({ theme }) => theme.colors.clickedButton};
  }

  ${({ $isClicked }) =>
    $isClicked &&
    css`
      border: 0.5px solid ${({ theme }) => theme.colors.clickedButton};
      color: ${({ theme }) => theme.colors.clickedButton};
    `}
`
