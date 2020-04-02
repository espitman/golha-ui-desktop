import React from 'react'
import './style.scss'

import storage from '../../modules/storage'

import Loading from '../../component/loading'
import PersonRow from '../../component/person-row'
import ProgramTitlesRow from '../../component/program-titles-row'
import DastgahRow from '../../component/dastgah-row'

const rows = ['programs-inner', 'singers-inner', 'dastgahs-inner']

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

    this.setScrollPositions()
  }

  componentWillUnmount() {
    this.saveScrollsPositions()
  }

  saveScrollsPositions() {
    rows.map((row) => {
      storage.set(
        `scroll-position-home-${row}`,
        document.querySelector(`#row-${row}`).scrollLeft
      )
    })
  }

  setScrollPositions() {
    rows.map((row) => {
      const position = storage.get(`scroll-position-home-${row}`)
      if (position != null) {
        document.querySelector(`#row-${row}`).scrollTo(position, 0)
      }
    })
  }

  render() {
    const { singers, programs, dastgahs, loading } = this.state
    return (
      <div id="screen-home">
        {loading ? (
          <Loading />
        ) : (
          <div className="home-main-box">
            <ProgramTitlesRow id="row-programs" programs={programs} />
            <PersonRow id="row-singers" persons={singers} />
            <DastgahRow id="row-dastgahs" dastgahs={dastgahs} />
          </div>
        )}
      </div>
    )
  }
}
