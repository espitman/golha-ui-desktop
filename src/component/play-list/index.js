import React from 'react'

import './style.scss'

export default class PlayList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animated: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animated: true })
    }, 1000)
  }

  render() {
    const { show = false } = this.props
    const { animated } = this.state
    return (
      <div
        className={`play-list faster 
        ${animated ? 'animated ' : ''} 
        ${show ? 'slideInUp' : 'slideOutDown'}`}
      >
        <ul>{}</ul>
      </div>
    )
  }
}
