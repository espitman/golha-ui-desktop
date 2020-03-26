import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.scss'
import '../common/css/fonts.scss'
import '../common/css/fontAwesome.all.min.scss'

import Side from '../component/side'

import HomeScreen from '../screen/home'
import ProgramsScreen from '../screen/programs'
import ArtistsScreen from '../screen/artists'
import ArchiveScreens from '../screen/archive'

function App() {
  return (
    <Router>
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
        </Switch>
      </div>
    </Router>
  )
}

export default App
