import { Client } from 'boardgame.io/react'
import { Isolation } from './Game'
import { IsolationBoard } from './Board'

const App = Client({
  game: Isolation,
  board: IsolationBoard,
})

export default App
