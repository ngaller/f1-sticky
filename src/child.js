import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class Component extends React.Component {
  constructor(props) {
    super(props)
    this.setChildRef = this.setChildRef.bind(this)
    this.state = {
      // if there is some stuff above this component
      mytop: 0,
      // height will tell us how tall to make the spacer
      height: 1000
    }
  }

  setChildRef(node) {
    if(node) {
      this.node = node
      this.setState({
        mytop: node.offsetTop,
        height: node.clientHeight
      })
    }
  }

  componentDidUpdate() {
    // recalculate the height and position.
    // XXX Do we need to try and do that when the browser is resized?
    const newState = {
      height: this.node.getBoundingClientRect().height
    }
    if(!this.isSticky()) {
      // we may need to recalculate the top, but don't do that if we are already sticky
      newState.mytop = this.node.offsetTop
    }
    if(newState.height !== this.state.height ||
      (newState.mytop && newState.mytop !== this.state.mytop))
      this.setState(newState)
  }

  isSticky() {
    // TODO can we make it so the component does not stick when it is taller than the container
    return this.props.parentScrollTop > this.state.mytop
  }

  getStickyStyle() {
    return {
      position: 'absolute', left: '0', right: '0',
      top: this.props.parentScrollTop + 'px',
      zIndex: 9
    }
  }

  // we need a spacer so that the stuff below this component scrolls normally
  getStickySpacer() {
    return {
      paddingBottom: this.state.height + 'px'
    }
  }

  render() {
    const isSticky = this.isSticky(),
      style = isSticky ? this.getStickyStyle() : {},
      spacerStyle = isSticky ? this.getStickySpacer() : {},
      cls = (isSticky ? 'is-sticky' : ''),
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
