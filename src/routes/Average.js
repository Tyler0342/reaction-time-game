import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Button from '../comp/button';

import position from '../styles/position.module.css';
import avgcss from '../styles/avg.module.css';

import { getAverage, getSingle, getAll } from '../util/localstorage';


class Average extends React.Component {
  constructor(props) {
    super(props);

    this.all = getAll().split(',').map(Number);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>My Stats</title>
        </Helmet>
        
        <h1 className={position.mainH1}>My Stats</h1>
        <div>These are your scores over {this.all.length} times!</div>
        <div><Link to="/game">Keep playing</Link> and get them lower! Don't forget to upload your scores so you can be on the global leaderboard!</div>

        <h1>By the numbers</h1>
        <div className={avgcss.point}>Best: {getSingle()}</div>
        <div className={avgcss.point}>Average: {getAverage()}</div>

        <h1>Logs</h1>
        <div className={avgcss.overflowDiv}>{
          this.all.map((e, i) => (<div className={avgcss.item} key={`div${i}`}>{e}</div>))
        }</div>
        
        <Button type="green" to="/" css={position.bleft}>Back</Button>
        <Button type="login" to="/" css={position.bsleft}>Upload Score</Button>
      </>
    );
  }
}

export default Average;