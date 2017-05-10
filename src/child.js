import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class Component extends React.Component {
  constructor(props) {
    super(props)
    this.setChildRef = this.setChildRef.bind(this)
    this.state = {
      sticky: false,
      mytop: 0
    }
  }

  setChildRef(node) {
    // console.log('got ref', node);
    if(node) {
      this.node = node
      this.setState({
        mytop: node.offsetTop,
        height: node.clientHeight
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('new props', nextProps);
    // TODO can we make it so the component does not stick when it is taller than the container
    if(nextProps.parentScrollTop !== this.props.parentScrollTop) {
      if(!this.state.sticky && nextProps.parentScrollTop > this.state.mytop) {
        this.setState({sticky: true})
      } else if(this.state.sticky && nextProps.parentScrollTop < this.state.mytop) {
        this.setState({sticky: false})
      }
    }
  }

  componentDidUpdate() {
    // console.log('Component Did Update');
    const newState = {
      height: this.node.getBoundingClientRect().height
    }
    if(!this.state.sticky) {
      // we may need to recalculate the top, but don't do that if we are already sticky
      newState.mytop = this.node.offsetTop
    }
    if(newState.height !== this.state.height ||
      (newState.mytop && newState.mytop !== this.state.mytop))
      this.setState(newState)
  }

  getStickyStyle() {
    return {
      position: 'absolute', left: '0', right: '0',
      top: this.props.parentScrollTop + 'px',
      zIndex: 9
    }
  }

  getStickySpacer() {
    return {
      paddingBottom: this.state.height + 'px'
    }
  }

  render() {
    const style = this.state.sticky ? this.getStickyStyle() : {},
      spacerStyle = this.state.sticky ? this.getStickySpacer() : {},
      cls = (this.state.sticky ? 'is-sticky' : ''),
      childCls = 'sticky-child ' + this.props.className
    return <div className={cls}>
        <div className='sticky-spacer' style={spacerStyle}></div>
        <div className={childCls} style={style} ref={this.setChildRef}>
          {this.props.children}
        </div>
      </div>
  }
}

Component.propTypes = {
  parentScrollTop: PropTypes.number.isRequired
}

const container = connect((state, ownProps) => ({
  parentScrollTop: (state.sticky[ownProps.name] && state.sticky[ownProps.name].scrollTop) || 0
}), null)(Component)
container.displayName = 'StickyChild'
container.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
}
container.defaultProps = {
  name: 'default',
  className: ''
}

export default container
