import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { stone } from '../game/constants'

const MatchOptions = ({ matches, handler }) => {
  const [selection, setSelection] = useState('default')
  const [buttonText, setButtonText] = useState('Select an option')

  const handleOptionChange = e => {
    // console.log(
    //   'handleOptionChange',
    //   e.target.value.charAt(e.target.value.length - 1)
    // )
    e.preventDefault()
    setSelection(e.target.value)
    switch (e.target.value.charAt(e.target.value.length - 1)) {
      case '0':
        setButtonText('Go to this match')
        break
      case '1':
        setButtonText('Go to this match')
        break
      case 'h': //newMatch
        setButtonText('Create new match')
        break
      case 'S':
        setButtonText('Watch this match')
        break
      case 'R':
        setButtonText('Start the rematch')
        break
      default:
        setButtonText('Select an option')
        break
    }
  }

  const { matchID } = useParams()

  const matchOption = match => {
    if (!match) {
      console.log('bad match')
      return null
    }

    // //fetch credentials for this match and this session, if they exist

    const encodeMatchID = (match, code) =>
      match.matchID.concat('+').concat(code)

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
          <option value={encodeMatchID(match, 0)} key={encodeMatchID(match, 0)}>
            {`${match.matchID} join as ${stone('0')} (play first)`}
          </option>
          <option value={encodeMatchID(match, 1)} key={encodeMatchID(match, 1)}>
            {`${match.matchID} join as ${stone('1')} (play second)`}
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
            value={encodeMatchID(match, sessionMatch.id)}
            key={encodeMatchID(match, sessionMatch.id)}
          >
            {`${match.matchID} rejoin as ${stone(sessionMatch.id)}`}
          </option>
        )
      }
      return (
        <option
          value={encodeMatchID(match, emptySpot.toString())}
          key={encodeMatchID(match, emptySpot.toString())}
        >
          {`${match.matchID} join as ${stone(emptySpot)} vs ${
            match.players[filledSpot].name
          }`}
        </option>
      )
    }

    if (isFull) {
      const spectator = !isInAs(0) && !isInAs(1)
      if (spectator) {
        return (
          <option
            value={encodeMatchID(match, 'S')}
            key={encodeMatchID(match, 'S')}
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
                value={encodeMatchID(match, 'R')}
                key={encodeMatchID(match, 'R')}
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
              value={encodeMatchID(match, sessionMatch.id)}
              key={encodeMatchID(match, sessionMatch.id)}
            >
              {`${match.matchID} rejoin as ${stone(sessionMatch.id)} vs ${
                player.name
              }`}
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
      <select value={selection} onChange={handleOptionChange}>
        <option value='default'>Select a match</option>
        <option value='newMatch'>New match</option>
        {matches &&
          matches.flatMap(match =>
            match.matchID !== matchID ? matchOption(match) : null
          )}
      </select>
      <button onClick={() => handler(selection)}>{buttonText}</button>
    </>
  )
}

export default MatchOptions
