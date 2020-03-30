import React from 'react'
import './style.scss'

import storage from '../../modules/storage'
import { PersonService } from '../../service/person'
import { ProgramService } from '../../service/program'

import Loading from '../../component/loading'
import PersonRow from '../../component/person-row'
import ProgramTitlesRow from '../../component/program-titles-row'
import { DastgahService } from '../../service/dastgah'
import DastgahRow from '../../component/dastgah-row'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      singers: [],
      programs: [],
      dastgahs: []
    }
    this.personService = new PersonService()
    this.programService = new ProgramService()
    this.dastgahService = new DastgahService()
  }

  async componentDidMount() {
    const [singers, programs, dastgahs] = await Promise.all([
      this.personService.getAllByRole('singer'),
      this.programService.getAll(),
      this.dastgahService.getAll()
    ])
    this.setState({
      singers,
      programs,
      dastgahs,
      loading: false
    })
    storage.set('programs', programs)
  }

  render() {
    const { singers, programs, dastgahs, loading } = this.state
    return (
      <div id="screen-home">
        {loading ? (
          <Loading />
        ) : (
          <>
            <ProgramTitlesRow programs={programs} />
            <PersonRow persons={singers} />
            <DastgahRow dastgahs={dastgahs} />
          </>
        )}
      </div>
    )
  }
}
