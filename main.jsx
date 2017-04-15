import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Home from './components/pages/Home.jsx'
import Index from './components/pages/Index.jsx'
import Help from './components/pages/Help.jsx'
import Profile from './components/pages/Profile.jsx'
ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={Index} />
        <Route path="/help" component={Help} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  </div>
),
document.getElementById('mcroot')
)
