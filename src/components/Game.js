import React, { Component } from 'react';
import { Card, Button, Confirm } from 'semantic-ui-react';
import Board from './Board';
import History from './History';
import { ReadHistory, WriteHistory, EmptyHistory } from '../utils/LocalStorage';

class Game extends Component {
  constructor(props) {
    super();

    this.state = {
      xIsNext: true,
      winner: null,
      open: false,
      stepNumber: 0,
      sortASC: true,
    };

    EmptyHistory(props.size);
  }

  jumpTo = step => {
    // lay winner trong history
    const current = ReadHistory()[step];

    this.setState({
      xIsNext: step % 2 === 0,
      stepNumber: step,
      winner: current.winner,
    });
  };

  handleClick = (row, col) => {
    const { X, O, DRAW } = this.props;
    const { winner, xIsNext, stepNumber } = this.state;

    let history = ReadHistory().slice(0, stepNumber + 1);

    // clone 2d array. vì khi slice thì array 1d chỉ là tham chiếu địa chỉ
    const currentBoard = history[history.length - 1].board.map(arr => [...arr]);

    if (winner || currentBoard[row][col]) return;

    currentBoard[row][col] = xIsNext ? X : O;

    const result = this.isTerminated(currentBoard, row, col);

    let strWinner = null;
    if (!result.hasWinner && this.isFull(currentBoard)) strWinner = DRAW;
    else if (result.hasWinner) strWinner = currentBoard[row][col];

    history = history.concat([
      {
        board: currentBoard,
        lastPosition: { x: row, y: col },
        id: stepNumber + 1,
        winner: strWinner,
        points: result.points,
      },
    ]);

    WriteHistory(history);

    this.setState({
      xIsNext: !xIsNext,
      stepNumber: history.length - 1,
      winner: strWinner,
    });
  };

  resetGame = () => {
    const { size } = this.props;
    EmptyHistory(size);
    this.setState({
      xIsNext: true,
      winner: null,
      open: false,
      stepNumber: 0,
    });
  };

  toggleConfirm = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  checkingHorizontal = (board, row, col) => {
    const points = [];

    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];

    // count = 1 la vi tri hien tai.
    let count = 1;
    points.push({ row, col });

    // dem ve 2 ben
    for (let i = col - 1; i >= 0; i -= 1) {
      if (board[row][i] === curPlayer) {
        count += 1;
        points.push({ row, col: i });
      } else {
        if (board[row][i] !== null) {
          isBlockOutAbove = true;
        }
        break;
      }
    }
    for (let i = col + 1; i < size; i += 1) {
      if (board[row][i] === curPlayer) {
        count += 1;
        points.push({ row, col: i });
      } else {
        if (board[row][i] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return {
          hasWinner: true,
          points,
        };
      }
      return {
        hasWinner: !(isBlockOutAbove && isBlockOutBelow),
        points: !(isBlockOutAbove && isBlockOutBelow) ? points : [],
      };
    }
    // if (count >= numToWin) {
    //   if (count > numToWin) {
    //     return true;
    //   }
    //   return !(isBlockOutAbove && isBlockOutBelow);
    // }
    return {
      hasWinner: false,
      points: [],
    };
  };

  checkingVertical = (board, row, col) => {
    const points = [];
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];

    // count = 1 la vi tri hien tai.
    let count = 1;
    points.push({ row, col });

    // dem ve 2 ben
    for (let i = row - 1; i >= 0; i -= 1) {
      if (board[i][col] === curPlayer) {
        count += 1;
        points.push({ row: i, col });
      } else {
        if (board[i][col] !== null) {
          isBlockOutAbove = true;
        }
        break;
      }
    }
    for (let i = row + 1; i < size; i += 1) {
      if (board[i][col] === curPlayer) {
        count += 1;
        points.push({ row: i, col });
      } else {
        if (board[i][col] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return {
          hasWinner: true,
          points,
        };
      }
      return {
        hasWinner: !(isBlockOutAbove && isBlockOutBelow),
        points: !(isBlockOutAbove && isBlockOutBelow) ? points : [],
      };
    }
    return {
      hasWinner: false,
      points: [],
    };
  };

  checkingMainDiagonal = (board, row, col) => {
    const points = [];
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];
    // count = 1 la vi tri hien tai.
    let count = 1;
    points.push({ row, col });

