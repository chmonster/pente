// import { useParams } from 'react-router-dom'
// import { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Multiplayer from './components/Multiplayer'
import Lobby from './components/Lobby'

const App = () => {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route key='1' path='/lobby' element={<LobbyBanner />} />
  //       <Route key='2' path='/:gameid/:playerid' element={<Multiplayer />} />
  //       <Route key='3' path='/' element={<Home />} />
  //     </Routes>
  //   </Router>
  // )
  return (
    <>
      <Router>
        <Lobby />
        <Multiplayer />
      </Router>
    </>
  )
}
export default App
