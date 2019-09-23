import React, { Component } from 'react';
import { Card, Button, Confirm } from 'semantic-ui-react';
import Board from './Board';
import History from './History';
import ResultModal from './ResultModal';

class Game extends Component {
  constructor(props) {
    super();

    this.state = {
      board: new Array(props.size).fill(null)
        .map(() => new Array(props.size).fill(null)),
      xIsNext: Math.random() >= 0.5,
      isStart: true,
      winner: null,
      open: false,
      resultModal: false,
      points: [],
    };
  }

  handleClick = (row, col) => {
    const { X, O } = this.props;
    const { isStart, winner, board, xIsNext } = this.state;
    if (!isStart || winner || board[row][col]) return;

    const cloneBoard = [...board];
    cloneBoard[row][col] = xIsNext ? X : O;

    this.setState(
      prevState => ({
        board: cloneBoard,
        xIsNext: !prevState.xIsNext,
      }),
      () => {
        const hasWinner = this.isTerminated(row, col);
        // draw
        if (this.isFull() && !hasWinner) {
          this.setDraw();
          return;
        }
        if (hasWinner) {
          this.endGame(cloneBoard[row][col]);
        }
      },
    );
  };

  resetGame = () => {
    const { size } = this.props;
    this.setState({
      board: new Array(size).fill(null).map(() => new Array(size).fill(null)),
      xIsNext: Math.random() >= 0.5,
      isStart: true,
      winner: null,
      open: false,
      resultModal: false,
    });
  };

  toggleConfirm = () => {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  };

  toggleResultModal = () => {
    const { resultModal } = this.state;
    this.setState({
      resultModal: !resultModal,
    });
  };

  checkingHorizontal = (row, col) => {
    const { board } = this.state;
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];

    // count = 1 la vi tri hien tai.
    let count = 1;

    // dem ve 2 ben
    for (let i = col - 1; i >= 0; i -= 1) {
      if (board[row][i] === curPlayer) {
        count += 1;
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
      } else {
        if (board[row][i] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return true;
      }
      return !(isBlockOutAbove && isBlockOutBelow);
    }
    return false;
  };

  checkingVertical = (row, col) => {
    const { board } = this.state;
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];

    // count = 1 la vi tri hien tai.
    let count = 1;

    // dem ve 2 ben
    for (let i = row - 1; i >= 0; i -= 1) {
      if (board[i][col] === curPlayer) {
        count += 1;
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
      } else {
        if (board[i][col] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return true;
      }
      return !(isBlockOutAbove && isBlockOutBelow);
    }
    return false;
  };

  checkingMainDiagonal = (row, col) => {
    const { board } = this.state;
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];
    // count = 1 la vi tri hien tai.
    let count = 1;

    // dem ve 2 ben
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i -= 1, j -= 1) {
      if (board[i][j] === curPlayer) {
        count += 1;
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
      } else {
        if (board[i][j] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return true;
      }
      return !(isBlockOutAbove && isBlockOutBelow);
    }
    return false;
  };

  checkingSubDiagonal = (row, col) => {
    const { board } = this.state;
    const { size, numToWin } = this.props;

    let isBlockOutAbove = false;
    let isBlockOutBelow = false;

    const curPlayer = board[row][col];
    // count = 1 la vi tri hien tai.
    let count = 1;

    // dem ve 2 ben
    for (let i = row - 1, j = col + 1; i >= 0 && j < size; i -= 1, j += 1) {
      if (board[i][j] === curPlayer) {
        count += 1;
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
      } else {
        if (board[i][j] !== null) {
          isBlockOutBelow = true;
        }
        break;
      }
    }

    if (count >= numToWin) {
      if (count > numToWin) {
        return true;
      }
      return !(isBlockOutAbove && isBlockOutBelow);
    }
    return false;
  };

  isTerminated = (row, col) => {
    return (
      this.checkingHorizontal(row, col) ||
      this.checkingVertical(row, col) ||
      this.checkingMainDiagonal(row, col) ||
      this.checkingSubDiagonal(row, col)
    );
  };

  isFull = () => {
    const { board } = this.state;

    return board.every(row => {
      return row.every(cell => cell);
    });
  };

  setDraw = () => {
    const { XO } = this.props;
    this.setState({
      isStart: false,
      winner: XO,
      resultModal: true,
    });
  };

  setWinner = player => {
    this.setState({
      isStart: false,
      winner: player,
      resultModal: true,
    });
  };

  endGame = player => {
    this.setWinner(player);
  };

  render() {
    const { board, xIsNext, open, winner, resultModal, points } = this.state;
    const { X, O, DRAW } = this.props;

    const player = xIsNext ? X : O;
    return (
      <div className="game-wrapper">
        <Card className="game-info">
          <Card.Content>
            <Card.Header as="h1">Caro Vietnam</Card.Header>
            <Card.Description>
              <p>
                Player: &nbsp;
                <span className={`player${` ${player}`}`}>{player}</span>
              </p>

              <Button size="small" onClick={this.toggleConfirm}>
                Reset game
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>

        <Board
          points={points}
          board={board}
          xIsNext={xIsNext}
          onClick={this.handleClick} />

        <History />

        <Confirm
          open={open}
          header="Reset game"
          content="Do you want to reset this game?"
          onCancel={this.toggleConfirm}
          onConfirm={this.resetGame}
        />

        <ResultModal
          open={resultModal}
          winner={winner}
          onClick={this.resetGame}
          isDraw={winner === DRAW}
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
