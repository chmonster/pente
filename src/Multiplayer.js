/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { Client } from 'boardgame.io/react'
import { Pente } from './Game'
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
  if (!(playerid === '0' || playerid === '1')) {
    console.log('playerid', playerid)
    return (
      <div>
        <p>Invalid playerID</p>
        <p>Must be 0 (white) or 1 (black)</p>
      </div>
    )
  }
  return (
    <section>
      <h1>Pente</h1>
      <div>
        <PenteClient gameID={gameid} playerID={playerid} />
      </div>
    </section>
  )
}

export default Multiplayer

/* 
//resign 

await lobbyClient.leaveMatch('tic-tac-toe', 'matchID', {
  playerID: '0',
  credentials: 'playerCredentials',
});
*/
