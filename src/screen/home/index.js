import React from 'react'
import './style.scss'

import { PersonService } from '../../service/person'

import PersonRow from '../../component/person-row'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      singers: []
    }
    this.personService = new PersonService()
  }

  async componentDidMount() {
    const singers = await this.personService.getAllByRole('singer')
    this.setState({
      singers
    })
  }

  render() {
    const { singers } = this.state
    return (
      <div id="screen-home">
        <PersonRow persons={singers} />
      </div>
    )
  }
}
