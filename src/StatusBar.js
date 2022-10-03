import {
  stoneVictory,
  whiteStone,
  blackStone,
  dot,
  cellSize,
} from './constants'
import { Row, Col, Container } from 'react-bootstrap'

const StatusBar = ({ G, ctx }) => {
  const showWinner = ctx.gameover && ctx.gameover.winner !== undefined
  const showTie = ctx.gameover && ctx.gameover.winner === undefined
  const showTurn = !ctx.gameover

  //add rematch prompt
  // const { nextMatchID } = await lobbyClient.playAgain('tic-tac-toe', 'matchID', {
  //   playerID: '0',
  //   credentials: 'playerCredentials',
  // })

  return (
    <>
      <Container fluid as='header'>
        {showWinner && (
          <Row
            id='winner'
            className='header-text'
            style={{ height: cellSize(1), fontSize: cellSize(0.5) }}
          >
            <Col id='outcome'>
              Winner: {ctx.gameover.winner === '0' ? whiteStone : blackStone}
            </Col>
          </Row>
        )}
        {showTie && (
          <Row
            id='winner'
            className='header-text'
            style={{ height: cellSize(1), fontSize: cellSize(0.5) }}
          >
            <Col id='outcome'>Draw!</Col>
          </Row>
        )}
        {showTurn && (
          <Row
            id='report'
            className='header-text'
            style={{ height: cellSize(1), fontSize: cellSize(0.5) }}
          >
            <Col id='cap0'>
              {whiteStone}: {blackStone.repeat(G.score['0'])}
              {dot.repeat(stoneVictory - G.score['0'])}
              {dot.repeat()}
            </Col>
            <Col id='toplay'>
              {ctx.currentPlayer === '1' ? blackStone : whiteStone} to play
            </Col>
            <Col id='cap1'>
              {blackStone}: {whiteStone.repeat(G.score['1'])}
              {dot.repeat(stoneVictory - G.score['1'])}
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}

export default StatusBar
