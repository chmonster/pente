// import { useParams } from 'react-router-dom'
// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Multiplayer from './components/Multiplayer'
import Lobby from './components/Lobby'

const App = () => {
  return (
    <>
      <Router>
        <Lobby />
        <Routes>
          <Route path='/:matchID/:playerID' element={<Multiplayer />} />
          <Route path='/:matchID' element={<Multiplayer />} />
          <Route path='/' element={<Multiplayer />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
