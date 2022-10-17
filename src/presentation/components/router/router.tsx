import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type props = {
  MakeLogin: React.FC
}

const Router: React.FC<props> = ({ MakeLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
