import React from 'react'
import './style.scss'

import storage from '../../modules/storage'

import Loading from '../../component/loading'
import PersonRow from '../../component/person-row'
import ProgramTitlesRow from '../../component/program-titles-row'
import DastgahRow from '../../component/dastgah-row'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.programService = props.services.programService
    this.personService = props.services.personService
    this.dastgahService = props.services.dastgahService

    this.state = {
      loading: true,
      singers: [],
      programs: [],
      dastgahs: []
    }
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
