import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import './style.scss'

momentDurationFormatSetup(moment)

class PlayList extends React.Component {
  constructor(props) {
    super(props)
    this.player = this.props.player
    this.state = {
      animated: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animated: true })
    }, 1000)
  }

  play = (track) => {
    this.player.play(track)
  }

  pause = () => {
    this.player.pause()
  }

  goToSingerScreen = (person) => {
    const { _id, name } = person
    this.props.history.push(`/person/${_id}/${name}/خواننده`)
  }

  goToDastgahScreen = (title) => {
    this.props.history.push(`/dastgah/${title}`)
  }

  remove = (track) => {
    this.player.removeFromPlayList(track)
  }

  render() {
    const { show = false, playlist = [], currentTrack, isPlaying } = this.props
    const { animated } = this.state
    return (
      <div
        className={`play-list faster 
        ${animated ? 'animated ' : ''} 
        ${show ? 'slideInUp' : 'slideOutDown'}`}
      >
        <ul>
          {playlist.map((track, i) => {
            const { _id, title, singer, dastgah, duration } = track
            return (
              <li
                key={`pl_t_${_id}`}
                className={`pl-track ${
                  currentTrack._id === _id ? 'active' : ''
                }`}
              >
                <div className={'pl-track-index'}>{i + 1}</div>
                <div className={'pl-track-btns'}>
                  {isPlaying && currentTrack._id === _id ? (
                    <i className="fal fa-pause" onClick={this.pause}></i>
                  ) : (
                    <i
                      className="fal fa-play"
                      onClick={() => this.play(track)}
                    ></i>
                  )}
                </div>
                <div className={'pl-track-title'}>{title}</div>
                <div className={'pl-track-singers'}>
                  {singer.map((s) => (
                    <span
                      key={`singer_${s._id}`}
                      onClick={() => this.goToSingerScreen(s)}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
                <div
                  className={'pl-track-dastgah'}
                  onClick={() => this.goToDastgahScreen(dastgah)}
                >
                  {dastgah}
                </div>
                <div className={'pl-track-duration'}>
                  {moment.duration(duration, 'second').format('mm:ss')}
                </div>
                <div className={'pl-track-remove'}>
                  <i
                    className="fal fa-times-circle"
                    onClick={() => this.remove(track)}
                  ></i>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default withRouter(PlayList)
