# 원티드 프리온보딩 인턴십 프론트엔드 - 4주차 과제

원티드 프리온보딩 인턴십 프론드엔드에서 4주차 과제로 진행한  
**주어진 데이터를 기반으로 시계열 차트 제작**하여 웹사이트를 구축하는 프로젝트 입니다 :)

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/Node.js v18 (LTS)-grey?style=for-the-badge&logo=nodedotjs"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>

### Convention

<img src="https://img.shields.io/badge/husky-brown?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/lint staged-white?style=for-the-badge&logo=npm"> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

### Network & Route

<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/styled component-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

## 프로젝트 실행 방법

[배포된 사이트](https://wanted-pre-onboarding-frontend-4.vercel.app/)로 확인하시거나, 아래의 과정을 실행해주세요 !!

1. 우측 상단의 `Code`버튼 -> `Download ZIP`을 눌러 프로젝트를 다운로드 하시거나,
   아래의 명령어를 사용해 프로젝트를 clone 해주세요.
   
     ```
     npm clone https://github.com/wisdomin121/wanted-pre-onboarding-frontend-4.git
     ```
2. 프로젝트 다운로드가 끝났다면, 해당 디렉토리로 이동해 프로젝트에 필요한 패키지를 설치해주세요.
   
     ```
     npm install
     ```
     
3. 패키지 설치가 끝났다면, 다음 명령어를 사용해 실행시켜주세요 !
     ```
     npm start
     ```

## 배포 링크 및 데모 영상

배포는 `Vercel`을 사용했습니다 :)  
https://wanted-pre-onboarding-frontend-3.vercel.app/



https://github.com/wisdomin121/wanted-pre-onboarding-frontend-4/assets/46989954/feff632e-d228-41aa-860d-954e3dbddf8b



## 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┣ 📂pages
 ┣ 📂styles
 ┣ 📂types
```

## 기능 설명

**1. 그래프 라이브러리 선택**

초반에는 **ApexCharts.js**의 [Line Column Area](https://apexcharts.com/react-chart-demos/mixed-charts/line-column-area/)를 사용해 구현하려고 했습니다.   
하지만, 사용하다 보니 한 가지의 문제점이 생겼습니다.   
```
bar그래프가 무조건 맨 앞에 위치한다.
-> 과제의 데이터는 bar 그래프가 더 높이 있기 때문에 area 그래프가 제대로 보이지 않았다.
-> series의 순서를 바꾸면 된다고 했지만, 적용이 되지 않았다.
```
약간은 사소한 문제점일 수도 있지만, 과제의 의도와는 맞지 않는다고 생각해 라이브러리를 변경하게 되었습니다.   
   
그렇게 여러 라이브러리를 찾아보다가 **Recharts**의 [LineBarAreaComposedChart](https://recharts.org/en-US/examples/LineBarAreaComposedChart)가 기존에 선택했던 ApexCharts.js의 Line Column Area와 비슷해 과제를 구현하기에 알맞다고 생각이 들어서 해당 라이브러리를 선택하게 되었습니다. 

---

**2. 시계열 차트 만들기**   
   
- 주어진 데이터를 json-server를 사용해 api화 시킨다.
  - 배포 github : https://github.com/wisdomin121/wanted-pre-onboarding-frontend-4-json-server
  - 배포 주소 : https://wanted-pre-onboarding-frontend-4-json-server.vercel.app/

- axios를 통해 불러와 데이터를 재구성하여 datas에 저장한다다.
  ```
  // src/pages/MainPage.tsx
  const [datas, setDatas] = useState<Data[]>([])

  useEffect(() => {
    dataAPI.get().then((res) => {
      const unprocessedDatas = res.data.response
      const processedDatas = []

      for (const time in unprocessedDatas) {
        const unprocessedData = unprocessedDatas[time]

        processedDatas.push({
          time: time.split(' ')[1],
          loc: unprocessedData.id,
          valueArea: unprocessedData.value_area,
          valueBar: unprocessedData.value_bar,
        })
      }
      setDatas(processedDatas)
    })
  }, [])
  ```

- ReCharts를 사용해 그래프를 그려준다.
  ```
  // src/components/TimeSeries.tsx
  
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
  ```

---

3. **호버 기능 구현**   

- CustomTooltip 컴포넌트를 만든다. (id, value_area, value_bar 포함)
  ```
  // src/components/CustomTooltip.tsx
  
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
  ```

- Tooltip content에 넣어준다.
  ```
  // src/components/TimeSeries.tsx
  
  <Tooltip content={<CustomTooltip />} />
  ```

---

4. **필터링 기능 구현**

- 지역이름을 가진 버튼 컴포넌트 생성하고, 그래프 위에 위치시킨다.
  ```
  // src/components/LocButton.tsx

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
  ```
  ```
  // src/components/LocButtons.tsx
  
  function LocButtons({ locs, clickedLoc, locClicked }: LocButttonsProps) {
    return (
      <LocButtonsStyled>
        {locs.map((loc: string, idx: number) => {
          return (
            <LocButton key={idx} loc={loc} isClicked={clickedLoc.has(loc)} locClicked={locClicked} />
          )
        })}
      </LocButtonsStyled>
    )
  }
  ```
  ```
  // src/pages/MainPage.tsx

  <MainStyled>
    <LocButtons locs={locs} clickedLoc={clickedLoc} locClicked={locClicked} />
    <TimeSeries datas={datas} clickedLoc={clickedLoc} locClicked={locClicked} />
  </MainStyled>
  ```

- 클릭된 버튼을 set객체로 관리한다.
  ```
  // src/pages/MainPage.tsx

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
  ```

- clickedLoc에 포함되어 있는 지역이라면, 색상을 변경시켜준다.
  ```
  // src/components/TimeSeries.tsx
  
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
  ```
