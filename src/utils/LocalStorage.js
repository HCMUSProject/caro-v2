function WriteHistory(history) {
  localStorage.removeItem('history');
  localStorage.setItem('history', JSON.stringify(history));
}

function ReadHistory() {
  const data = localStorage.getItem('history');
  return JSON.parse(data);
}

function EmptyHistory(size) {
  const history = [
    {
      board: new Array(size).fill(null).map(() => new Array(size).fill(null)),
      lastPosition: null,
    },
  ];
  WriteHistory(history);
}

export { WriteHistory, ReadHistory, EmptyHistory };
