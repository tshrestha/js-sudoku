const assert = require('assert');
const sudoku = require('../src/js/sudoku').default;

describe('sudoku', () => {
  describe('#getPuzzle()', () => {
    it('should have a puzzle with some zeroes', done => {
      let puzzle = sudoku.getGame().puzzle;
      let zeroCount = 0;

      for (let [s, d] of puzzle)
        if ([...d][0] === '0') zeroCount++;

      assert(zeroCount > 1);
      done();
    })
  })
});