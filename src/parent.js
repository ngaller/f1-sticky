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
      requestAnimationFrame(() => {
        this.inFrame = false
        this.props.onScroll(e.target.scrollTop)
      })
    }
  }

  onResize() {
    if(this.props.stickyContainerHeight !== this.node.clientHeight) {
      this.props.onResize(this.node.clientHeight)
    }
  }

  componentDidMount() {
    this.onResize()
  }

  componentDidUpdate() {
    this.onResize()
  }

  render() {
    return <div ref={this.initRef} className={this.props.className}>
        {this.props.children}
      </div>
  }
}

const container = connect((state, ownProps) => ({
  stickyContainerHeight: state.sticky[ownProps.name] && state.sticky[ownProps.name].height
}), (dispatch, ownProps) => bindActionCreators(actions(ownProps.name), dispatch))(Component)
container.displayName = 'StickyParent'
container.defaultProps = {
  name: 'default'
}

export default container
