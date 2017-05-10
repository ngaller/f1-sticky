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
      sticky: false,
      mytop: 0
    };
    return _this;
  }

  _createClass(Component, [{
    key: 'setChildRef',
    value: function setChildRef(node) {
      // console.log('got ref', node);
      if (node) {
        this.node = node;
        this.setState({
          mytop: node.offsetTop,
          height: node.clientHeight
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log('new props', nextProps);
      if (nextProps.parentScrollTop !== this.props.parentScrollTop) {
        if (!this.state.sticky && nextProps.parentScrollTop > this.state.mytop) {
          this.setState({ sticky: true });
        } else if (this.state.sticky && nextProps.parentScrollTop < this.state.mytop) {
          this.setState({ sticky: false });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // console.log('Component Did Update');
      var newState = {
        height: this.node.getBoundingClientRect().height
      };
      if (!this.state.sticky) {
        // we may need to recalculate the top, but don't do that if we are already sticky
        newState.mytop = this.node.offsetTop;
      }
      if (newState.height !== this.state.height || newState.mytop && newState.mytop !== this.state.mytop) this.setState(newState);
    }
  }, {
    key: 'getStickyStyle',
    value: function getStickyStyle() {
      return {
        position: 'absolute', left: '0', right: '0',
        top: this.props.parentScrollTop + 'px',
        zIndex: 9
      };
    }
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
      var style = this.state.sticky ? this.getStickyStyle() : {},
          spacerStyle = this.state.sticky ? this.getStickySpacer() : {},
          cls = this.state.sticky ? 'is-sticky' : '',
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
  parentScrollTop: _propTypes2.default.number.isRequired
};

var container = (0, _reactRedux.connect)(function (state, ownProps) {
  return {
    parentScrollTop: state.sticky[ownProps.name] && state.sticky[ownProps.name].scrollTop || 0
  };
}, null)(Component);
container.displayName = 'StickyChild';
container.propTypes = {
  name: _propTypes2.default.string,
  className: _propTypes2.default.string
};
container.defaultProps = {
  name: 'default',
  className: ''
};

exports.default = container;