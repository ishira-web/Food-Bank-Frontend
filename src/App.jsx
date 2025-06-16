import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import OurStoryPage from './Pages/OurStoryPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/our-story' element ={<OurStoryPage/>}/>
    </Routes>
  )
}

export default App