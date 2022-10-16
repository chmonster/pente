import React from 'react'
import { useParams } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { Pente } from '../game/Game'
import PenteBoard from './PenteBoard'
import { SocketIO } from 'boardgame.io/multiplayer'

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
  const playerid = useParams().playerid
  const gameid = useParams().gameid

  return (
    <section>
      <div>
        <PenteClient gameID={gameid | null} playerID={playerid | null} />
      </div>
    </section>
  )
}

export default Multiplayer
