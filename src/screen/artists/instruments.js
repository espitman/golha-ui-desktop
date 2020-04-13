import React from 'react'
import { withRouter } from 'react-router'
import { findIndex } from 'lodash'

import ArtistPersons from './persons'

class ArtistInstruments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  componentDidMount() {
    const { instrument } = this.props
    if (instrument) {
      const active =
        findIndex(this.props.role.instruments, { name: instrument }) || 0
      this.setActive(active)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.instrument !== this.props.match.params.instrument
    ) {
      const instrument = this.props.match.params.instrument
      const active = instrument
        ? findIndex(this.props.role.instruments, { name: instrument })
        : 0
      this.setActive(active)
    }
  }

  goToInstrument = (instrument) => {
    const {
      role: { title }
    } = this.props
    const { name } = instrument
    this.props.history.push(`/artists/${title}/${name}`)
  }

  setActive = (active) => {
    this.setState({ active })
  }

  render() {
    const {
      role: { name, title, instruments }
    } = this.props
    const { active } = this.state
    return (
      <div id="artist-instruments">
        <div id="artist-instruments-head">
          <ul>
            {instruments.map((instrument, i) => {
              if (instrument.name != 'undefined') {
                return (
                  <li
                    className={active === i ? 'active' : ''}
                    key={`instrument_${name}_${instrument.name}`}
                    onClick={() => this.goToInstrument(instrument)}
                  >
                    {instrument.name}
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <div id="artist-instruments-body">
          {instruments.map((instrument, i) => {
            if (instrument.name != 'undefined') {
              return (
                <div
                  key={`instrument_persons_${i}`}
                  className={`artist-instruments-body-inner ${
                    active === i ? 'active' : ''
                  }`}
                >
                  <ArtistPersons
                    role={{
                      name,
                      title: `${title} ${instrument.name}`,
                      persons: instrument.persons
                    }}
                  />
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}
export default withRouter(ArtistInstruments)
