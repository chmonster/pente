import lobbyService from '../services/lobby'
import MatchOptions from './MatchOptions'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Lobby = () => {
  const [matches, setMatches] = useState(null)
  const [playerName, setPlayerName] = useState('default')

  const navigate = useNavigate()

  useEffect(() => {
    const getMatches = async () => await lobbyService.listMatches()
    getMatches().then(response => setMatches(response.matches))
  }, [matches])

  const decodeMatchOption = async option => {
    if (option !== 'default') {
      if (option === 'newMatch') {
        handleNewMatch()
      } else {
        const [matchID, playerID] = option.split('+')
        if (playerID === 'S') {
          navigate(`/${matchID}`)
        } else if (playerID === 'R') {
          if (sessionStorage.getItem(matchID)) {
            const credentials =
              JSON.parse(sessionStorage.getItem(matchID)).credentials || null
            const prevPlayerID =
              JSON.parse(sessionStorage.getItem(matchID)).id || null
            await lobbyService.playAgain(matchID, prevPlayerID, credentials)
          }
        } else {
          //not viewing as spectator
          if (!sessionStorage.getItem(matchID)) {
            await lobbyService
              .joinMatch(matchID, playerName || 'default', playerID)
              //store credential data
              .then(newCred => {
                console.log('newCred', newCred)
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
        }
      }
    }
  }

  const handleNewMatch = async () => {
    // event.preventDefault()
    await lobbyService.createMatch().then(response => {
      setMatches([...matches, response])
    })
  }

  return (
    <>
      <Link to='/'>Home</Link>
      <label htmlFor='player' key='playerLabel'>
        Player Name:
      </label>
      <input type='text' onInput={e => setPlayerName(e.target.value)} />
      <MatchOptions matches={matches} handler={decodeMatchOption} />
    </>
  )
}

export default Lobby
