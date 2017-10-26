let renderGrid = (peers) => {

  let grid = document.getElementById('grid-container');
  let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  let cols = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => x.toString());

  let peerIds = new Map();
  let squares = new Map();
  let squarePeers = new Map();

  let focusedSquare;
  let highlightedPeers;

  for (let [s, p] of peers) {
    peerIds.set(s.toLowerCase(), new Set([...p].map(x => x.toLowerCase())));
  }

  const n = 9;
  const cellSize = (grid.offsetWidth / n) - 3;

  const squareClass = 'col-1 square';
  const contentClass = 'square-content';

  let highlightPeers = s => {
    if (highlightedPeers)
      highlightedPeers.forEach(p => {
        if (p.id !== s) p.setAttribute('class', contentClass);
      });

    highlightedPeers = squarePeers.get(s);
    highlightedPeers.forEach(p => p.setAttribute('class', `${contentClass} highlight`));
  };

  let highlightSquare = e => {
    if (focusedSquare)
      focusedSquare.setAttribute('class', contentClass);

    focusedSquare = e.target;
    focusedSquare.setAttribute('class', `${contentClass} focused-content`);
    highlightPeers(e.target.id);
  };

  let onSquareClick = e => {
    highlightSquare(e)
  };

  let onInput = e => {
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      if (focusedSquare) focusedSquare.innerHTML = e.key;
    }
  };

  for (let i = 0; i < n; i++) {
    let row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.style.height = `${cellSize}px`;

    for (let j = 0; j < n; j++) {
      let id = `${rows[i]}${cols[j]}`;
      let square = document.createElement('div');

      square.id = id;
      square.setAttribute('class', squareClass);

      square.style.height = `${cellSize}px`;
      square.style.width = `${cellSize}px`;
      square.style.maxWidth = `${cellSize}px`;
      square.style.flex = `0 0 ${cellSize}px`;

      let content = document.createElement('div');
      content.id = id;
      content.setAttribute('class', contentClass);

      content.onclick = onSquareClick;
      document.onkeydown = onInput;

      square.appendChild(content);
      row.appendChild(square);
      squares.set(id, content);
    }

    grid.appendChild(row)
  }

  for (let [s, p] of peerIds)
    squarePeers.set(s, [...p].map(x => squares.get(x)));

  return squares;
};

let puzzle = Sudoku.getPuzzle();
let peers = Sudoku.peers;
let squares = renderGrid(peers);

for (let [s, d] of puzzle)
  squares.get(s.toLowerCase()).innerHTML = [...d][0];
