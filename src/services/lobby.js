import { LobbyClient } from 'boardgame.io/client'

// const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' })
const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' })

// const game = async () => await lobbyClient.listGames()[0]
const game = 'pente'

const listMatches = async () => {
  return await lobbyClient.listMatches(game)
  // const matchesList = matchObj.matches
  // console.log('listMatches', matchesList)
  // return matchesList.map(match => match.matchID)
}

const getMatch = async matchID => await lobbyClient.getMatch(game, matchID)

const createMatch = async () =>
  await lobbyClient.createMatch(game, { numPlayers: 2 })

const joinMatch = async (matchID, playerName, playerID) => {
  return await lobbyClient.joinMatch(game, matchID, {
    playerName,
    playerID,
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getMatch, listMatches, createMatch, joinMatch }
