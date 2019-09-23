import React from 'react';

const Cell = ({ row, col, val, onClick }) => {
  return (
    <button
      type="submit"
      className={`board-cell player${val ? ` ${val}` : ''}`}
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
