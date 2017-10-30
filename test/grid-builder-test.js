const assert = require('assert');
const builder = require('../src/js/sudoku-grid-builder');

describe('sudoku-grid-builder', () => {
  describe('#build()', () => {
    it('should return an object with squares and peers', done => {
      let div = document.createElement('div');
      div.id = 'grid-container';

      let grid = builder.build();
      assert(grid.hasOwnProperty('squares'));
      assert(grid.hasOwnProperty('peers'));

      done();
    })
  })
});