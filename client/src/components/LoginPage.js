import React from 'react';
import './LoginPage.css';
import { connect } from 'react-redux';
import Spinner from './Spinner';
const base_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://simple-ctfd-clone.herokuapp.com'
    : 'http://localhost:5000';

class LoginPage extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <Spinner />;
    }
    return (
      <div className='content'>
        <h1 className='has-text-centered custom'>
          <a href={`${base_URI}/login`}>Login</a>{' '}
          {`with your BITS
          Email-ID to ${this.props.welcomeText}`}
        </h1>
      </div>
    );
  }
}

LoginPage.defaultProps = {
  welcomeText: 'continue',
};

const mapStateToProps = (state) => {
  return { isLoading: state.auth.isLoading };
};

export default connect(mapStateToProps)(LoginPage);
