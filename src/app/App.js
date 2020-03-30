import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.scss'
import '../common/css/fonts.scss'
import '../common/css/fontAwesome.all.min.scss'

import Side from '../component/side'
import TitleBar from '../component/title-bar'

import HomeScreen from '../screen/home'
import ProgramsScreen from '../screen/programs'
import ArtistsScreen from '../screen/artists'
import ArchiveScreens from '../screen/archive'
import AboutScreen from '../screen/about'
import SettingsScreen from '../screen/settings'
import PersonScreen from '../screen/person'

function App() {
  return (
    <Router>
      <TitleBar />
      <Side />
      <div id="main">
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/programs">
            <ProgramsScreen />
          </Route>
          <Route path="/artists">
            <ArtistsScreen />
          </Route>
          <Route path="/archive">
            <ArchiveScreens />
          </Route>
          <Route path="/about">
            <AboutScreen />
          </Route>
          <Route path="/settings">
            <SettingsScreen />
          </Route>
          <Route path="/person/:id/:name/:role">
            <PersonScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
