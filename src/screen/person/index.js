import React from 'react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import './style.scss'
import Loading from '../../component/loading'
import PersonColumn from '../../component/person-column'
import TrackRow from '../../component/track-row'

class PersonScreen extends React.Component {
  constructor(props) {
    super(props)

    this.personService = props.services.personService

    this.state = {
      person: {},
      loading: true
    }
  }

  componentDidMount() {
    const { id: personId } = this.props.match.params
    this.getPersonData(personId)
  }

  getPersonData = async (personId) => {
    const [person, singers] = await Promise.all([
      this.personService.getPersonTracks(personId),
      this.personService.getAllByRole('singer')
    ])
    this.setState({ person, singers, loading: false })
  }

  changePerson = async (person) => {
    const { id } = person
    this.getPersonData(id)
  }

  render() {
    const { role } = this.props.match.params
    const {
      singers,
      person: { name, image, tracks },
      loading
    } = this.state
    return (
      <div id="screen-person">
        {loading ? (
          <Loading />
        ) : (
          <div className={'box-main'}>
            <div className={'box-main-left'}>
              <PersonColumn
                persons={singers}
                changePerson={this.changePerson}
              />
            </div>
            <div className={'box-main-right'}>
              <div className={'box-name'}>
                <div className={'box-name-image'}>
                  <div className={'box-name-image-frame'}>
                    {!loading && image ? (
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
                {tracks.map((track, i) => {
                  return <TrackRow key={`track_${i}`} track={track} />
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(PersonScreen)
