import React from 'react';

const Cell = ({ row, col, val, onClick, winner, isWinningCell }) => {
  let notClickable = ' not-clickable';

  if (!winner && !val) {
    notClickable = '';
  }

  const hasPlayer = val ? ` player ${val}` : '';

  const winningCellClass = isWinningCell ? ' winning-cell' : '';

  return (
    <button
      type='button'
      className={`board-cell${hasPlayer + notClickable + winningCellClass}`}
      onClick={() => onClick(row, col)}
    >
      {val}
    </button>
  );
};

Cell.defaultProps = {
  val: null,
};

export default Cell;
