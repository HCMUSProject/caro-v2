import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  renderBoard = () => {
    const { board, size, onClick, start } = this.props;
    return board.map((row, iRow) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={iRow} className='board-row'>
          {row.map((cell, iCol) => {
            return (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={iRow * size + iCol}
                row={iRow}
                col={iCol}
                val={cell}
                // eslint-disable-next-line no-shadow
                onClick={onClick}
                start={start}
              />
            );
          })}
        </div>
      );
    });
  };

  render() {
    return <div id='board'>{this.renderBoard()}</div>;
  }
}

Board.defaultProps = {
  size: 20,
  numToWin: 5,
};

export default Board;
