import React from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import './style.scss'

momentDurationFormatSetup(moment)

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.player = props.player
    this.state = {
      currentTime: 0
    }
  }

  componentDidMount() {
    this.media = $('#media')
    this.audio = $('#media')[0]
    this.setCurrentTime()
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(newProps) {
    const { track } = newProps
    const src = `http://37.152.181.202:9000/golha/music/${track.file}`
    if (!this.props.track || track._id !== this.props.track._id) {
      this.media.attr('src', src)
      this.audio.play()
    }
  }

  togglePlay = () => {
    const isPlaying = this.player.togglePlay()
    !isPlaying ? this.audio.pause() : this.audio.play()
  }

  setCurrentTime = () => {
    setInterval(() => {
      this.setState({ currentTime: this.audio.currentTime })
    }, 1000)
  }

  render() {
    const {
      show,
      isPlaying,
      track: { title, dastgah = '', singer = [{}], duration }
    } = this.props
    const { currentTime } = this.state
    return (
      <div id="player" className={show ? 'show' : ''}>
        <audio id="media">
          <source type="audio/mpeg" />
        </audio>
        {this.audio && (
          <>
            <div className={'player-box-name'}>
              <div className={'player-box-name-image'}>
                <div id="avatar" className={'player-box-name-image-frame'}>
                  {singer[0].image ? (
                    <LazyLoadImage
                      effect="blur"
                      src={`http://37.152.181.202:9000${singer[0].image}`}
                    />
                  ) : (
                    <i className="fal fa-microphone-stand no-img"></i>
                  )}
                </div>
              </div>
              <div className={'player-box-name-text'}>
                <div className={'player-box-name-text-title'}>
                  {title} {dastgah && <span>{dastgah}</span>}
                </div>
                <div className={'player-box-name-text-singer'}>
                  {singer.map((s) => (
                    <span key={`singer_${s._id}`}>{s.name}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={'player-box-controller'}>
              <div className={'player-box-controller-btns'}>
                <i className="arrow fal fa-fast-backward"></i>
                <i
                  onClick={this.togglePlay}
                  className={`play fal ${isPlaying ? 'fa-pause' : 'fa-play'}`}
                ></i>
                <i className="arrow fal fa-fast-forward"></i>
              </div>
              <div className={'player-box-controller-time'}>
                <div className={'player-box-controller-time-current'}>
                  {moment
                    .duration(currentTime, 'second')
                    .format('mm:ss', { trim: false })}
                </div>
                <div className={'player-box-controller-time-bar'}>
                  <div className={'bar'}></div>
                </div>
                <div className={'player-box-controller-time-duration'}>
                  {moment.duration(duration, 'second').format('mm:ss')}
                </div>
              </div>
            </div>
            <div className={'player-box-volume'}></div>
          </>
        )}
      </div>
    )
  }
}

export default withRouter(Player)
