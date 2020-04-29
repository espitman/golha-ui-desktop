/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import storage from '../modules/storage'

import { Database } from '../modules/db'
import { Socket } from '../modules/socket'

import { ProgramService } from '../service/program'
import { PersonService } from '../service/person'
import { DastgahService } from '../service/dastgah'
import { UserService } from '../service/user'

import './App.scss'
import '../common/css/context-menu.scss'
import '../common/css/gForm.scss'
import 'react-toastify/dist/ReactToastify.css'

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

import PlayerProvider from '../provider/player'
import SigninScreen from '../screen/signin'
import UserProvider from '../provider/user'

const database = new Database()
const socket = new Socket()
const services = {
  programService: new ProgramService(database),
  personService: new PersonService(database),
  dastgahService: new DastgahService(database),
  userService: new UserService()
}

const me = storage.get('user') || {}
storage.clear()
storage.set('user', me)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPlayer: false,
      isPlaying: false,
      currentTrack: {},
      currentTime: 0,
      user: me
    }
    this.player = new PlayerProvider({
      stateSetter: this.stateSetter,
      socket
    })
    this.userProvider = new UserProvider({ stateSetter: this.stateSetter })
  }

  componentDidMount() {
    // Don`t remove it, its for fix production first navigation
    setTimeout(() => {
      // document.querySelector('a#homeLink').click()
    }, 5)
    this.disableKeys()
    this.restoreLastState()
    this.saveStateOnClose()
  }

  stateSetter = (states) => {
    this.setState(states)
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

  restoreLastState = async () => {
    const { user } = this.state
    if (!Object.keys(user).length) {
      return false
    }
    const {
      currentTrack,
      currentTime,
      playlist
    } = await services.userService.getLastState()
    if (playlist) {
      this.player.addToPlayListGroup(playlist)
    }
    if (currentTrack) {
      this.player.play(currentTrack)
      setTimeout(() => this.player.pause())
    }
    if (currentTime) {
      this.setState({ currentTime })
    }
  }

  saveStateOnClose = () => {
    window.addEventListener('beforeunload', (ev) => {
      socket.emit('app/close', {
        currentTime: this.player.currentTime
      })
    })
  }

  render() {
    const {
      showPlayer,
      isPlaying,
      currentTrack,
      currentTime,
      playlist,
      user
    } = this.state
    return (
      <Router>
        <ToastContainer
          position="bottom-right"
          rtl={true}
          bodyClassName="gToastify"
        />
        <TitleBar />
        <Side user={user} />
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
            <Route path="/signin">
              <SigninScreen
                services={services}
                userProvider={this.userProvider}
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
          time={currentTime}
          isPlaying={isPlaying}
          player={this.player}
          playlist={playlist}
        />
      </Router>
    )
  }
}

export default App
