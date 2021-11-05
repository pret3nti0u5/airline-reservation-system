import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import Challenges from './Challenges';
import Leaderboards from './Leaderboards';
import Navbar from './Navbar';
import { getUser } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import Welcome from './Welcome';
import Spinner from './Spinner';

class App extends React.Component {
  componentDidMount() {
    this.props.clearErrors();
    this.props.getUser();
  }
  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    return (
      <Router>
        <div className='app'>
          <Navbar />
          <Switch>
            <Route path='/' exact>
              {this.props.isSignedIn ? <Welcome /> : <LoginPage />}
            </Route>
            <Route path='/challenges'>
              {this.props.isSignedIn ? (
                <Challenges />
              ) : (
                <LoginPage welcomeText='solve Challenges' />
              )}
            </Route>
            <Route path='/leaderboards'>
              {this.props.isSignedIn ? (
                <Leaderboards />
              ) : (
                <LoginPage welcomeText='view Leaderboards' />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, isLoading: state.auth.loading };
};

export default connect(mapStateToProps, { getUser, clearErrors })(App);
