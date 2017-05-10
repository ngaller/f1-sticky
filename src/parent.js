import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from './actions'

export class Component extends React.Component {
  constructor(props) {
    super(props)
    this.initRef = this.initRef.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onResize = this.onResize.bind(this)
    this.inFrame = false
  }

  initRef(node) {
    if(node) {
      node.addEventListener('scroll', this.onScroll)
      window.addEventListener('resize', this.onResize)
    } else if(this.node) {
      this.node.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onResize)
    }
    this.node = node
    // may need touchmove on iphone ?
  }

  onScroll(e) {
    if(!this.inFrame) {
      this.inFrame = true
      const fn = () => requestAnimationFrame(() => {
        this.inFrame = false
        this.props.onScroll(e.target.scrollTop)
      })
      if(this.props.updateRate)
        setTimeout(fn, 1000 / Math.min(25, this.props.updateRate))
      else
        fn()
    }
  }

  onResize() {
    const sz = this.node.getBoundingClientRect()

    if(this.props.stickyContainerHeight !== sz.height ||
      this.props.stickyContainerTop !== sz.top) {
      this.props.onResize(sz.height, sz.top)
    }
  }

  componentDidMount() {
    this.onResize()
  }

  componentDidUpdate() {
    this.onResize()
  }

  render() {
    return <div ref={this.initRef} className={this.props.className || ''}>
        {this.props.children}
      </div>
  }
}

const container = connect((state, ownProps) => ({
  stickyContainerHeight: state.sticky[ownProps.name] && state.sticky[ownProps.name].height,
  stickyContainerTop: state.sticky[ownProps.name] && state.sticky[ownProps.name].top
}), (dispatch, ownProps) => bindActionCreators(actions(ownProps.name), dispatch))(Component)
container.displayName = 'StickyParent'
container.defaultProps = {
  name: 'default'
}
container.propTypes = {
  // updates / second (leave unspecified to fire as fast as possible)
  updateRate: PropTypes.number,
  // this is needed if there are more than 1 stickies
  name: PropTypes.string,
  // optional class
  className: PropTypes.string
}

export default container
