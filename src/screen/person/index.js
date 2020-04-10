import React from 'react'
import { withRouter } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import $ from 'jquery'
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

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      this.changePerson({ id: newProps.match.params.id })
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
    const target = e.target.className
    const scrollTop = e.target.scrollTop
    if (target === 'box-main-right' && scrollTop > 40) {
      $('.box-name').addClass('small')
    } else {
      $('.box-name').removeClass('small')
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
                  <div className={'box-name'}>
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
                          track={track}
                          player={this.props.player}
                          currentTrack={this.props.currentTrack}
                          isPlaying={this.props.isPlaying}
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
