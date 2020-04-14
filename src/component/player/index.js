import React from 'react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import Slider from 'rc-slider'
import Hotkeys from 'react-hot-keys'

import config from '../../modules/config'

import PlayList from '../play-list'

import 'rc-slider/assets/index.css'
import './style.scss'

momentDurationFormatSetup(moment)

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.player = props.player

    this.state = {
      currentTime: 0,
      volume: 0,
      step: 10,
      showPlayList: false
    }
  }

  componentDidMount() {
    this.setCurrentTime()
    this.setCurrentVolume()
    this.setEnded()
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props
    const { track, isPlaying } = newProps
    const src = `${config.get('path.music.url')}/${track.file}`
    if (!prevProps.track || track._id !== prevProps.track._id) {
      this.audio.pause()
      this.audio.currentTime = 0
      setTimeout(() => {
        this.audio.setAttribute('src', src)
        this.audio.play()
      })
    } else if (isPlaying !== prevProps.isPlaying) {
      !isPlaying ? this.audio.pause() : this.audio.play()
    }
  }

  togglePlay = () => {
    const isPlaying = this.player.togglePlay()
    !isPlaying ? this.audio.pause() : this.audio.play()
  }

  setCurrentTime = () => {
    this.audio.ontimeupdate = () => {
      this.setState({ currentTime: this.audio.currentTime })
    }
  }

  onSliderChange = (value) => {
    this.setState({ step: 1 })
    this.audio.currentTime = value
  }

  onAfterChange = () => {
    document.querySelector('a#homeLink').focus()
    this.setState({ step: 10 })
  }

  setCurrentVolume = () => {
    this.setState({ volume: this.audio.volume * 100 })
  }

  onVolumeChange = (value) => {
    this.audio.volume = value / 100
    this.setCurrentVolume()
  }

  setVolumeUp = () => {
    this.audio.volume = Math.min(1, this.audio.volume + 0.1)
    this.setCurrentVolume()
  }

  setVolumeDown = () => {
    this.audio.volume = Math.max(0, this.audio.volume - 0.1)
    this.setCurrentVolume()
  }

  mute = () => {
    this.setState({ lastVolume: this.audio.volume })
    this.audio.volume = 0
    this.setState({ volume: 0 })
  }

  unmute = () => {
    this.audio.volume = this.state.lastVolume
    this.setState({ volume: this.state.lastVolume * 100 })
  }

  setEnded = () => {
    const player = this.player
    const audio = this.audio
    this.audio.onended = () => {
      player.pause()
      audio.currentTime = 0
      this.playNextTrack()
    }
  }

  fastBackward = () => {
    this.audio.currentTime -= 10
  }

  fastForward = () => {
    this.audio.currentTime += 10
  }

  onKeyDown = (keyName) => {
    switch (keyName) {
      case 'space':
        this.togglePlay()
        break
      case 'up':
        this.setVolumeUp()
        break
      case 'right':
        this.fastForward()
        break
      case 'down':
        this.setVolumeDown()
        break
      case 'left':
        this.fastBackward()
        break
    }
  }

  goToPerson = (person) => {
    const { _id, name } = person
    this.props.history.push(`/person/${_id}/${name}/خواننده?id=${_id}`)
  }

  playNextTrack = () => {
    this.player.playNextTrack()
  }

  togglePlayList = () => {
    this.setState((prevState) => {
      return { showPlayList: !prevState.showPlayList }
    })
  }

  render() {
    const {
      show,
      isPlaying,
      track: { title, dastgah = '', singer = [{}], duration }
    } = this.props
    const { currentTime, volume, step, showPlayList } = this.state
    return (
      <Hotkeys keyName="space,up,right,down,left" onKeyDown={this.onKeyDown}>
        <div id="player" className={show ? 'show' : ''}>
          <audio id="media" ref={(ref) => (this.audio = ref)}>
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
                        src={`${config.get('path.image.url')}${
                          singer[0].image
                        }`}
                      />
                    ) : (
                      <i className="fal fa-microphone-stand no-img"></i>
                    )}
                  </div>
                </div>
                <div className={'player-box-name-text'}>
                  <div className={'player-box-name-text-title'}>
                    {title}{' '}
                    {dastgah && <span className={'dastgah'}>{dastgah}</span>}
                  </div>
                  <div className={'player-box-name-text-singer'}>
                    {singer.map((s) => (
                      <span
                        key={`singer_${s._id}`}
                        onClick={() => this.goToPerson(s)}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={'player-box-controller'}>
                <div className={'player-box-controller-btns'}>
                  <i
                    className="arrow fal fa-fast-backward"
                    onClick={this.fastBackward}
                  ></i>
                  <i
                    onClick={this.togglePlay}
                    className={`play fal ${isPlaying ? 'fa-pause' : 'fa-play'}`}
                  ></i>
                  <i
                    className="arrow fal fa-fast-forward"
                    onClick={this.fastForward}
                  ></i>
                </div>
                <div className={'player-box-controller-time'}>
                  <div className={'player-box-controller-time-current'}>
                    {moment
                      .duration(currentTime, 'second')
                      .format('mm:ss', { trim: false })}
                  </div>
                  <div className={'player-box-controller-time-bar'}>
                    <div className={'bar'}>
                      <Slider
                        min={0}
                        max={duration}
                        defaultValue={0}
                        step={step}
                        value={currentTime}
                        onChange={this.onSliderChange}
                        onAfterChange={this.onAfterChange}
                      />
                    </div>
                  </div>
                  <div className={'player-box-controller-time-duration'}>
                    {moment.duration(duration, 'second').format('mm:ss')}
                  </div>
                </div>
              </div>
              <div className={'player-box-options'}>
                <div className={'player-box-options-btns'}>
                  <i
                    className={`fal fa-list-music playlist ${
                      this.props.playlist && this.props.playlist.length > 0
                        ? 'active'
                        : ''
                    }`}
                    onClick={this.togglePlayList}
                  ></i>
                  <i className="fal fa-user-music active"></i>
                </div>
                <div className={'player-box-options-volume'}>
                  {volume === 0 ? (
                    <i className="fal fa-volume-off" onClick={this.unmute}></i>
                  ) : (
                    <i className="fal fa-volume" onClick={this.mute}></i>
                  )}
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={volume}
                    value={volume}
                    onChange={this.onVolumeChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {show && (
          <PlayList
            show={showPlayList}
            playlist={this.props.playlist}
            currentTrack={this.props.track}
            player={this.player}
            isPlaying={isPlaying}
          />
        )}
      </Hotkeys>
    )
  }
}

export default withRouter(Player)
