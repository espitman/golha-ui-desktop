/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import storage from '../modules/storage'

import { Database } from '../modules/db'
import { ProgramService } from '../service/program'
import { PersonService } from '../service/person'
import { DastgahService } from '../service/dastgah'

import './App.scss'
import '../common/css/fonts.scss'
import '../common/css/fontAwesome.all.min.scss'
import '../common/css/context-menu.scss'

import Side from '../component/side'
import TitleBar from '../component/title-bar'

import HomeScreen from '../screen/home'
import ProgramsScreen from '../screen/programs'
import ArtistsScreen from '../screen/artists'
import ArchiveScreens from '../screen/archive'
import AboutScreen from '../screen/about'
import SettingsScreen from '../screen/settings'
import PersonScreen from '../screen/person'
import Player from '../component/player'
import { PlayerService } from '../service/player'

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
      track: {}
    }
  }

  player = {
    play: (track) => {
      services.playerService.play(track)
      this.setState({
        track: services.playerService.track,
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
    }
  }

  render() {
    const { showPlayer, isPlaying, track } = this.state
    return (
      <Router>
        <TitleBar />
        <Side />
        <div id="main" className={showPlayer ? 'withPlayer' : ''}>
          <Switch>
            <Route exact path="/">
              <HomeScreen services={services} />
            </Route>
            <Route path="/programs">
              <ProgramsScreen services={services} />
            </Route>
            <Route path="/artists">
              <ArtistsScreen services={services} />
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
              <PersonScreen services={services} player={this.player} />
            </Route>
          </Switch>
        </div>
        <Player
          show={showPlayer}
          track={track}
          isPlaying={isPlaying}
          player={this.player}
        />
      </Router>
    )
  }
}

export default App
