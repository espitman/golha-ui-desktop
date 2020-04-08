import React from 'react'
import ArtistPersons from './persons'

export default class ArtistInstruments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
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
                    onClick={() => this.setActive(i)}
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
