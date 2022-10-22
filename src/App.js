import { useParams } from 'react-router-dom'
// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Multiplayer from './components/Multiplayer'
import Lobby from './components/Lobby'

const App = () => {
  const currentMatchID = useParams().matchID || null
  return (
    <>
      <Router>
        <Lobby currentMatchID={currentMatchID} />
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
