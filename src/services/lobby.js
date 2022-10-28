import { LobbyClient } from 'boardgame.io/client'

const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' })

const game = 'pente'

const getMatchByID = async matchID => await lobbyClient.getMatch(game, matchID)
// returns:
// {
//   "gameName": "pente",
//   "unlisted": false,
//   "players": [
//     {
//       "id": 0,
//       "name": "Wilbur"
//     },
//     {
//       "id": 1,
//       "name": "George"
//     }
//   ],
//   "createdAt": 1666100124797,
//   "updatedAt": 1666100124797,
//   "matchID": "10charStr."
// }

const listMatches = async () => {
  return await lobbyClient.listMatches(game)
}
//returns
// {
//   matches:
//   [
//   ...list of match objects
//   ]
// }
//

const createMatch = async () => {
  return await lobbyClient
    .createMatch(game, { numPlayers: 2 }) //returns matchID only
    .then(response => getMatchByID(response.matchID))
}
//returns match object

const joinMatch = async (matchID, playerName, playerID) => {
  return await lobbyClient.joinMatch(game, matchID, {
    playerName,
    playerID,
  })
}
//returns:
// {
//   "playerID": "0",
//   "playerCredentials": "credentialGibberish"
// }

const playAgain = async (matchID, playerID, credentials) => {
  return await lobbyClient
    .playAgain(game, matchID, {
      playerID,
      credentials,
    })
    .then(response => getMatchByID(response.nextMatchID))
}
//returns:

// eslint-disable-next-line import/no-anonymous-default-export
export default { getMatchByID, listMatches, createMatch, joinMatch, playAgain }
