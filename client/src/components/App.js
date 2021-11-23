import React from 'react';
import Destinations from './Destinations';
import FlightSelect from './FlightSelect';
import divider from '../assets/images/divider.svg';
import Navbar from './Navbar';
import FlightOffers from './FlightOffers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookingDetails from './BookingDetails';
// import { connect } from 'react-redux';
// import LoginPage from './LoginPage';
// import Challenges from './Challenges';
// import Leaderboards from './Leaderboards';
// import Navbar from './Navbar';
// import { getUser } from '../actions/authActions';
// import { clearErrors } from '../actions/errorActions';
// import Welcome from './Welcome';
// import Spinner from './Spinner';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact>
            <React.Fragment>
              <div
                className='flex justify-center items-center bg-primrary h-3/6'
                ref={this.myRef}>
                <FlightSelect />
              </div>
              <div
                className='bg-cover'
                style={{
                  backgroundImage: `url(${divider})`,
                  aspectRatio: '960/154',
                }}></div>
              <Destinations refProp={this.myRef} />
            </React.Fragment>
          </Route>
          <Route path='/flights' component={FlightOffers} />
          <Route path='/booking' component={BookingDetails} />
        </Switch>
      </Router>
    );
  }

  // componentDidMount() {
  //   this.props.clearErrors();
  //   this.props.getUser();
  // }
  // render() {
  //   if (this.props.isLoading) {
  //     return <Spinner />;
  //   }
  //   return (
  //     <Router>
  //       <div className='app'>
  //         <Navbar />
  //         <Switch>
  //           <Route path='/' exact>
  //             {this.props.isSignedIn ? <Welcome /> : <LoginPage />}
  //           </Route>
  //           <Route path='/challenges'>
  //             {this.props.isSignedIn ? (
  //               <Challenges />
  //             ) : (
  //               <LoginPage welcomeText='solve Challenges' />
  //             )}
  //           </Route>
  //           <Route path='/leaderboards'>
  //             {this.props.isSignedIn ? (
  //               <Leaderboards />
  //             ) : (
  //               <LoginPage welcomeText='view Leaderboards' />
  //             )}
  //           </Route>
  //         </Switch>
  //       </div>
  //     </Router>
  //   );
  // }
}

// const mapStateToProps = (state) => {
//   return { isSignedIn: state.auth.isSignedIn, isLoading: state.auth.loading };
// };

// export default connect(mapStateToProps, { getUser, clearErrors })(App);

export default App;
