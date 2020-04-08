import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { withRouter } from 'react-router-dom'
import config from '../../modules/config'

class ArtistPersons extends React.Component {
  render() {
    const {
      role: { name, persons }
    } = this.props
    return (
      <div className="persons-list">
        {persons.map((person) => {
          const { name, image } = person
          return (
            <div className={'person'} key={`persons_${name}_${person._id}`}>
              <div className={'img'}>
                <div className={'img-inner'}>
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
              </div>
              <span className="name">{name}</span>
            </div>
          )
        })}
      </div>
    )
  }
}
export default withRouter(ArtistPersons)
