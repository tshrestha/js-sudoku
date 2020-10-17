// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/sudoku-grid-util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRows = getRows;
exports.getLowerCaseRows = getLowerCaseRows;
exports.getCols = getCols;
exports.getSquares = getSquares;
exports.getUnitList = getUnitList;
exports.getUnits = getUnits;
exports.getPeers = getPeers;
exports.cross = cross;
exports.some = some;
exports.shuffle = shuffle;
exports.all = all;
exports.getRandomInt = getRandomInt;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var rows = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
var cols = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
var lowerCaseRows = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

function getRows() {
  return rows;
}

function getLowerCaseRows() {
  return lowerCaseRows;
}

function getCols() {
  return cols;
}

function getSquares() {
  return cross(rows, cols);
}

function getUnitList() {
  return _toConsumableArray(cols).map(function (c) {
    return cross(rows, new Set(c));
  }).concat(_toConsumableArray(rows).map(function (r) {
    return cross(new Set(r), cols);
  })).concat(function () {
    var u = [];
    [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']].forEach(function (r) {
      [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']].forEach(function (c) {
        u.push(cross(new Set(r), new Set(c)));
      });
    });
    return u;
  }());
}

function getUnits(squares, unitlist) {
  var units = new Map();

  _toConsumableArray(squares).forEach(function (s) {
    return units.set(s, unitlist.filter(function (u) {
      return u.has(s);
    }));
  });

  return units;
}

function getPeers(squares, units) {
  var peers = new Map();

  _toConsumableArray(squares).forEach(function (s) {
    var p = units.get(s);
    peers.set(s, new Set(_toConsumableArray(new Set([].concat(_toConsumableArray(p[0]), _toConsumableArray(p[1]), _toConsumableArray(p[2])))).filter(function (x) {
      return x !== s;
    })));
  });

  return peers;
}

function cross(a, b) {
  var c = new Set();

  var _iterator = _createForOfIteratorHelper(a.values()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a1 = _step.value;

      var _iterator2 = _createForOfIteratorHelper(b.values() || b),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var b1 = _step2.value;
          c.add(a1 + b1);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return c;
}

function some(seq, func) {
  var _iterator3 = _createForOfIteratorHelper(seq),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var d = _step3.value;
      var result = func(d);
      if (result) return result;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return false;
}
/**
 * Fisher-Yates Shuffle
 * See http://bit.ly/2gMXijX
 */


function shuffle(seq) {
  var array = _toConsumableArray(seq);

  var currentIndex = array.length,
      temporaryValue,
      randomIndex; // While there remain elements to shuffle...

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1; // And swap it with the current element.

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function all(values) {
  var _iterator4 = _createForOfIteratorHelper(values),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var v = _step4.value;
      if (!v) return false;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return true;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
},{}],"js/sudoku-generator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sudokuGridUtil = require("./sudoku-grid-util");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var level = {
  easy: 28,
  medium: 37,
  hard: 45,
  master: 65
};
var digits = (0, _sudokuGridUtil.getCols)();
var squares = (0, _sudokuGridUtil.getSquares)();
var unitlist = (0, _sudokuGridUtil.getUnitList)();
var units = (0, _sudokuGridUtil.getUnits)(squares, unitlist);
var peers = (0, _sudokuGridUtil.getPeers)(squares, units);
/**
 * Convert grid to a dict of possible values, {square: digits},
 * or return false if a contradiction is detected.
 */

