import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import 'react-lazy-load-image-component/src/effects/blur.css'
import './style.scss'

momentDurationFormatSetup(moment)

class TrackRow extends React.Component {
  constructor(props) {
    super(props)
  }

  play = () => {
    this.props.player.play(this.props.track)
  }

  render() {
    const {
      index,
      track: { _id: id, title, dastgah = '', duration }
    } = this.props
    return (
      <>
        <div className="track-row">
          <div className="track-row-index">{index + 1}</div>
          <div className="track-row-title">{title}</div>
          <div className="track-row-dastgah">{dastgah}</div>
          <div className="track-row-duration">
            {moment.duration(duration, 'second').format('mm:ss')}
          </div>
          <div className="track-row-play">
            <i className="fal fa-play" onClick={this.play}></i>
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
          <MenuItem data={{ foo: 'bar' }} onClick={this.handleClick}>
            پخش
          </MenuItem>
          <MenuItem data={{ foo: 'bar' }} onClick={this.handleClick}>
            افزودن به صف در حال پخش
          </MenuItem>
          <MenuItem data={{ foo: 'bar' }} onClick={this.handleClick}>
            افزودن به لیست
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ foo: 'bar' }} onClick={this.handleClick}>
            مشاهده مشخصات
          </MenuItem>
        </ContextMenu>
      </>
    )
  }
}

export default withRouter(TrackRow)
