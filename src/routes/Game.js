import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Reaction from "../comp/reaction";
import Button from "../comp/button";

import position from '../styles/position.module.css';
import gamecss from '../styles/game.module.css';

import { appendToAll } from '../util/localstorage';


class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reactionTime: 0, // this is the right time (clicked during window)
      tooEarly: false, // this is if too early
      canReturn: false, // this is if user has saved and so can return
    };

    this.handleWrong = this.handleWrong.bind(this);
    this.handleGot = this.handleGot.bind(this);
    this.saveScore = this.saveScore.bind(this);
  }

  handleWrong(t) {
    this.setState({ tooEarly: true });
  }

  handleGot(t) {
    this.setState({ reactionTime: t })
  }

  saveScore(e) {
    if (!this.state.canReturn) {
      appendToAll(this.state.reactionTime);
      this.setState({ canReturn: true })
    }

    // otherwise we can go on!
  }

  render() {
    if (this.state.tooEarly) {
      return (
        <>
          <Helmet>
            <title>Too Early!</title>
          </Helmet>
          
          <div className={gamecss.ereact}>
            <h1>Too Early!</h1>
            <div>You were too early!</div>
          </div>

          <Button type="red" to="/reload" css={position.bleft}>Retry</Button>
          <Button to="/" type="blue" css={position.bsleft}>Home</Button>
        </>
      );
    } else if (this.state.reactionTime) {
      return (
        <>
          <Helmet>
            <title>{`REACTion time: ${this.state.reactionTime}ms`}</title>
          </Helmet>

          <div className={gamecss.react}>
            <h1>Nice!</h1>
            <div>Reaction time: {this.state.reactionTime}ms</div>
            <div><strong>Remember to press save locally!</strong></div>
          </div>

          <Button type="red" to="/reload" css={position.bleft}>Retry</Button>
          
          <Button
            type="green"
            to="/"
            css={position.bsleft}
            onClick={this.saveScore}
            disabled={!this.state.canReturn}
          >
            {this.state.canReturn ? "Return" : "Save Locally"}
          </Button>
        </>
      );
    }

    return (
      <>
        <Helmet>
          <title>Get ready!</title>
        </Helmet>
        
        <Reaction
          handleWrong={this.handleWrong}
          handleGot={this.handleGot}
        />
      </>
    );
  }
}

export default Game;