import React from 'react';
import Cell from './Cell';

const Board = ({ board, size, onClick, winner, points }) => {
  const renderBoard = () => {
    return board.map((row, iRow) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <div key={iRow} className='board-row'>
          {row.map((cell, iCol) => {
            // check ô này có nằm trong danh sách point win hay không
            const isWinningCell =
              points &&
              points.some(val => val.row === iRow && val.col === iCol);
            return (
              <Cell
                // eslint-disable-next-line react/no-array-index-key
                key={iRow * size + iCol}
                row={iRow}
                col={iCol}
                val={cell}
                // eslint-disable-next-line no-shadow
                onClick={onClick}
                winner={winner}
                isWinningCell={isWinningCell}
              />
            );
          })}
        </div>
      );
    });
  };
  return <div id='board'>{renderBoard()}</div>;
};

Board.defaultProps = {
  size: 20,
  numToWin: 5,
};

export default Board;