    // dem ve 2 ben
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i -= 1, j -= 1) {
      if (board[i][j] === curPlayer) {
        count += 1;
        points.push({ row: i, col: j });
      } else {
        if (board[i][j] !== null) {
          isBlockOutAbove = true;
        }
        break;
      }
    }

    for (let i = row + 1, j = col + 1; i < size && j < size; i += 1, j += 1) {
      if (board[i][j] === curPlayer) {
        count += 1;
        points.push({ row: i, col: j });
      } else {
        if (board[i][j] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return {
          hasWinner: true,
          points,
        };
      }
      return {
        hasWinner: !(isBlockOutAbove && isBlockOutBelow),
        points: !(isBlockOutAbove && isBlockOutBelow) ? points : [],
      };
    }
    return {
      hasWinner: false,
      points: [],
    };
  };

  checkingSubDiagonal = (board, row, col) => {
    const points = [];
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];
    // count = 1 la vi tri hien tai.
    let count = 1;
    points.push({ row, col });

    // dem ve 2 ben
    for (let i = row - 1, j = col + 1; i >= 0 && j < size; i -= 1, j += 1) {
      if (board[i][j] === curPlayer) {
        count += 1;
        points.push({ row: i, col: j });
      } else {
        if (board[i][j] !== null) {
          isBlockOutAbove = true;
        }
        break;
      }
    }

    for (let i = row + 1, j = col - 1; i < size && j >= 0; i += 1, j -= 1) {
      if (board[i][j] === curPlayer) {
        count += 1;
        points.push({ row: i, col: j });
      } else {
        if (board[i][j] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return {
          hasWinner: true,
          points,
        };
      }
      return {
        hasWinner: !(isBlockOutAbove && isBlockOutBelow),
        points: !(isBlockOutAbove && isBlockOutBelow) ? points : [],
      };
    }
    return {
      hasWinner: false,
      points: [],
    };
  };

  isTerminated = (board, row, col) => {
    const retH = this.checkingHorizontal(board, row, col);
    const retV = this.checkingVertical(board, row, col);
    const retM = this.checkingMainDiagonal(board, row, col);
    const retS = this.checkingSubDiagonal(board, row, col);

    const desPoints = retH.points.concat(retV.points, retM.points, retS.points);

    for (let i = 0; i < desPoints.length - 1; i += 1) {
      for (let j = i + 1; j < desPoints.length; j += 1) {
        if (
          desPoints[i].row === desPoints[j].row &&
          desPoints[i].col === desPoints[j].col
        ) {
          desPoints.splice(i, 1);
        }
      }
    }

    const ret = {
      hasWinner:
        retH.hasWinner || retV.hasWinner || retM.hasWinner || retS.hasWinner,
      points: desPoints,
    };
    return ret;
  };

  isFull = board => {
    return board.every(row => {
      return row.every(cell => cell);
    });
  };

  toggleSort = () => {
    const { sortASC } = this.state;
    this.setState({
      sortASC: !sortASC,
    });
  };

  render() {
    /*

    history = [{
      board : ....,
      lastPosition: {x, y}
      id -> stepNumber,
      winner,
      points
    }]

    */
    const history = ReadHistory();

    const { xIsNext, open, winner, stepNumber, sortASC } = this.state;
    const { board: current, points } = history[stepNumber];

    const { X, O } = this.props;

    const player = xIsNext ? X : O;

    const showPlayer = () => {
      if (winner) {
        return (
          <>
            Winner: &nbsp;
            <span className={`player${` ${winner}`}`}>{winner}</span>
          </>
        );
      }

      return (
        <>
          Player: &nbsp;
          <span className={`player${` ${player}`}`}>{player}</span>
        </>
      );
    };

    return (
      <div className='game-wrapper'>
        <Card className='game-info'>
          <Card.Content>
            <Card.Header as='h1'>Caro Vietnam - v2</Card.Header>
            <Card.Description>
              <p>{showPlayer()}</p>

              <Button size='small' onClick={this.toggleConfirm}>
                Reset game
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>

        <Board
          points={points}
          board={current}
          xIsNext={xIsNext}
          onClick={this.handleClick}
          winner={winner}
        />

        <History
          history={history}
          sort={sortASC}
          toggleSort={this.toggleSort}
          jumpTo={this.jumpTo}
          selected={stepNumber}
        />

        <Confirm
          open={open}
          size='tiny'
          header='Reset game'
          content='Do you want to reset this game?'
          onCancel={this.toggleConfirm}
          onConfirm={this.resetGame}
        />
      </div>
    );
  }
}

Game.defaultProps = {
  size: 20,
  numToWin: 5,
  X: 'X',
  O: 'O',
  DRAW: 'XO',
};

export default Game;
