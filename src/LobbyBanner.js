import { Pente } from './Game'
import PenteBoard from './PenteBoard'
import { Lobby } from 'boardgame.io/react'

const LobbyBanner = () => {
  return (
    <>
      <Lobby
        gameServer={`localhost:8000`}
        lobbyServer={`localhost:8000`}
        gameComponents={[{ game: Pente, board: PenteBoard }]}
      />
    </>
  )
}

export default LobbyBanner
