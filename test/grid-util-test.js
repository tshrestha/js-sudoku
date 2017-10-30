const assert = require('assert');
const gridutil = require('../src/js/sudoku-grid-util');

describe('Grid utilities', () => {
  describe('#getUnitList', () => {
    it('Should return an Array of 27 units', done => {
      let unitlist = gridutil.getUnitList();

      console.log(unitlist);
      assert(unitlist.length === 27);
      done();
    });
  })
});