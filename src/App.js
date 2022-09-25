import { Client } from 'boardgame.io/react'
// import { Local } from 'boardgame.io/multiplayer'
import { SocketIO } from 'boardgame.io/multiplayer'
import { Pente } from './Game'
import { PenteBoard } from './Board'

const PenteClient = Client({
  game: Pente,
  board: PenteBoard,
  // multiplayer: Local({
  //   // Enable localStorage cache.
  //   persist: true,

  //   // Set custom prefix to store data under. Default: 'bgio'.
  //   storageKey: 'bgio',
  // }),
  multiplayer: SocketIO({ server: 'localhost:8000' }),
})

const App = () => (
  <div>
    <PenteClient />
  </div>
)

export default App
