import { ThemeProvider } from 'styled-components'

import PageRouter from './pages/PageRouter'
import { Theme } from './styles/DefaultTheme'

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <PageRouter />
    </ThemeProvider>
  )
}

export default App
