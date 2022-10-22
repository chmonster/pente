import lobbyService from '../services/lobby'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Lobby = ({ currentMatchID }) => {
  const [matches, setMatches] = useState(null)
  const [playerName, setPlayerName] = useState('')
  const [selection, setSelection] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getMatches = async () => await lobbyService.listMatches()
    getMatches().then(response => setMatches(response.matches))
  }, [matches])

  const handleNewMatch = async event => {
    event.preventDefault()
    await lobbyService.createMatch().then(response => {
      setMatches([...matches, response])
      setSelection(response.matchID)
    })
  }

  const handleJoinSelect = async () => {
    const [matchID, playerID] =
      selection !== 'default' ? selection.split('+') : ['', '']

    console.log('handleJoinSelect', matchID, playerID, playerName)

    if (playerID !== 'S') {
      await lobbyService
        .joinMatch(matchID, playerName || 'default', playerID)
        .then(newCred => {
          sessionStorage.setItem(
            matchID,
            JSON.stringify({
              credentials: newCred.playerCredentials,
              playerID: newCred.playerID,
              playerName: playerName || 'default',
            })
          )
        })
        .then(() => {
          navigate(`/${matchID}/${playerID}`)
        })
    } else if (playerID === 'S') {
      console.log('spectate', matchID)
      navigate(`/${matchID}`)
    }
    setSelection('default')
    setPlayerName('')
  }

  const matchOption = match => {
    if (!match) {
      console.log('bad match')
      return null
    }

    const playersIn = match.players.filter(player => player.name)
    // console.log('playersIn', playersIn)

    const rejoin = JSON.parse(sessionStorage.getItem(match.matchID)) || null

    switch (playersIn.length) {
      case 0: //give two options to start game as either
        return (
          <>
            <option
              value={match.matchID.concat('+0')}
              key={match.matchID.concat('+0')}
            >
              {`${match.matchID} as 0 (play first)`}
            </option>
            <option
              value={match.matchID.concat('+1')}
              key={match.matchID.concat('+1')}
            >
              {`${match.matchID} as 1 (play second)`}
            </option>
          </>
        )
      case 1: //offer the unoccupied spot or rejoin and wait
        const unoccupiedID = playersIn[0].id === 0 ? '1' : '0'
        return (
          <>
            <option
              value={match.matchID.concat('+').concat(unoccupiedID)}
              key={match.matchID.concat('+').concat(unoccupiedID)}
            >
              {`${match.matchID} join as ${unoccupiedID} vs ${playersIn[0].name}`}
            </option>
            {rejoin && (
              <option
                value={match.matchID.concat('+').concat(rejoin.playerID)}
                key={match.matchID.concat('+').concat(rejoin.playerID)}
              >
                {`${match.matchID} rejoin as ${rejoin.playerID}`}
              </option>
            )}
          </>
        )
      case 2:
        const opponent = rejoin
          ? playersIn.filter(player => player.id !== rejoin.playerID)
          : null

        return (
          <>
            {!rejoin && (
              <option
                value={match.matchID.concat('+S')}
                key={match.matchID.concat('+S')}
              >
                {`${match.matchID} spectate (${playersIn[0].name} vs ${playersIn[1].name})`}
              </option>
            )}
            {rejoin && (
              <option
                value={match.matchID.concat('+').concat(rejoin.playerID)}
                key={match.matchID.concat('+').concat(rejoin.playerID)}
              >
                {`${match.matchID} rejoin as ${rejoin.playerID} vs ${opponent[0].name}`}
              </option>
            )}
          </>
        )
      default:
        console.log('match not processed')
        return null
    }
  }

  return (
    <>
      <button key='newMatch' onClick={handleNewMatch}>
        Start a new match
      </button>
      <label htmlFor='player' key='playerLabel'>
        Player Name:
      </label>
      <input
        type='text'
        id='player'
        key='player'
        onInput={e => setPlayerName(e.target.value)}
      />
      <label htmlFor='match' key='matchLabel'>
        Match ID:
      </label>
      <select
        name='match'
        id='match'
        key='match'
        onChange={e => setSelection(e.target.value)}
      >
        <option key='default' value='default'>
          Select a match
        </option>
        {matches &&
          matches.map(match =>
            match.id !== currentMatchID ? matchOption(match) : null
          )}
      </select>
      <button key='join' onClick={handleJoinSelect}>
        Go
      </button>
    </>
  )
}

export default Lobby
