import React from 'react'
import './style.scss'

import { PersonService } from '../../service/person'
import { ProgramService } from '../../service/program'

import PersonRow from '../../component/person-row'
import ProgramTitlesRow from '../../component/program-titles-row'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      singers: [],
      programs: []
    }
    this.personService = new PersonService()
    this.programService = new ProgramService()
  }

  async componentDidMount() {
    const [singers, programs] = await Promise.all([
      this.personService.getAllByRole('singer'),
      this.programService.getAll()
    ])
    this.setState({
      singers,
      programs
    })
  }

  render() {
    const { singers, programs } = this.state
    return (
      <div id="screen-home">
        <ProgramTitlesRow programs={programs} />
        <PersonRow persons={singers} />
      </div>
    )
  }
}
