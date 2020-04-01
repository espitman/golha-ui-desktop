import React from 'react'
import { withRouter } from 'react-router-dom'

import './style.scss'

class Player extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      show,
      track: { title }
    } = this.props
    return (
      <div id="player" className={show ? 'show' : ''}>
        <span>{title}</span>
      </div>
    )
  }
}

export default withRouter(Player)
