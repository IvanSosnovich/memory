import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Navigation from '../Navigation';
import Login from '../Login';
import Register from '../Register';
import Profile from '../Profile';

export default function MainPage() {
  const auth = false;
  if (auth) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Profile />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
