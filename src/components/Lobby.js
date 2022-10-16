import lobbyService from '../services/lobby'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
  const [matches, setMatches] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getMatches = async () => await lobbyService.listMatches()
    getMatches().then(response =>
      setMatches(response.matches.map(match => match.matchID))
    )
  }, [])

  const handleJoinSelect = async event => {
    event.preventDefault()
    let playerName = ''
    let playerID = ''
    let matchID = null
    if (event.target.value === 'newGame') {
      const matchToJoin = await lobbyService.createMatch()
      setMatches([...matches, matchToJoin.matchID])
      matchID = matchToJoin.matchID
      playerName = 'first'
      playerID = '0'
    } else if (event.target.value && event.target.value !== 'default') {
      matchID = event.target.value
      playerName = 'second'
      playerID = '1'
    }

    const cred = await lobbyService.joinMatch(matchID, playerName, playerID)

    console.log('cred', cred, 'matches', matches, 'matchID', matchID)
    if (matchID) {
      navigate(`/${matchID}/${cred.playerID}`)
    }
  }

  return (
    <>
      <select name='match' id='match' onChange={handleJoinSelect}>
        <option key='default' value='default'>
          Select a game
        </option>
        <option key='newGame' value='newGame'>
          New Game
        </option>
        {matches &&
          matches.map(match => (
            <option key={match} value={match}>
              {match}
            </option>
          ))}
      </select>
    </>
  )
}

export default Lobby
