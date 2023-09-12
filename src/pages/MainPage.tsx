import { useEffect, useState } from 'react'

import { LocButtons, TimeSeries } from 'components'
import { dataAPI } from 'apis/data'
import { Data } from 'types/type'

import { MainStyled } from './MainPage.styled'

function MainPage() {
  const [datas, setDatas] = useState<Data[]>([])
  const [locs, setLocs] = useState<string[]>([])
  const [clickedLoc, setClickedLoc] = useState<Set<string>>(new Set())

  const locClicked = (loc: string) => {
    if (clickedLoc.has(loc)) {
      setClickedLoc((prev) => {
        prev.delete(loc)
        return new Set(prev)
      })
    } else {
      setClickedLoc((prev) => new Set(prev.add(loc)))
    }
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
      <TimeSeries datas={datas} clickedLoc={clickedLoc} locClicked={locClicked} />
    </MainStyled>
  )
}

export default MainPage
