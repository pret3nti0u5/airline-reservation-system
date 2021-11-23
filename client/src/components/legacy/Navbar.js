import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import logo from '../assets/simple-ctfd-clone-logo-navbar.png';
const base_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://production-server-link.com'
    : 'http://localhost:5000';

class Navbar extends React.Component {
  state = { clicked: false };
  renderButton() {
    if (this.props.isSignedIn) {
      return (
        <a href={`${base_URI}/logout`} className='button is-danger'>
          <strong>Log Out</strong>
          <span className='icon'>
            <i className='fab fa-google'></i>
          </span>
        </a>
      );
    }
    return (
      <a href={`${base_URI}/login`} className='button is-danger'>
        <strong>Log in</strong>
        <span className='icon'>
          <i className='fab fa-google'></i>
        </span>
      </a>
    );
  }

  render() {
    return (
      <nav className='navbar is-dark'>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <img src={logo} alt='logo' width='180' />
          </Link>
          <button
            onClick={() => this.setState({ clicked: !this.state.clicked })}
            className={`navbar-burger darkBg noBorder ${
              this.state.clicked ? 'is-active' : ''
            }`}
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </button>
        </div>
        <div className={`navbar-menu ${this.state.clicked ? 'is-active' : ''}`}>
          <div className='navbar-start'>
            <Link to='/challenges' className='navbar-item'>
              Challenges
            </Link>
            <Link to='/leaderboards' className='navbar-item'>
              Leaderboards
            </Link>
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>{this.renderButton()}</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Navbar);
