import React from 'react'
import { withRouter } from 'react-router-dom'

import './style.scss'

class History extends React.Component {
  back = () => {
    window.history.back()
  }

  forward = () => {
    window.history.forward()
  }

  render() {
    return (
      <div className="history">
        <i className={'fal fa-chevron-left'} onClick={this.back}></i>
        <i className={'fal fa-chevron-right'} onClick={this.forward}></i>
      </div>
    )
  }
}

export default withRouter(History)
