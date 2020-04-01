import React from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'

import './style.scss'

class Player extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.player = $('#media')
    this.audio = $('#media')[0]
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(newProps) {
    const { track } = newProps
    const src = `http://37.152.181.202:9000/golha/music/${track.file}`
    if (!this.props.track || track._id !== this.props.track._id) {
      this.player.attr('src', src)
      this.audio.play()
    }
  }

  render() {
    const {
      show,
      track: { title }
    } = this.props
    return (
      <div id="player" className={show ? 'show' : ''}>
        <audio id="media" controls>
          <source type="audio/mpeg" />
        </audio>
        <span>{title}</span>
      </div>
    )
  }
}

export default withRouter(Player)
