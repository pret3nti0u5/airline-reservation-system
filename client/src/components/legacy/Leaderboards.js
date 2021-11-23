import React from 'react';
import { connect } from 'react-redux';
import './Leaderboards.css';
import { getLeaderboard } from '../actions/leaderboardActions';
import { clearErrors } from '../actions/errorActions';
import Spinner from './Spinner';

class Leaderboards extends React.Component {
  componentDidMount() {
    this.props.clearErrors();
    this.props.getLeaderboard();
  }

  render() {
    if (this.props.errors.status) {
      return (
        <div className='section has-text-centered error'>
          <p>{`${this.props.errors.status}: ${this.props.errors.msg}`}</p>
        </div>
      );
    }
    if (this.props.leaderboards.loading || this.props.isLoading) {
      return <Spinner />;
    }
    if (this.props.leaderboards.leaderboards.length === 0) {
      return (
        <div className='section'>
          <p className='title is-flex is-justify-content-center big-text'>
            No one's here yet :|
          </p>
        </div>
      );
    }
    return (
      <div className='section is-flex is-justify-content-center'>
        <table className='table'>
          <thead>
            <tr>
              <th>
                <abbr title='Postion'>Pos</abbr>
              </th>
              <th>Name</th>
              <th>E-Mail</th>
              <th>Score</th>
              <th>Challenges Solved</th>
            </tr>
          </thead>
          <tbody>
            {this.props.leaderboards.leaderboards.map((user, index) => {
              return (
                <tr key={user.googleId}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.score}</td>
                  <td>{user.solvedSet.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leaderboards: state.leaderboards,
    loading: state.leaderboards.loading,
    errors: state.errors,
    isLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps, { getLeaderboard, clearErrors })(
  Leaderboards
);
