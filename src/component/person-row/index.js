import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { withRouter } from 'react-router-dom'

import 'react-lazy-load-image-component/src/effects/blur.css'

import './style.scss'

class PersonRow extends React.Component {
  handleClick = (person) => {
    const { _id, name } = person
    this.props.history.push(`/person/${_id}/${name}/خواننده`)
  }

  render() {
    const { style, persons } = this.props
    const width = persons.length * 170
    return (
      <div className="person-row" style={style}>
        <h3>خواننده‌ها</h3>
        <ul style={{ width }}>
          {persons.map((person) => {
            const { _id, name, image } = person
            return (
              <li
                key={`person_${_id}`}
                onClick={() => this.handleClick(person)}
              >
                <div className={'img'}>
                  {image ? (
                    <LazyLoadImage
                      alt={name}
                      effect="blur"
                      src={`http://37.152.181.202:9000${image}`}
                    />
                  ) : (
                    <i className="fal fa-microphone-stand no-img"></i>
                  )}
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

export default withRouter(PersonRow)
