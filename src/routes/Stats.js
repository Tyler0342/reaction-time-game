import React from 'react';
import { Helmet } from 'react-helmet';

import Button from '../comp/button';

import position from '../styles/position.module.css';
import statcss from '../styles/stats.module.css';


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      sortBy: "single" // single | average
    };

    this.changeSort = this.changeSort.bind(this);
  }

  componentDidMount() {
    // imagine being too lazy to add await
    // jk jk i don't want to do babel anymore
    fetch("/coder100s-api", { method: "GET" })
      .then(e => e.json())
      .then(data => this.setState({ data }));
  }

  sortByType(t) {
    return Object.keys(this.state.data).sort((user1, user2) => this.state.data[user1][t] - this.state.data[user2][t])
  }

  changeSort() {
    this.setState({ sortBy: this.state.sortBy == 'single' ? 'average' : 'single' });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Leaderboard</title>
        </Helmet>
        
        <h1 className={position.mainH1}>Leaderboard</h1>
        <div>These are our most nimble users! Can you beat them? Remember to go to 'my stats' upload to be on this list or use the button below!!</div>
        <div>Average is the person's average amount, and singles may be outliers.</div>
        <div className={statcss.rightAligned}>Sort by:
          <Button
            type="red"
            css={statcss.inline}
            onClick={this.changeSort}
            disabled
          >{this.state.sortBy}</Button>
        </div>
        
        <ol className={statcss.ol}>
          {
            this.state.data
              ? this.sortByType(this.state.sortBy).slice(0, 10).map(usr => (
                  <li key={usr}>
                    {usr}: {this.state.data[usr][this.state.sortBy]} ms
                  </li>
                ))
              : "Loading..."
          }
        </ol>
        
        <Button type="green" to="/" css={position.bleft}>Back</Button>
        <Button type="login" to="/" css={position.bsleft}>Upload Score</Button>
      </>
    );
  }
}

export default Stats;