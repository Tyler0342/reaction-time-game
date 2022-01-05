import React from 'react';

import styles from '../styles/reaction.module.css';

import SetInterval from '../util/setInterval';


class Reaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false, // this is if we are ready to get input
      isSaved: false, // this is if the start time has been saved
      tickMs: 0, // this is to be compared with tickstart
      tickStart: Math.floor((Math.random() * 100 + 1)), // this is the milleseconds until it starts
      started: 0, // this is the time it flashes green
    };

    this.getTime = this.getTime.bind(this);
  }

  tick() {
    if (!this.state.isReady) {
      this.setState({
        tickMs: this.state.tickMs + 1
      });
      
      if (this.state.tickMs == this.state.tickStart) {
        this.setState({
          isReady: true
        });
      }
    } else {
      if (!this.state.isSaved) {
        this.setState({
          started: new Date().getTime(),
          isSaved: true
        })
      }
    }
  }

  componentDidMount() {
    this.interval = new SetInterval(this.tick.bind(this), 50);
    this.interval.start();
    document.addEventListener("keydown", this.getTime);

  }

  componentWillUnmount() {
    this.interval.stop();
    document.removeEventListener("keydown", this.getTime);
  }

  getTime() {
    if (!this.state.isReady) {
      this.props.handleWrong();
    } else {
      this.props.handleGot(new Date().getTime() - this.state.started);
    }
  }

  render() {
    return (
      <button
        onClick={this.getTime}
        className={`${this.state.isReady ? styles.ready : styles.pending} ${styles.react}`}
      >{this.state.isReady ? "Click!" : "Wait..."}</button>
    );
  }
}

export default Reaction;