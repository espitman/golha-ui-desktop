import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { withRouter } from 'react-router-dom'
import config from '../../modules/config'

import 'react-lazy-load-image-component/src/effects/blur.css'

import './style.scss'

class PersonColumn extends React.Component {
  handleClick = (person) => {
    const { id, name } = person
    this.props.history.push(`/person/${id}/${name}/خواننده?id=${id}`)
  }

  render() {
    const { id, style, persons } = this.props
    return (
      <div id={id} className="person-column" style={style}>
        <h3>خواننده‌ها</h3>
        <ul>
          {persons.map((person, i) => {
            return (
              person.id !== id && (
                <li
                  key={`person_${person.id}`}
                  onClick={() => this.handleClick(person)}
                >
                  <div className={'img'}>
                    {person.image ? (
                      <LazyLoadImage
                        effect="blur"
                        src={`${config.get('path.image.url')}${person.image}`}
                      />
                    ) : (
                      <i className="fal fa-microphone-stand no-img"></i>
                    )}
                  </div>
                  <div className="text">
                    <span className="name">{person.name}</span>
                    <span className="role">خواننده</span>
                  </div>
                </li>
              )
            )
          })}
        </ul>
      </div>
    )
  }
}

export default withRouter(PersonColumn)