function parseGrid(grid) {
  var values = new Map();
  squares.forEach(function (s) {
    return values.set(s, digits);
  });

  var _iterator = _createForOfIteratorHelper(gridValues(grid).entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          s = _step$value[0],
          d = _step$value[1];

      if (digits.has(d) && !assign(values, s, d)) {
        return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return values;
}
/**
 * Convert grid into a dict of {square: char} with '0' or '.' for empties.
 */


function gridValues(grid) {
  var chars = grid.filter(function (c) {
    return digits.has(c) || c === '0' || c === '.';
  });
  var values = new Map();

  var s = _toConsumableArray(squares);

  for (var i = 0; i < s.length; i++) {
    values.set(s[i], chars[i]);
  }

  return values;
}
/**
 * Eliminate all the other values (except d) from values[s] and propagate.
 * Return values, except return False if a contradiction is detected.
 */


function assign(values, s, d) {
  var others = _toConsumableArray(values.get(s)).filter(function (x) {
    return x !== d;
  });

  return (0, _sudokuGridUtil.all)(others.map(function (d2) {
    return eliminate(values, s, d2);
  })) ? values : false;
}
/**
 * Eliminate d from values[s]; propagate when values or places <= 2.
 * Return values, except return False if a contradiction is detected.
 */


function eliminate(values, s, d) {
  if (!values.get(s).has(d)) return values;
  values.set(s, new Set(_toConsumableArray(values.get(s)).filter(function (x) {
    return x !== d;
  })));

  if (!values.get(s).size) {
    return false;
  } else if (values.get(s).size === 1) {
    var d2 = _toConsumableArray(values.get(s))[0];

    if (!(0, _sudokuGridUtil.all)(_toConsumableArray(peers.get(s)).map(function (s2) {
      return eliminate(values, s2, d2);
    }))) return false;
  }

  var _iterator2 = _createForOfIteratorHelper(units.get(s)),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var unit = _step2.value;

      var dplaces = _toConsumableArray(unit).filter(function (s2) {
        return values.get(s2).has(d);
      });

      if (!dplaces.length) {
        return false;
      } else if (dplaces.length === 1) {
        if (!assign(values, dplaces[0], d)) return false;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return values;
}

function solve(grid) {
  return search(parseGrid(grid));
}
/**
 * Using depth-first search and propagation, try all possible values.
 */


function search(values) {
  if (!values) return false;
  if ((0, _sudokuGridUtil.all)(_toConsumableArray(squares).map(function (s) {
    return values.get(s).size === 1;
  }))) return values;

  var s = _toConsumableArray(squares).filter(function (s) {
    return values.get(s).size > 1;
  }).sort(function (s1, s2) {
    return values.get(s1).size - values.get(s2).size;
  })[0];

  return (0, _sudokuGridUtil.some)(values.get(s), function (d) {
    return search(assign(new Map(values), s, d));
  });
}
/**
 * A puzzle is solved if each unit is a permutation of the digits 1 to 9.
 */


function solved(values) {
  function unitSolved(unit) {
    var _iterator3 = _createForOfIteratorHelper(unit),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var s = _step3.value;

        var diff = _toConsumableArray(values.get(s)).filter(function (d) {
          return !digits.has(d);
        });

        if (diff.length > 0) return false;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return true;
  }

  return values && (0, _sudokuGridUtil.all)(unitlist.map(function (u) {
    return unitSolved(u);
  }));
}
/**
 * Make a random puzzle with N or more assignments. Restart on contradictions.
 * Note the resulting puzzle is not guaranteed to be solvable, but empirically
 * about 99.8% of them are solvable. Some have multiple solutions
 */


function randomPuzzle() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 17;
  var values = new Map();
  squares.forEach(function (s) {
    return values.set(s, digits);
  });

  var _iterator4 = _createForOfIteratorHelper((0, _sudokuGridUtil.shuffle)(squares)),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var s = _step4.value;

      if (!assign(values, s, randomValue(values.get(s)))) {
        break;
      }

      var ds = _toConsumableArray(squares).filter(function (s) {
        return values.get(s).size === 1;
      }).map(function (s) {
        return values.get(s);
      });

      if (ds.length >= n && new Set(ds).size >= 8) {
        return _toConsumableArray(squares).map(function (s) {
          return values.get(s).size === 1 ? _toConsumableArray(values.get(s))[0] : '0';
        });
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return randomPuzzle(n);
}

function randomValue(values) {
  return _toConsumableArray(values)[(0, _sudokuGridUtil.getRandomInt)(0, values.size - 1)];
}

function isUnique(original, test) {
  var _iterator5 = _createForOfIteratorHelper(original),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _step5$value = _slicedToArray(_step5.value, 2),
          s = _step5$value[0],
          d = _step5$value[1];

      if (_toConsumableArray(test.get(s))[0] !== _toConsumableArray(d)[0]) return false;
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return true;
}
/**
 * Iterate through the randomly shuffled squares.
 * After removing each square from the solution
 * solve it and test if it is the same as the original.
 * If the solution doesn't match undo the removal and
 * try another square.
 */


function createPuzzle(solution) {
  var puzzle = [];
  var indices = {};
  var shuffled = (0, _sudokuGridUtil.shuffle)(squares);

  _toConsumableArray(squares).forEach(function (s, i) {
    puzzle.push(_toConsumableArray(solution.get(s))[0]);
    indices[s] = i;
  });

  var result = new Map();

  for (var i = 0; i < shuffled.length; i++) {
    var j = indices[shuffled[i]];
    var v = puzzle[j];
    puzzle[j] = '0';

    if (!isUnique(solution, solve(puzzle))) {
      puzzle[j] = v;
      result.set(shuffled[i], v);
    } else {
      result.set(shuffled[i], '0');
    }
  }

  return result;
}

var _default = {
  getGame: function getGame() {
    var difficulty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : level.easy;
    var solution = solve(randomPuzzle(81 - difficulty));

    while (!solved(solution)) {
      solution = solve(randomPuzzle());
    }

    return {
      puzzle: createPuzzle(solution),
      solution: solution
    };
  }
};
exports.default = _default;
},{"./sudoku-grid-util":"js/sudoku-grid-util.js"}],"js/sudoku-grid-builder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;

var _sudokuGridUtil = require("./sudoku-grid-util");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var n = 9;
var squareClass = 'col-1 square';
var contentClass = 'square-content';

var createRow = function createRow(cellSize) {
  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  row.style.height = "".concat(cellSize, "px");
  return row;
};

var createSquare = function createSquare(cellSize) {
  var square = document.createElement('div');
  square.setAttribute('class', squareClass);
  square.style.height = "".concat(cellSize, "px");
  square.style.width = "".concat(cellSize, "px");
  square.style.maxWidth = "".concat(cellSize, "px");
  square.style.flex = "0 0 ".concat(cellSize, "px");
  return square;
};

var createSquareContent = function createSquareContent(id) {
  var content = document.createElement('div');
  content.id = id;
  content.setAttribute('class', contentClass);
  return content;
};

var toLowerCase = function toLowerCase(squares) {
  var result = new Map();

  var _iterator = _createForOfIteratorHelper(squares),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          s = _step$value[0],
          d = _step$value[1];

      result.set(s.toLowerCase(), new Set(_toConsumableArray(d).map(function (d1) {
        return d1.toLowerCase();
      })));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
};

function build() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'grid-container';

  var rows = _toConsumableArray((0, _sudokuGridUtil.getLowerCaseRows)());

  var cols = _toConsumableArray((0, _sudokuGridUtil.getCols)());

  var element = document.getElementById(id);
  var squares = new Map();
  var cellSize = element.offsetWidth ? element.offsetWidth / n - 3 : 50;

  for (var i = 0; i < n; i++) {
    var row = createRow(cellSize);

    for (var j = 0; j < n; j++) {
      var _id = "".concat(rows[i]).concat(cols[j]);

      var square = createSquare(cellSize);
      var content = createSquareContent(_id);
      square.appendChild(content);
      row.appendChild(square);
      squares.set(_id, content);
    }

    element.appendChild(row);
  }

  var s = (0, _sudokuGridUtil.getSquares)();
  var u = (0, _sudokuGridUtil.getUnitList)();
  var peerIds = toLowerCase((0, _sudokuGridUtil.getPeers)(s, (0, _sudokuGridUtil.getUnits)(s, u)));
  var peers = new Map();

  var _iterator2 = _createForOfIteratorHelper(peerIds),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          _s2 = _step2$value[0],
          p = _step2$value[1];

      peers.set(_s2, _toConsumableArray(p).map(function (x) {
        return squares.get(x);
      }));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return {
    peers: peers,
    squares: squares
  };
}
},{"./sudoku-grid-util":"js/sudoku-grid-util.js"}],"js/sudoku-grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sudokuGridBuilder = require("./sudoku-grid-builder");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SudokuGrid = /*#__PURE__*/function () {
  function SudokuGrid() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'grid-container';

    _classCallCheck(this, SudokuGrid);

    this.grid = (0, _sudokuGridBuilder.build)(id);
    this.peers = this.grid.peers;
    this.squares = this.grid.squares;
  }

  _createClass(SudokuGrid, [{
    key: "fillClues",
    value: function fillClues(clues) {
      var _iterator = _createForOfIteratorHelper(clues),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              s = _step$value[0],
              d = _step$value[1];

          var clue = _toConsumableArray(d)[0];

          var square = this.squares.get(s.toLowerCase());

          if (clue === '0' || clue === '.') {
            square.innerHTML = '';
          } else {
            square.classList.add('clue');
            square.innerHTML = clue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "setSquareValue",
    value: function setSquareValue(value, puzzle) {
      if (this.highlightedSquare) {
        puzzle.set(this.highlightedSquare.id.toUpperCase(), new Set(value));
        this.highlightedSquare.innerHTML = value;
      }
    }
  }, {
    key: "highlightSquare",
    value: function highlightSquare(square) {
      if (!square.classList.contains('clue')) {
        if (this.highlightedSquare) {
          this.highlightedSquare.classList.remove('focused-content');
          this.highlightedSquare.classList.remove('highlight');
        }

        this.highlightedSquare = square;
        this.highlightedSquare.classList.add('focused-content');
      }
    }
  }, {
    key: "highlightPeers",
    value: function highlightPeers(square) {
      if (!this.squares.get(square).classList.contains('clue')) {
        if (this.highlightedPeers) {
          this.highlightedPeers.forEach(function (p) {
            if (p.id !== square) p.classList.remove('highlight');
          });
        }

        this.highlightedPeers = this.peers.get(square);
        this.highlightedPeers.forEach(function (p) {
          return p.classList.add('highlight');
        });
      }
    }
  }]);

  return SudokuGrid;
}();

exports.default = SudokuGrid;
},{"./sudoku-grid-builder":"js/sudoku-grid-builder.js"}],"js/sudoku.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sudokuGenerator = _interopRequireDefault(require("./sudoku-generator"));

