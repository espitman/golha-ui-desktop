import React from 'react'
import { withRouter } from 'react-router'
import { findIndex } from 'lodash'

import Loading from '../../component/loading'
import TrackRow from '../../component/track-row'

import './style.scss'

class ProgramsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.programService = props.services.programService

    this.state = {
      loading: true,
      programs: [],
      active: 0,
      page: +props.match.params.page || 1,
      limit: 20
    }
  }

  async componentDidMount() {
    const [programs] = await Promise.all([this.programService.getAll()])
    const promises = []
    const tracks = {}
    programs.map((program) => {
      promises.push(this.programService.getTracks(program.name))
    })
    const pTraks = await Promise.all(promises)
    pTraks.forEach((pTrack) => {
      tracks[pTrack.name] = pTrack.tracks
    })
    const { name: programName } = this.props.match.params
    const active = programName ? findIndex(programs, { name: programName }) : 0

    this.setState({
      programs,
      tracks,
      loading: false,
      active
    })
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.name !== this.props.match.params.name) {
      const programName = newProps.match.params.name
      const page = +newProps.match.params.page || 1
      const active = programName
        ? findIndex(this.state.programs, { name: programName })
        : 0
      this.setActiveTab(active, page)
    } else if (newProps.match.params.page !== this.props.match.params.page) {
      this.setPage(+newProps.match.params.page)
    }
  }

  setActiveTab = (active, page) => {
    this.resetScroll()
    this.setState({
      page,
      active
    })
  }

  goToTab = (program) => {
    const { name } = program
    this.props.history.push(`/programs/${name}/1`)
  }

  goToPage = (program, page) => {
    this.resetScroll()
    const { name } = program
    this.props.history.push(`/programs/${name}/${page}`)
  }

  setPage = (page) => {
    this.setState({ page })
  }

  resetScroll = () => {
    document.querySelector('.program-tabs-body').scrollTo(0, 0)
  }

  render() {
    const { programs, loading, active, tracks, page, limit } = this.state
    return (
      <div id="screen-programs">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="programs-tabs">
              <ul>
                {programs.map((program, i) => {
                  return (
                    <li
                      key={`program_${i}`}
                      className={active === i ? 'active' : ''}
                      onClick={() => this.goToTab(program)}
                    >
                      {program.title}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="program-tabs-body">
              {programs.map((program, i) => {
                return (
                  <div
                    key={`program_tab_${i}`}
                    className={`program-tabs-body-inner ${
                      active === i && 'active'
                    }`}
                  >
                    {tracks[program.name]
                      .slice((page - 1) * limit, page * limit)
                      .map((track, i) => {
                        return (
                          <TrackRow
                            key={`track_${i}`}
                            index={(page - 1) * limit + i}
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
                          Math.ceil(tracks[program.name].length / limit)
                        ).keys()
                      ].map((i) => {
                        return (
                          <li
                            className={i + 1 === page ? 'active' : ''}
                            key={`page_${i}`}
                            onClick={() => this.goToPage(program, i + 1)}
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
export default withRouter(ProgramsScreen)
