import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import './styles/style.css';

import App from './routes/App';
import Game from './routes/Game';
import Stats from './routes/Stats';
import Help from './routes/Help';
import Average from './routes/Avg';

import initiateLocalStorage from './util/localstorage';


class Render extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>

            <Route path="/game">
              <Game />
            </Route>

            <Route path="/help">
              <Help />
            </Route>

            <Route path="/stats">
              <Stats />
            </Route>

            <Route path="/average">
              <Average />
            </Route>

            <Redirect from="/reload" to="/game" />
          </Switch>
        </>
      </Router>
    );
  }

  componentDidMount() {
    initiateLocalStorage();
  }
}

ReactDOM.render(<Render />, document.getElementById('root'));