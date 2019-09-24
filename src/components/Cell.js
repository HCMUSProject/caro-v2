import React from 'react';

const Cell = ({ row, col, val, onClick, start }) => {
  let notClickable = ' not-clickable';

  if (start && !val) {
    notClickable = '';
  }

  const hasPlayer = val ? ` player ${val}` : '';

  return (
    <button
      type='submit'
      className={`board-cell${hasPlayer}${notClickable}`}
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
