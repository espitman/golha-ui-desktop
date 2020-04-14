import React from 'react'
import { withRouter } from 'react-router'
import { findIndex } from 'lodash'

import Loading from '../../component/loading'
import TrackRow from '../../component/track-row'

import './style.scss'

class DastgahScreen extends React.Component {
  constructor(props) {
    super(props)
    this.dastgahService = props.services.dastgahService
    this.state = {
      loading: true,
      active: 0,
      dastgahs: [],
      page: +props.match.params.page || 1,
      limit: 20
    }
  }

  async componentDidMount() {
    const { title: dastgahTitle } = this.props.match.params
    const dastgahs = await this.dastgahService.getAll()
    const promises = []
    const tracks = {}
    dastgahs.map((dastgah) => {
      promises.push(this.dastgahService.geTracksByTitle(dastgah.title))
    })
    const dTraks = await Promise.all(promises)
    dTraks.forEach((dTrack) => {
      tracks[dTrack.title] = dTrack.tracks
    })
    const active = dastgahTitle
      ? findIndex(dastgahs, { title: dastgahTitle })
      : 0

    this.setState({
      dastgahs,
      tracks,
      loading: false,
      active
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      const dastgahTitle = this.props.match.params.title
      const page = +this.props.match.params.page || 1
      const active = dastgahTitle
        ? findIndex(this.state.dastgahs, { title: dastgahTitle })
        : 0
      this.setActiveTab(active, page)
    } else if (prevProps.match.params.page !== this.props.match.params.page) {
      this.setPage(+this.props.match.params.page)
    }
  }

  goToTab = (dastgah) => {
    const { title } = dastgah
    this.props.history.push(`/dastgah/${title}/1`)
  }

  setActiveTab = (active, page) => {
    this.resetScroll()
    this.setState({
      page,
      active
    })
  }

  goToPage = (dastgah, page) => {
    this.resetScroll()
    const { title } = dastgah
    this.props.history.push(`/dastgah/${title}/${page}`)
  }

  setPage = (page) => {
    this.setState({ page })
  }

  resetScroll = () => {
    document.querySelector('.dastgah-tabs-body').scrollTo(0, 0)
  }

  render() {
    const { loading, dastgahs, active, tracks, page, limit } = this.state
    return (
      <div id="screen-dastgah">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="dastgah-tabs">
              <ul>
                {dastgahs.map((dastgah, i) => {
                  return (
                    <li
                      key={`dastgah_${i}`}
                      className={active === i ? 'active' : ''}
                      onClick={() => this.goToTab(dastgah)}
                    >
                      {dastgah.title}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="dastgah-tabs-body">
              {dastgahs.map((dastgah, i) => {
                return (
                  <div
                    key={`dastgah_tab_${i}`}
                    className={`dastgah-tabs-body-inner ${
                      active === i && 'active'
                    }`}
                  >
                    {tracks[dastgah.title]
                      .slice((page - 1) * limit, page * limit)
                      .map((track, i) => {
                        return (
                          <TrackRow
                            key={`track_${i}`}
                            index={(page - 1) * limit + i}
                            services={this.props.services}
                            type="large"
                            track={track}
                            player={this.props.player}
                            currentTrack={this.props.currentTrack}
                            isPlaying={this.props.isPlaying}
                          />
                        )
                      })}
                    <ul className="pagination">
                      {[
                        ...Array(
                          Math.ceil(tracks[dastgah.title].length / limit)
                        ).keys()
                      ].map((i) => {
                        return (
                          <li
                            className={i + 1 === page ? 'active' : ''}
                            key={`page_${i}`}
                            onClick={() => this.goToPage(dastgah, i + 1)}
                          >
                            {i + 1}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    )
  }
}

export default withRouter(DastgahScreen)
