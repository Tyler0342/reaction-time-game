import React from 'react';
import { Helmet } from 'react-helmet';

import Button from '../comp/button';

import styles from '../styles/app.module.css';
import position from '../styles/position.module.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>REACTion</title>
        </Helmet>

        <h1 className={position.largeH1}>REACTion</h1>

        <Button to="/help" type="blue" css={styles.left}>Help</Button>
        <Button to="/game" type="green" css={styles.play}>Play</Button>
        <Button to="/stats" type="yellow" css={styles.right}>Leaders</Button>
        <Button to="/average" type="red" css={styles.big}>My Stats</Button>
      </>
    );
  }
}

export default App;