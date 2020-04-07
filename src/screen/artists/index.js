import React from 'react'

import './style.scss'

export default class ArtistsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.personService = props.services.personService
    this.state = {
      loading: true,
      active: 0
    }
  }

  async componentDidMount() {
    const persons = await this.personService.getAllRoles()
    console.log({ persons })
  }

  render() {
    return (
      <div id="screen-artists">
        <h1>هنرمندان</h1>
      </div>
    )
  }
}
