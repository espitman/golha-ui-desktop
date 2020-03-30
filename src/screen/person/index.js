import React from 'react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import './style.scss'
import storage from '../../modules/storage'

class PersonScreen extends React.Component {
  constructor(props) {
    super(props)

    this.personService = props.services.personService

    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const programs = storage.get('programs')
    const { id } = this.props.match.params
    const { info, count, tracks } = await this.personService.getPersonTracks(id)
    this.setState({ info, count, tracks, programs, loading: false })
  }

  getProgramTitle = (name) => {
    const { programs } = this.state
    return programs.find((x) => x.name === name).title
  }

  render() {
    const { name, role } = this.props.match.params
    const { info, loading } = this.state
    return (
      <div id="screen-person">
        <div className={'box-name'}>
          <div className={'box-name-image'}>
            <div className={'box-name-image-frame'}>
              {!loading ? (
                <LazyLoadImage
                  alt={name}
                  effect="blur"
                  src={`http://37.152.181.202:9000${info.image}`}
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
      </div>
    )
  }
}

export default withRouter(PersonScreen)
