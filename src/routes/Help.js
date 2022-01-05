import React from 'react';
import { Helmet } from 'react-helmet';

import Button from '../comp/button';

import position from '../styles/position.module.css';


class Help extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>How?</title>
        </Helmet>

        <h1 className={position.mainH1}>Help</h1>
        <div>Click on the button once it flashes <em>green</em>. You can also press space as well. Thanks elipie for suggesting this! Try to do it as quickly as possible! Once you get a good score, press save to save! Also, I was unable to add any links, so I had to put some useless things in the footer to make use of links. Thanks for understanding!</div>
        <h1>User interface</h1>
        <div>This may be slightly misleading, but to return back to the home page, click save locally. I made it this way so then you have a lower chance of losing your score.</div>
        <h1>Saving Score</h1>
        <div>Make sure to press save locally! Pressing retry will discard your score. Also, to upload to leaderboard, go to My Stats in the homepage.</div>
        
        <Button type="blue" to="/" css={position.bleft}>Home</Button>
        <Button type="green" to="/game" css={position.bsleft}>Play</Button>
      </>
    );
  }
}

export default Help;