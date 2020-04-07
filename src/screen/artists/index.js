import React from 'react'
import Loading from '../../component/loading'

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
    this.setState({ roles, loading: false })
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
            <div className="role-tabs-body"></div>
          </>
        )}
      </div>
    )
  }
}
