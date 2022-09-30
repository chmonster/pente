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
    server: `${window.location.protocol}//${window.location.hostname}:8000`,
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
    <section className='drawWrapper'>
      <h1 className='title'>Pente</h1>
      <div className='gameContainer'>
        <PenteClient gameID={gameid} playerID={playerid} />
      </div>
    </section>
  )
}

export default Multiplayer
