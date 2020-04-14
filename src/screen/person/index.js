import React from 'react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import config from '../../modules/config'

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
      role: this.props.match.params.role,
      loading: true,
      show: false
    }
  }

  componentDidMount() {
    const { id: personId } = this.props.match.params
    this.getPersonData(personId)
    window.addEventListener('scroll', this.handleScroll, true)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.changePerson({ id: this.props.match.params.id })
    }
  }

  getPersonData = async (personId) => {
    const [person, singers] = await Promise.all([
      this.personService.getPersonTracks(personId),
      this.personService.getAllByRole('singer')
    ])
    this.setState({ person, singers, show: true, loading: false })
  }

  changePerson = async (person) => {
    const { id } = person
    this.setState({ show: false })
    await this.getPersonData(id)
    this.setState({ role: 'خواننده' })
    setTimeout(() => {
      document.querySelector('.box-main-right').scrollTo(0, 0)
    }, 100)
  }

  handleScroll = (e) => {
    if (!this.nameBox) {
      return false
    }
    const target = e.target.className
    const scrollTop = e.target.scrollTop
    if (target === 'box-main-right' && scrollTop > 40) {
      this.nameBox.setAttribute('class', 'box-name small')
    } else {
      this.nameBox.setAttribute('class', 'box-name')
    }
  }

  render() {
    const {
      singers,
      person: { name, image, tracks },
      role,
      loading,
      show
    } = this.state
    return (
      <div id="screen-person">
        {loading ? (
          <Loading />
        ) : (
          <div className={'box-main'}>
            <div className={'box-main-left'}>
              <PersonColumn persons={singers} />
            </div>
            <div className={'box-main-right'}>
              {show ? (
                <>
                  <div
                    className={'box-name'}
                    ref={(ref) => (this.nameBox = ref)}
                  >
                    <div className={'box-name-image'}>
                      <div id="avatar" className={'box-name-image-frame'}>
                        {!loading && image ? (
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
                    <div className={'box-name-text'}>
                      <h1>{name}</h1>
                      <h2>{role}</h2>
                    </div>
                  </div>
                  <div className={'box-tracks'}>
                    {tracks.map((track, i) => {
                      return (
                        <TrackRow
                          key={`track_${i}`}
                          index={i}
                          services={this.props.services}
                          track={track}
                          player={this.props.player}
                          currentTrack={this.props.currentTrack}
                          isPlaying={this.props.isPlaying}
                          playlist={this.props.playlist}
                        />
                      )
                    })}
                  </div>
                </>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(PersonScreen)