var _sudokuGrid = _interopRequireDefault(require("./sudoku-grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sudoku = /*#__PURE__*/function () {
  function Sudoku() {
    var _this = this;

    _classCallCheck(this, Sudoku);

    this.game = _sudokuGenerator.default.getGame();
    this.puzzle = this.game.puzzle;
    this.original = new Map(this.puzzle);
    this.solution = this.game.solution;
    this.grid = new _sudokuGrid.default();
    this.grid.fillClues(this.puzzle);
    this.setKeyInputEvents();
    this.setBtnInputEvents();

    document.getElementById('reset').onclick = function () {
      return _this.reset();
    };

    document.getElementById('erase').onclick = function () {
      return _this.erase();
    };
  }

  _createClass(Sudoku, [{
    key: "reset",
    value: function reset() {
      this.puzzle = new Map(this.original);
      this.grid.fillClues(this.puzzle);
    }
  }, {
    key: "erase",
    value: function erase() {
      this.grid.setSquareValue('', this.puzzle);
    }
  }, {
    key: "setBtnInputEvents",
    value: function setBtnInputEvents() {
      var _this2 = this;

      var grid = this.grid;
      var buttons = document.querySelectorAll('.number-btn');
      buttons.forEach(function (b) {
        b.onclick = function () {
          grid.setSquareValue(b.value, _this2.puzzle);
          if (_this2.solved()) Sudoku.displayMessage();
        };
      });
    }
  }, {
    key: "setKeyInputEvents",
    value: function setKeyInputEvents() {
      var _this3 = this;

      var grid = this.grid;
      var squares = this.grid.squares; // Setup touch/click events for each square.

      var _iterator = _createForOfIteratorHelper(squares),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
              s = _step$value[0],
              el = _step$value[1];

          el.onclick = function () {
            grid.highlightSquare(el);
            grid.highlightPeers(s);
          };
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        } // Input event

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      document.onkeydown = function (e) {
        var value = e.key;
        var keycode = e.keyCode;

        if (keycode >= 49 && keycode <= 57) {
          grid.setSquareValue(value, _this3.puzzle);
          if (_this3.solved()) Sudoku.displayMessage();
        } else if (keycode === 8) {
          grid.setSquareValue('', _this3.puzzle);
        }
      };
    }
  }, {
    key: "solved",
    value: function solved() {
      var _iterator2 = _createForOfIteratorHelper(this.solution),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              s = _step2$value[0],
              d = _step2$value[1];

          if (_toConsumableArray(this.puzzle.get(s))[0] !== _toConsumableArray(d)[0]) return false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return true;
    }
  }], [{
    key: "displayMessage",
    value: function displayMessage() {
      window.alert("Congratulations! You solved the puzzle.");
    }
  }]);

  return Sudoku;
}();

exports.default = Sudoku;
},{"./sudoku-generator":"js/sudoku-generator.js","./sudoku-grid":"js/sudoku-grid.js"}],"js/sudoku-ui.js":[function(require,module,exports) {
"use strict";

require("../css/main.css");

var _sudoku = _interopRequireDefault(require("./sudoku"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _sudoku.default();
},{"../css/main.css":"css/main.css","./sudoku":"js/sudoku.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55359" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/sudoku-ui.js"], null)
//# sourceMappingURL=/sudoku-ui.85b7b82b.js.map