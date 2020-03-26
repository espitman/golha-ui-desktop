import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import './style.scss'

export default class PersonRow extends React.Component {
  render() {
    const { persons } = this.props
    const width = persons.length * 210
    return (
      <div className="person-row">
        <h3>خواننده‌ها</h3>
        <ul style={{ width }}>
          {persons.map((person) => {
            const { id, name, image } = person
            return (
              <li key={`person_${id}`}>
                <div className={'img'}>
                  <LazyLoadImage
                    alt={name}
                    effect="blur"
                    width={200}
                    height={200}
                    src={`http://37.152.181.202:9000${image}`}
                  />
                </div>
                <span className="name">{name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
