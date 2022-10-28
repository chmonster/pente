import { useState } from 'react'
import { useParams } from 'react-router-dom'

const MatchOptions = ({ matches, handler }) => {
  const [selection, setSelection] = useState('default')
  const { matchID } = useParams()

  const matchOption = match => {
    if (!match) {
      console.log('bad match')
      return null
    }

    // //fetch credentials for this match and this session, if they exist
    const sessionMatch =
      JSON.parse(sessionStorage.getItem(match.matchID)) || null

    const isInAs = idx =>
      sessionMatch &&
      match.players[idx].id.toString() === sessionMatch.id &&
      match.players[idx].name.toString() === sessionMatch.name

    const isEmpty = match.players.filter(player => player.name).length === 0
    const oneSpotOpen = match.players.filter(player => player.name).length === 1
    const isFull = match.players.filter(player => player.name).length === 2

    if (isEmpty) {
      //offer both spots
      return (
        <>
          <option
            value={match.matchID.concat('+0')}
            key={match.matchID.concat('+0')}
          >
            {`${match.matchID} join as 0 (play first)`}
          </option>
          <option
            value={match.matchID.concat('+1')}
            key={match.matchID.concat('+1')}
          >
            {`${match.matchID} join as 1 (play second)`}
          </option>
        </>
      )
    }

    if (oneSpotOpen) {
      const filledSpot = match.players[0].name ? 0 : 1
      const emptySpot = match.players[0].name ? 1 : 0

      if (isInAs(filledSpot)) {
        return (
          <option
            value={match.matchID.concat('+').concat(sessionMatch.id)}
            key={match.matchID.concat('+').concat(sessionMatch.id)}
          >
            {`${match.matchID} rejoin as ${sessionMatch.id}`}
          </option>
        )
      }
      return (
        <option
          value={match.matchID.concat('+').concat(emptySpot.toString())}
          key={match.matchID.concat('+').concat(emptySpot.toString())}
        >
          {`${match.matchID} join as ${emptySpot} vs ${match.players[filledSpot].name}`}
        </option>
      )
    }

    if (isFull) {
      const spectator = !isInAs(0) && !isInAs(1)
      if (spectator) {
        return (
          <option
            value={match.matchID.concat('+S')}
            key={match.matchID.concat('+S')}
          >
            {`${match.matchID} spectate (${match.players[0].name} vs ${match.players[1].name})`}
          </option>
        )
      }

      if (match.gameover) {
        return match.players.map((player, idx) => {
          if (!isInAs(idx)) {
            return (
              <option
                value={match.matchID.concat('+').concat('R')}
                key={match.matchID.concat('+').concat('R')}
              >
                {`${match.matchID} create rematch vs ${player.name}`}
              </option>
            )
          } else {
            return null
          }
        })
      }

      //offer to rejoin game
      return match.players.map((player, idx) => {
        if (!isInAs(idx)) {
          return (
            <option
              value={match.matchID.concat('+').concat(sessionMatch.id)}
              key={match.matchID.concat('+').concat(sessionMatch.id)}
            >
              {`${match.matchID} rejoin as ${sessionMatch.id} vs ${player.name}`}
            </option>
          )
        } else {
          return null
        }
      })
    }
  }

  return (
    <>
      <select value={selection} onChange={e => setSelection(e.target.value)}>
        <option value='default'>Select a match</option>
        {matches &&
          matches.flatMap(match =>
            match.matchID !== matchID ? matchOption(match) : null
          )}
      </select>
      <button onClick={() => handler(selection)}>Go</button>
    </>
  )
}

export default MatchOptions
