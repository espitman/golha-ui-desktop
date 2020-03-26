import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.scss'
import '../common/css/fonts.scss'
import '../common/css/fontAwesome.all.min.scss'

import HomeScreen from '../screen/home'
import Side from '../component/side'

function App() {
  return (
    <Router>
      <Side />
      <div id="main">
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/dashboard">
            <h1>Dashboard</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
