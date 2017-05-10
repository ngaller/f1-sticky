import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from './actions'

export class Component extends React.Component {
  constructor(props) {
    super(props)
    this.initRef = this.initRef.bind(this)
    this.inFrame = false
  }

  initRef(node) {
    if(node) {
      node.addEventListener('scroll', this.onScroll.bind(this))
    }
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

  render() {
    return <div ref={this.initRef} className={this.props.className}>
        {this.props.children}
      </div>
  }
}

const container = connect((state, ownProps) => ({
}), (dispatch, ownProps) => bindActionCreators(actions(ownProps.name), dispatch))(Component)
container.displayName = 'StickyParent'
container.defaultProps = {
  name: 'default'
}

export default container
