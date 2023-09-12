import { useEffect, useState } from 'react'

import { LocButtons, TimeSeries } from 'components'

import { MainStyled } from './MainPage.styled'
import { dataAPI } from 'apis/data'
import { Data } from 'types/type'

function MainPage() {
  const [datas, setDatas] = useState<Data[]>([])
  const [locs, setLocs] = useState<string[]>([])
  const [clickedLoc, setClickedLoc] = useState<string>('')

  const locClicked = (loc: string) => {
    if (clickedLoc === loc) setClickedLoc('')
    else setClickedLoc(loc)
  }

  useEffect(() => {
    dataAPI.get().then((res) => {
      const unprocessedDatas = res.data.response
      const processedDatas = []
      const locsSet: Set<string> = new Set()

      for (const time in unprocessedDatas) {
        const unprocessedData = unprocessedDatas[time]

        processedDatas.push({
          time: time.split(' ')[1],
          loc: unprocessedData.id,
          valueArea: unprocessedData.value_area,
          valueBar: unprocessedData.value_bar,
        })

        locsSet.add(unprocessedData.id)
      }

      setLocs(Array.from(locsSet))
      setDatas(processedDatas)
    })
  }, [])

  return (
    <MainStyled>
      <LocButtons locs={locs} clickedLoc={clickedLoc} locClicked={locClicked} />
      <TimeSeries datas={datas} />
    </MainStyled>
  )
}

export default MainPage
