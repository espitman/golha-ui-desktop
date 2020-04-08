import React from 'react'
import Loading from '../../component/loading'

import ArtistPersons from './persons'
import ArtistInstruments from './instruments'

import './style.scss'

export default class ArtistsScreen extends React.Component {
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
    const roles = await this.personService.getAllRoles()
    this.setState({ roles: roles.reverse(), loading: false })
  }

  setActiveTab = (active) => {
    this.resetScroll()
    this.setState({
      page: 1,
      active
    })
  }

  goToPage = (page) => {
    this.resetScroll()
    this.setState({ page })
  }

  resetScroll = () => {
    document.querySelector('.role-tabs-body').scrollTo(0, 0)
  }

  render() {
    const { loading, roles, active } = this.state
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
                      onClick={() => this.setActiveTab(i, role)}
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
                      <ArtistInstruments role={role} />
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
