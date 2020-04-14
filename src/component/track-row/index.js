import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import config from '../../modules/config/index'

import 'react-lazy-load-image-component/src/effects/blur.css'
import './style.scss'

momentDurationFormatSetup(moment)

class TrackRow extends React.Component {
  constructor(props) {
    super(props)
    this.player = this.props.player
    this.state = {
      isInPlayList: this.player.isInPlayList(this.props.track._id)
    }
  }

  play = () => {
    this.player.play(this.props.track)
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

  addToPlayList = () => {
    const isInPlayList = this.player.addToPlayList(this.props.track)
    this.setState({ isInPlayList })
  }

  removeFromPlayList = () => {
    const isInPlayList = this.player.removeFromPlayList(this.props.track)
    this.setState({ isInPlayList })
  }

  render() {
    const {
      index,
      track: { _id: id, title, dastgah = '', duration, singer },
      currentTrack,
      isPlaying,
      type = 'small'
    } = this.props
    const isInPlayList = this.player.isInPlayList(id)
    return (
      <>
        <div
          className={`track-row ${type} ${
            currentTrack._id === id ? 'active' : ''
          }`}
        >
          <div className="track-row-index">{index + 1}</div>
          {type === 'large' && (
            <div className="track-row-img">
              {singer && singer[0] && singer[0].image ? (
                <LazyLoadImage
                  effect="blur"
                  src={`${config.get('path.image.url')}${singer[0].image}`}
                />
              ) : (
                <i className="fal fa-microphone-stand no-img"></i>
              )}
            </div>
          )}
          <div className="track-row-title">{title}</div>
          <div className="track-row-singers">
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
            className="track-row-dastgah"
            onClick={() => this.goToDastgahScreen(dastgah)}
          >
            {dastgah}
          </div>
          <div className="track-row-duration">
            {moment.duration(duration, 'second').format('mm:ss')}
          </div>
          <div className="track-row-play">
            {currentTrack._id === id && isPlaying ? (
              <i className="fal fa-pause" onClick={this.pause}></i>
            ) : (
              <i className="fal fa-play" onClick={this.play}></i>
            )}
          </div>
          <div className="track-row-menu">
            <ContextMenuTrigger
              id={`some_unique_identifier-${id}`}
              onClick={this.handleMenuClick}
              holdToDisplay={1}
            >
              <i className="fal fa-ellipsis-h"></i>
            </ContextMenuTrigger>
          </div>
        </div>
        <ContextMenu id={`some_unique_identifier-${id}`} rtl={true}>
          {currentTrack._id === id && isPlaying ? (
            <MenuItem onClick={this.pause}>توقف پخش</MenuItem>
          ) : (
            <MenuItem onClick={this.play}>پخش</MenuItem>
          )}
          {!isInPlayList ? (
            <MenuItem onClick={this.addToPlayList}>
              افزودن به صف در حال پخش
            </MenuItem>
          ) : (
            <MenuItem onClick={this.removeFromPlayList}>
              حذف از صف در حال پخش
            </MenuItem>
          )}

          <MenuItem onClick={this.handleClick}>افزودن به لیست</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={this.handleClick}>مشاهده مشخصات</MenuItem>
        </ContextMenu>
      </>
    )
  }
}

export default withRouter(TrackRow)
