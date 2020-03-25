import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './App.scss'

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
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
