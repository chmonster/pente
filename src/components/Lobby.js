import lobbyService from '../services/lobby'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const generateOption = match => {
  if (!match || !match.players) {
    return 'bad match'
  }

  const playerSpots = match.players.filter(player => !player.name)
  // console.log('playerSpots', playerSpots)

  switch (playerSpots.length) {
    case 0:
      return `${match.matchID} (spectate)`
    case 1:
      return `${match.matchID} (join as player ${playerSpots[0].id})`
    case 2:
      return `${match.matchID} (join as first player ${playerSpots[0].id})`
    default:
      return `parse for players failed`
  }
}

const Lobby = () => {
  const [matches, setMatches] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getMatches = async () => await lobbyService.listMatches()
    getMatches().then(response => setMatches(response.matches))
  }, [matches])

  const handleJoinSelect = async event => {
    event.preventDefault()
    let playerName = ''
    let playerID = ''
    let matchID = null
    if (event.target.value === 'newMatch') {
      await lobbyService.createMatch().then(response => {
        // console.log('createMatch', response)
        setMatches([...matches, response])
        matchID = response.matchID
        playerName = 'first'
        playerID = '0'
      })
    } else if (event.target.value && event.target.value !== 'default') {
      matchID = event.target.value
      playerName = 'second'
      playerID = '1'
    }

    await lobbyService.joinMatch(matchID, playerName, playerID).then(cred => {
      console.log('cred', cred, 'matches', matches, 'matchID', matchID)
      if (matchID) {
        navigate(`/${matchID}/${cred.playerID}`)
      }
    })
  }

  return (
    <>
      <label>Match ID:</label>
      <select name='match' id='match' onChange={handleJoinSelect}>
        <option key='default' value='default'>
          Select a match
        </option>
        <option key='newMatch' value='newMatch'>
          Start a new match
        </option>
        {matches &&
          matches.map(match => (
            <option key={match.matchID} value={match.matchID}>
              {generateOption(match)}
            </option>
          ))}
      </select>
    </>
  )
}

export default Lobby
