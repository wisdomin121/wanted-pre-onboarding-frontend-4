import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainPage from './MainPage'
import NotFoundPage from './NotFoundPage'

function PageRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter
