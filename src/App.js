// import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Multiplayer from './Multiplayer'
import LobbyBanner from './LobbyBanner'

const Home = () => {
  const [gameCode, setGameCode] = useState('')

  const randomGameCode = () => {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = 0; i < 4; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  const newGameLink = `/${randomGameCode()}/0`
  const joinLink = () => `/${gameCode}/2`

  return (
    <>
      <Link to={newGameLink}>
        <button>New</button>
      </Link>

      <input
        id='heroGameCode'
        type='text'
        name='gameCode'
        placeholder='code'
        maxLength='4'
        value={gameCode}
        onChange={event => setGameCode(event.target.value)}
      />
      <Link to={joinLink()}>
        <button>Join</button>
      </Link>
      <Link to='/lobby'>
        <button>Lobby</button>
      </Link>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route key='1' path='/lobby' element={<LobbyBanner />} />
        <Route key='2' path='/:gameid/:playerid' element={<Multiplayer />} />
        <Route key='3' path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}
export default App
