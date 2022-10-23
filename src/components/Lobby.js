import lobbyService from '../services/lobby'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const Lobby = () => {
  const [matches, setMatches] = useState(null)
  const [playerName, setPlayerName] = useState('')
  const [selection, setSelection] = useState('default')
  // const [credentials, setCredentials] = useState({})
  const navigate = useNavigate()
  const { matchID } = useParams()

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
    //get match and player ID from option value
    if (selection !== 'default') {
      const [matchID, playerID] =
        selection !== 'default' ? selection.split('+') : ['', '']

      // console.log('handleJoinSelect', matchID, playerID, playerName)

      if (playerID !== 'S') {
        //not viewing as spectator
        if (!sessionStorage.getItem(matchID)) {
          await lobbyService
            .joinMatch(matchID, playerName || 'default', playerID)
            //store credential data
            .then(newCred => {
              sessionStorage.setItem(
                matchID,
                JSON.stringify({
                  credentials: newCred.playerCredentials,
                  id: newCred.playerID,
                  name: playerName || 'default',
                })
              )
            })
        }
        navigate(`/${matchID}/${playerID}`)
      } else if (playerID === 'S') {
        navigate(`/${matchID}`)
      }
    }
    setSelection('default')
    setPlayerName('')
  }

  const matchOption = match => {
    if (!match) {
      console.log('bad match')
      return null
    }

    // //fetch credentials for this match and this session, if they exist
    const sessionMatch =
      JSON.parse(sessionStorage.getItem(match.matchID)) || null
    //will have credential, id, name stored for this match

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
      <Link to='/'>Home</Link>
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
            match.matchID !== matchID ? matchOption(match) : null
          )}
      </select>
      <button key='join' onClick={handleJoinSelect}>
        Go
      </button>
    </>
  )
}

export default Lobby
