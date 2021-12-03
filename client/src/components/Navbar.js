import React from 'react';
import logo from '../assets/images/logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const base_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://production-server-link.com'
    : 'http://localhost:5000';

class Navbar extends React.Component {
  render() {
    if (this.props.isSignedIn) {
      return (
        <nav className='flex w-full p-5 bg-primrary'>
          <Link to='/'>
            <img src={logo} className='cursor-pointer' alt='logo' />
          </Link>
          <div className='flex items-center ml-auto'>
            <p className='text-gray-200 font-bold font-poppins uppercase mr-8'>
              {this.props.user.name}
            </p>
            <a
              href={`${base_URI}/logout`}
              className='rounded-md bg-tertiary text-gray-200 shadow-md font-bold font-poppins uppercase py-2 px-4 hover:bg-tertiaryDark'>
              Log Out
            </a>
          </div>
        </nav>
      );
    }
    return (
      <nav className='flex w-full p-5 bg-primrary'>
        <Link to='/'>
          <img src={logo} className='cursor-pointer' alt='logo' />
        </Link>
        <div className='flex items-center ml-auto'>
          <p className='text-gray-200 font-bold font-poppins uppercase mr-8'>
            Anonymous
          </p>
          <a
            href={`${base_URI}/login`}
            className='rounded-md bg-tertiary text-gray-200 shadow-md font-bold font-poppins uppercase py-2 px-4 hover:bg-tertiaryDark'>
            Log In
          </a>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, user: state.auth.user };
};

export default connect(mapStateToProps)(Navbar);
