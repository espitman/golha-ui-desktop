import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Database } from '../modules/db'
import { ProgramService } from '../service/program'
import { PersonService } from '../service/person'

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
import { DastgahService } from '../service/dastgah'

const database = new Database()
const services = {
  programService: new ProgramService(database),
  personService: new PersonService(database),
  dastgahService: new DastgahService(database)
}

function App() {
  return (
    <Router>
      <TitleBar />
      <Side />
      <div id="main">
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
            <PersonScreen services={services} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
