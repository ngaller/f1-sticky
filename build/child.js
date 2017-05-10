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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = exports.Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

    _this.setChildRef = _this.setChildRef.bind(_this);
    _this.state = {
      // if there is some stuff above this component
      mytop: 0,
      // height will tell us how tall to make the spacer
      height: props.parentHeight || 100,
      width: 100
    };
    return _this;
  }

  _createClass(Component, [{
    key: 'setChildRef',
    value: function setChildRef(node) {
      if (node) {
        this.node = node;
      }
    }
  }, {
    key: 'recalcHeight',
    value: function recalcHeight() {
      var sz = this.node.getBoundingClientRect();
      var newState = {
        height: sz.height || this.state.height,
        width: sz.width || this.state.width
      };
      if (!this.isSticky()) {
        // we may need to recalculate the top, but don't do that if we are already sticky
        newState.mytop = this.node.offsetTop;
      }
      if (newState.height !== this.state.height || newState.width !== this.state.width || newState.mytop && newState.mytop !== this.state.mytop) this.setState(newState);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.recalcHeight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // recalculate the height and position.
      // XXX Do we need to try and do that when the browser is resized?
      this.recalcHeight();
    }
  }, {
    key: 'isSticky',
    value: function isSticky() {
      // console.log(`check sticky, parent scroll ${this.props.parentScrollTop}, parent height ${this.props.parentHeight}, this height ${this.state.height}`);
      return this.props.parentScrollTop > this.state.mytop && (!this.props.parentHeight || this.props.parentHeight > this.state.height);
    }
  }, {
    key: 'getStickyStyle',
    value: function getStickyStyle() {
      return {
        position: 'fixed',
        width: this.state.width + 'px',
        // left: '0',
        // right: '0',
        top: this.props.parentTop + 'px',
        zIndex: 9
      };
    }

    // we need a spacer so that the stuff below this component scrolls normally

  }, {
    key: 'getStickySpacer',
    value: function getStickySpacer() {
      return {
        paddingBottom: this.state.height + 'px'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var isSticky = this.isSticky(),
          style = isSticky ? this.getStickyStyle() : {},
          spacerStyle = isSticky ? this.getStickySpacer() : {},
          cls = isSticky ? 'is-sticky' : '',
          childCls = 'sticky-child ' + this.props.className;
      return _react2.default.createElement(
        'div',
        { className: cls },
        _react2.default.createElement('div', { className: 'sticky-spacer', style: spacerStyle }),
        _react2.default.createElement(
          'div',
          { className: childCls, style: style, ref: this.setChildRef },
          this.props.children
        )
      );
    }
  }]);

  return Component;
}(_react2.default.Component);

Component.propTypes = {
  parentScrollTop: _propTypes2.default.number.isRequired,
  parentTop: _propTypes2.default.number.isRequired,
  parentHeight: _propTypes2.default.number,
  className: _propTypes2.default.string
};
Component.defaultProps = {
  className: ''
};

var container = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    parentScrollTop: state.sticky[ownProps.name] && state.sticky[ownProps.name].scrollTop || 0,
    parentTop: state.sticky[ownProps.name] && state.sticky[ownProps.name].top || 0,
    parentHeight: state.sticky[ownProps.name] && state.sticky[ownProps.name].height || 0
  };
}, null)(Component);
container.displayName = 'StickyChild';
container.propTypes = {
  name: _propTypes2.default.string,
  className: _propTypes2.default.string
};
container.defaultProps = {
  name: 'default'
};

exports.default = container;