import React from 'react'
import { useParams } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { Pente } from '../game/Game'
import PenteBoard from './PenteBoard'
import { SocketIO } from 'boardgame.io/multiplayer'
// import lobbyClient from '../services/lobby'

const PenteClient = Client({
  game: Pente,
  board: PenteBoard,
  debug: true,
  numPlayers: 2,
  multiplayer: SocketIO({
    server: `localhost:8000`,
  }),
})

const Multiplayer = () => {
  const playerID = useParams().playerID || null
  const matchID = useParams().matchID || null
  console.log('multiplayer', matchID, playerID)

  // const fetchMatch = async () => await lobbyClient.getMatchByID(matchID)
  // const match = fetchMatch()

  return (
    <section>
      <div>
        <PenteClient matchID={matchID} playerID={playerID} debug={false} />
      </div>
    </section>
  )
}

export default Multiplayer
