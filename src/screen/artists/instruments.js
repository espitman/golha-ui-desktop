import React from 'react'
// import ArtistPersons from './persons'

export default class ArtistInstruments extends React.Component {
  render() {
    const {
      role: { name, instruments }
    } = this.props
    return (
      <div id="artist-instruments">
        <div id="artist-instruments-head">
          <ul>
            {instruments.map((instrument) => {
              if (instrument.name != 'undefined') {
                return (
                  <li key={`instrument_${name}_${instrument.name}`}>
                    {instrument.name}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    )
  }
}

{
  /* <ArtistPersons
role={{ name, title, persons: instrument.persons }}
/> */
}
