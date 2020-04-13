/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import storage from '../modules/storage'

import { Database } from '../modules/db'
import { ProgramService } from '../service/program'
import { PersonService } from '../service/person'
import { DastgahService } from '../service/dastgah'
import { PlayerService } from '../service/player'

import './App.scss'
import '../common/css/context-menu.scss'

import Side from '../component/side'
import TitleBar from '../component/title-bar'
import Player from '../component/player'

import HomeScreen from '../screen/home'
import ProgramsScreen from '../screen/programs'
import ArtistsScreen from '../screen/artists'
import ArchiveScreens from '../screen/archive'
import AboutScreen from '../screen/about'
import SettingsScreen from '../screen/settings'
import PersonScreen from '../screen/person'
import DastgahScreen from '../screen/dastgah'

const database = new Database()
const services = {
  programService: new ProgramService(database),
  personService: new PersonService(database),
  dastgahService: new DastgahService(database),
  playerService: new PlayerService()
}

storage.clear()

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlayer: false,
      isPlaying: false,
      currentTrack: {}
    }
  }

  componentDidMount() {
    // Don`t remove it, its for fix production first navigation
    setTimeout(() => {
      // document.querySelector('a#homeLink').click()
    }, 5)
    this.disableKeys()
  }

  player = {
    play: (track) => {
      services.playerService.play(track)
      this.setState({
        currentTrack: services.playerService.track,
        showPlayer: services.playerService.visible,
        isPlaying: services.playerService.isPlaying
      })
    },
    pause: () => {
      services.playerService.pause()
      this.setState({
        isPlaying: services.playerService.isPlaying
      })
    },
    togglePlay: () => {
      services.playerService.togglePlay()
      const isPlaying = services.playerService.isPlaying
      this.setState({
        isPlaying
      })
      return isPlaying
    },
    hide: () => {
      services.playerService.hide()
      this.setState({
        showPlayer: services.playerService.visible,
        isPlaying: services.playerService.isPlaying
      })
    },
    playNextTrack: () => {
      const nextTrack = services.playerService.getNextTrack()
      if (nextTrack) {
        this.player.play(nextTrack)
      } else {
        this.player.pause()
      }
    },
    clearPlayList: () => {
      services.playerService.clearPlayList()
    },
    addToPlayList: (track) => {
      const isInPlayList = services.playerService.addToPlayList(track)
      if (
        !this.state.isPlaying &&
        services.playerService.playList.length === 1
      ) {
        this.player.play(track)
      }
      this.setState({ playlist: services.playerService.playList })
      return isInPlayList
    },
    removeFromPlayList: (track) => {
      this.setState({ playlist: services.playerService.playList })
      return services.playerService.removeFromPlayList(track)
    }
  }

  disableKeys = () => {
    window.addEventListener(
      'keydown',
      function (e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault()
        }
      },
      false
    )
  }

  render() {
    const { showPlayer, isPlaying, currentTrack, playlist } = this.state
    return (
      <Router>
        <TitleBar />
        <Side />
        <div id="main" className={showPlayer ? 'withPlayer' : ''}>
          <Switch>
            <Route exact path="/">
              <HomeScreen services={services} />
            </Route>
            <Route path="/programs/:name?/:page?">
              <ProgramsScreen
                services={services}
                player={this.player}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            </Route>
            <Route path="/artists/:title?/:instrument?">
              <ArtistsScreen
                services={services}
                player={this.player}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            </Route>
            <Route path="/archive">
              <ArchiveScreens services={services} />
            </Route>
            <Route path="/about">
              <AboutScreen services={services} />
            </Route>
            <Route path="/settings">
              <SettingsScreen services={services} />
            </Route>
            <Route path="/person/:id/:name/:role">
              <PersonScreen
                services={services}
                player={this.player}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            </Route>
            <Route path="/dastgah/:title?/:page?">
              <DastgahScreen
                services={services}
                player={this.player}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            </Route>
          </Switch>
        </div>
        <Player
          show={showPlayer}
          track={currentTrack}
          isPlaying={isPlaying}
          player={this.player}
          playlist={playlist}
        />
      </Router>
    )
  }
}

export default App
