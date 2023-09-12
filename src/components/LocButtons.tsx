import { LocButton } from 'components'

import { LocButtonsStyled } from './LocButtons.styled'

interface LocButttonsProps {
  locs: string[]
  clickedLoc: string
  locClicked: (loc: string) => void
}

function LocButtons({ locs, clickedLoc, locClicked }: LocButttonsProps) {
  return (
    <LocButtonsStyled>
      {locs.map((loc: string, idx: number) => {
        return (
          <LocButton key={idx} loc={loc} isClicked={clickedLoc === loc} locClicked={locClicked} />
        )
      })}
    </LocButtonsStyled>
  )
}

export default LocButtons
