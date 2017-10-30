import generator from './sudoku-generator';
import SudokuGrid from './sudoku-grid';

export default class Sudoku {
  constructor() {
    this.game = generator.getGame();
    this.puzzle = this.game.puzzle;
    this.solution = this.game.solution;

    let grid = this.grid = new SudokuGrid();
    grid.fillClues(this.puzzle);

    let squares = this.grid.squares;

    // Setup touch/click events for each square.
    for (let [s, el] of squares) {
      el.onclick = () => {
        grid.highlightSquare(el);
        grid.highlightPeers(s);
      }
    }

    // Input event
    document.onkeydown = (e) => {
      let value = e.key;
      let keycode = e.keyCode;

      if (keycode >= 49 && keycode <= 57) {
        grid.setSquareValue(value);
      } else if (keycode === 8) {
        grid.setSquareValue('');
      }
    }
  }
}