import { Client } from 'boardgame.io/react'
import { Pente } from './Game'
import { PenteBoard } from './Board'

const App = Client({
  game: Pente,
  board: PenteBoard,
})

export default App
