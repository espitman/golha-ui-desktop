import React from 'react'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import 'react-lazy-load-image-component/src/effects/blur.css'
import './style.scss'

momentDurationFormatSetup(moment)

class TrackRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { title, dastgah = '', duration } = this.props.track
    return (
      <div className="track-row">
        <div className="track-row-title">{title}</div>
        <div className="track-row-dastgah">{dastgah}</div>
        <div className="track-row-duration">
          {moment.duration(duration, 'second').format('mm:ss')}
        </div>
      </div>
    )
  }
}

export default withRouter(TrackRow)
