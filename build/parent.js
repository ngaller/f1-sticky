'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = exports.Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

    _this.initRef = _this.initRef.bind(_this);
    _this.inFrame = false;
    return _this;
  }

  _createClass(Component, [{
    key: 'initRef',
    value: function initRef(node) {
      if (node) {
        node.addEventListener('scroll', this.onScroll.bind(this));
      }
      // may need touchmove on iphone ?
    }
  }, {
    key: 'onScroll',
    value: function onScroll(e) {
      var _this2 = this;

      if (!this.inFrame) {
        this.inFrame = true;
        requestAnimationFrame(function () {
          _this2.inFrame = false;
          _this2.props.onScroll(e.target.scrollTop);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: this.initRef, className: this.props.className },
        this.props.children
      );
    }
  }]);

  return Component;
}(_react2.default.Component);

var container = (0, _reactRedux.connect)(function (state, ownProps) {
  return {};
}, function (dispatch, ownProps) {
  return (0, _redux.bindActionCreators)((0, _actions2.default)(ownProps.name), dispatch);
})(Component);
container.displayName = 'StickyParent';
container.defaultProps = {
  name: 'default'
};

exports.default = container;