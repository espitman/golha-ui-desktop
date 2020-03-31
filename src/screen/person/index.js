import React from 'react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import './style.scss'
import Loading from '../../component/loading'

class PersonScreen extends React.Component {
  constructor(props) {
    super(props)

    this.personService = props.services.personService

    this.state = {
      person: {},
      loading: true
    }
  }

  async componentDidMount() {
    const { id: personId } = this.props.match.params
    const [person, singers] = await Promise.all([
      this.personService.getPersonTracks(personId),
      this.personService.getAllByRole('singer')
    ])

    this.setState({ person, singers, loading: false })
  }

  render() {
    const { name, role } = this.props.match.params
    const {
      singers,
      person: { id, image, tracks },
      loading
    } = this.state
    return (
      <div id="screen-person">
        {loading ? (
          <Loading />
        ) : (
          <div className={'box-main'}>
            <div className={'box-main-left'}>
              <ul>
                {singers.map((singer) => {
                  return (
                    singer.id !== id && (
                      <li key={`singer_${singer.id}`}>{singer.name}</li>
                    )
                  )
                })}
              </ul>
            </div>
            <div className={'box-main-right'}>
              <div className={'box-name'}>
                <div className={'box-name-image'}>
                  <div className={'box-name-image-frame'}>
                    {!loading ? (
                      <LazyLoadImage
                        alt={name}
                        effect="blur"
                        src={`http://37.152.181.202:9000${image}`}
                      />
                    ) : (
                      <i className="fal fa-microphone-stand no-img"></i>
                    )}
                  </div>
                </div>
                <div className={'box-name-text'}>
                  <h1>{name}</h1>
                  <h2>{role}</h2>
                </div>
              </div>
              <div className={'box-tracks'}>
                <ul>
                  {tracks.map((track) => {
                    return <li key={`track_${track.id}`}>{track.title}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(PersonScreen)
