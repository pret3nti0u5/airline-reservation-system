import React from 'react';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
class Navbar extends React.Component {
  render() {
    return (
      <nav className='flex w-full p-5 bg-primrary'>
        <Link to='/'>
          <img src={logo} className='cursor-pointer' alt='logo' />
        </Link>
        <div className='flex items-center ml-auto'>
          <p className='text-gray-200 font-bold font-poppins uppercase mr-8'>
            Anonymous
          </p>
          <button className='rounded-md bg-tertiary text-gray-200 shadow-md font-bold font-poppins uppercase py-2 px-4 hover:bg-tertiaryDark'>
            Log In
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
