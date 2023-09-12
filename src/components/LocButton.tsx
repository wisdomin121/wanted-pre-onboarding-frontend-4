import { LocButtonStyled } from './LocButton.styled'

interface LocButtonProps {
  loc: string
  isClicked: boolean
  locClicked: (loc: string) => void
}

function LocButton({ loc, isClicked, locClicked }: LocButtonProps) {
  return (
    <LocButtonStyled
      $isClicked={isClicked}
      onClick={() => {
        locClicked(loc)
      }}
    >
      {loc}
    </LocButtonStyled>
  )
}

export default LocButton
