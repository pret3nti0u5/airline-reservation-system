import React from 'react';
import './LoginPage.css';
import { connect } from 'react-redux';
import Spinner from './Spinner';

class Welcome extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    return (
      <div className='content'>
        <h1 className='has-text-centered custom'>{`Welcome, ${this.props.user.name}`}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user, isLoading: state.auth.isLoading };
};

export default connect(mapStateToProps)(Welcome);
