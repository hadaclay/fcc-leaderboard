import React from 'react';
import ReactDOM from 'react-dom';

class LeaderboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topRecentPositions: [],
      allTimePositions: [],
      sortByRecent: true
    };

    this.getCamperPositions = this.getCamperPositions.bind(this);
    this.sortByRecent = this.sortByRecent.bind(this);
    this.sortByAll = this.sortByAll.bind(this);
  }

  componentDidMount() {
    this.getCamperPositions();
  }

  getCamperPositions() {
    const recentURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    const topURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    fetch(recentURL).then((response) => response.json())
                    .then((json) => this.setState({ topRecentPositions: json }));
    fetch(topURL).then((response) => response.json())
                 .then((json) => this.setState({ allTimePositions: json }));
  }

  sortByRecent() {
    this.setState({sortByRecent: true});
  }

  sortByAll() {
    this.setState({sortByRecent: false});
  }

  render() {
    const topRecents = this.state.topRecentPositions.map((user, current) => {
      return (
        <LeaderboardPosition
          key={current + 1}
          position={current + 1}
          name={user.username}
          imgSrc={user.img}
          recentPoints={user.recent}
          allPoints={user.alltime}
        />
      );
    });
    const topAll = this.state.allTimePositions.map((user, current) => {
      return (
        <LeaderboardPosition
          key={current + 1}
          position={current + 1}
          name={user.username}
          imgSrc={user.img}
          recentPoints={user.recent}
          allPoints={user.alltime}
        />
      );
    });

    return (
      <div>
        <div className='ui one column container'>
          <h1 className='ui top attached centered header'>FreeCodeCamp Leaderboard</h1>
          <table className='ui celled striped attached table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th className='center aligned'>
                  <a onClick={this.sortByRecent} href='#'>Points in past 30 days{this.state.sortByRecent ? '▾' : ''}</a>
                </th>
                <th className='center aligned'>
                  <a onClick={this.sortByAll} href='#'>All time points{this.state.sortByRecent ? '' : '▾'}</a>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.sortByRecent ? topRecents : topAll}
            </tbody>
          </table>
        </div>
        <div className='ui center aligned attached footer segment'>
          by <a href='https://github.com/hadaclay'>@hadaclay</a>
        </div>
      </div>
    );
  }
}

class LeaderboardPosition extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.position}</td>
        <td>
          <span><img className='ui mini spaced image' src={this.props.imgSrc}/></span>
          <a href={'https://www.freecodecamp.com/' + this.props.name}>{this.props.name}</a>
        </td>
        <td className='center aligned'>{this.props.recentPoints}</td>
        <td className='center aligned'>{this.props.allPoints}</td>
      </tr>
    );
  }
}

ReactDOM.render(
  <LeaderboardContainer />,
  document.getElementById('root')
)
