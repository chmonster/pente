// import { Pente } from './Game'
// import PenteBoard from './PenteBoard'
import { LobbyClient } from 'boardgame.io/client'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const LobbyBanner = () => {
  const [matches, setMatches] = useState(null)
  // const [cred, setCred] = useState(null)
  const navigate = useNavigate()

  const lobbyClient = useMemo(
    () => new LobbyClient({ server: 'http://localhost:8000' }),
    []
  )

  useEffect(() => {
    const fetchMatches = async () => {
      const games = await lobbyClient.listGames()
      const fetchedMatches = await lobbyClient.listMatches(games[0])
      if (fetchedMatches) {
        setMatches(fetchedMatches.matches.map(match => match.matchID))
      }
    }
    fetchMatches()
    if (matches) {
      console.log('useEffect matches', matches)
    }
  }, [matches, lobbyClient])

  const handleJoinSelect = async event => {
    event.preventDefault()
    let playerName = ''
    let matchID = null
    if (event.target.value === 'newGame') {
      const matchToJoin = await lobbyClient.createMatch('pente', {
        numPlayers: 2,
      })
      setMatches([...matches, matchToJoin.matchID])
      matchID = matchToJoin.matchID
      playerName = 'first'
    } else if (event.target.value && event.target.value !== 'default') {
      matchID = event.target.value
      playerName = 'second'
    }

    const cred = await lobbyClient.joinMatch('pente', matchID, {
      playerName: playerName,
    })

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

export default LobbyBanner

/*
//choose player display name
await lobbyClient.updatePlayer('tic-tac-toe', 'matchID', {
  playerID: '0',
  credentials: 'playerCredentials',
  newName: 'Al',
});

//create match (players)
const { matchID } = await lobbyClient.createMatch('tic-tac-toe', {
  numPlayers: 2
});

//choose match (dropdown)
const { matches } = await lobbyClient.listMatches('tic-tac-toe');

//join match
const { playerCredentials } = await lobbyClient.joinMatch(
  'tic-tac-toe',
  'matchID',
  {
    playerID: '0',
    playerName: 'Alice',
  }
);


//exit match


//exit lobby
*/
