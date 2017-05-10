'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child = require('./child.js');

Object.defineProperty(exports, 'StickyChild', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_child).default;
  }
});

var _parent = require('./parent.js');

Object.defineProperty(exports, 'StickyParent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_parent).default;
  }
});

var _reducer = require('./reducer.js');

Object.defineProperty(exports, 'reducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reducer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }