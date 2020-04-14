import React from 'react'
import { withRouter } from 'react-router'
import { findIndex } from 'lodash'

import Loading from '../../component/loading'

import ArtistPersons from './persons'
import ArtistInstruments from './instruments'

import './style.scss'

class ArtistsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.personService = props.services.personService
    this.state = {
      loading: true,
      active: 0,
      roles: []
    }
  }

  async componentDidMount() {
    const title = this.props.match.params.title
    const roles = await this.personService.getAllRoles()
    roles.reverse()
    const active = title ? findIndex(roles, { title }) : 0
    const instrument = this.props.match.params.instrument
    this.setState({ roles, active, instrument, loading: false })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      const title = this.props.match.params.title
      const active = title ? findIndex(this.state.roles, { title }) : 0
      this.setActiveTab(active)
    }
  }

  goToTab = (role) => {
    const { title } = role
    this.props.history.push(`/artists/${title}`)
  }

  setActiveTab = (active) => {
    this.resetScroll()
    this.setState({
      active
    })
  }

  resetScroll = () => {
    document.querySelector('.role-tabs-body').scrollTo(0, 0)
  }

  render() {
    const { loading, roles, active, instrument } = this.state
    return (
      <div id="screen-artists">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="role-tabs">
              <ul>
                {roles.map((role, i) => {
                  return (
                    <li
                      key={`role_${i}`}
                      className={active === i ? 'active' : ''}
                      onClick={() => this.goToTab(role)}
                    >
                      {role.title}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="role-tabs-body">
              {roles.map((role, i) => {
                return (
                  <div
                    key={`role_tab_${i}`}
                    className={`role-tabs-body-inner ${
                      active === i && 'active'
                    }`}
                  >
                    {role.persons ? (
                      <ArtistPersons role={role} />
                    ) : (
                      <ArtistInstruments role={role} instrument={instrument} />
                    )}
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
export default withRouter(ArtistsScreen)
