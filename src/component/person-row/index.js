import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { withRouter } from 'react-router-dom'
import config from '../../modules/config'

import 'react-lazy-load-image-component/src/effects/blur.css'

import './style.scss'

class PersonRow extends React.Component {
  handleClick = (person) => {
    const { id, name } = person
    this.props.history.push(`/person/${id}/${name}/خواننده`)
  }

  render() {
    const { id, style, persons } = this.props
    const width = persons.length * 170
    return (
      <div id={id} className="person-row">
        <h3>خواننده‌ها ({persons.length})</h3>
        <div id={`${id}-inner`} className="person-row-inner" style={style}>
          <ul style={{ width }}>
            {persons.map((person) => {
              const { id, name, image } = person
              return (
                <li
                  key={`person_${id}`}
                  onClick={() => this.handleClick(person)}
                >
                  <div className={'img'}>
                    {image ? (
                      <LazyLoadImage
                        alt={name}
                        effect="blur"
                        src={`${config.get('path.image.url')}${image}`}
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
      </div>
    )
  }
}

export default withRouter(PersonRow)
