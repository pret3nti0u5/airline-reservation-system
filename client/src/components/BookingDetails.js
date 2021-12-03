import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import visLogo from '../assets/images/visLogo.svg';
import aiLogo from '../assets/images/aiLogo.svg';
import SeatMap from './SeatMap';

class BookingDetails extends React.Component {
  state = {
    title: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    selectedSeat: '',
    payActive: false,
  };

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.setState({
        email: this.props.user.email,
        mobileNo: this.props.user.mobileNo,
      });
      if (this.props.user.title !== '') {
        this.setState({ title: this.props.user.title });
      }
      if (this.props.user.name.split(' ').length === 2) {
        this.setState({
          firstName: this.props.user.name.split(' ')[0],
          lastName: this.props.user.name.split(' ')[1],
        });
      } else if (this.props.user.name.split(' ').length === 3) {
        this.setState({
          firstName: this.props.user.name.split(' ')[0],
          middleName: this.props.user.name.split(' ')[1],
          lastName: this.props.user.name.split(' ')[2],
        });
      }
    }
  }

  componentDidUpdate() {
    if (
      this.state.firstName !== '' &&
      this.state.lastName !== '' &&
      this.state.email !== '' &&
      this.state.mobileNo.length === 10 &&
      this.validateEmail(this.state.email) &&
      this.state.selectedSeat !== '' &&
      !this.state.payActive
    ) {
      this.setState({ payActive: true });
    } else if (
      this.state.payActive &&
      (this.state.firstName === '' ||
        this.state.lastName === '' ||
        this.state.email === '' ||
        this.state.mobileNo.length !== 10 ||
        !this.validateEmail(this.state.email) ||
        this.state.selectedSeat === '')
    ) {
      this.setState({ payActive: false });
    }
  }

  selectSeatCb = (selectedSeat) => {
    this.setState({ selectedSeat });
  };

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  handleClassType = (classType) => {
    return classType
      .split('_')
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  handleStateChange = (e, stateName) => {
    switch (stateName) {
      case 'firstName':
      case 'middleName':
      case 'lastName':
        if (e.target.value.match(/^[a-zA-Z]+$/) || e.target.value === '') {
          this.setState({ [stateName]: e.target.value });
        }
        break;

      case 'mobileNo':
        if (/^\d{1,10}$/.test(e.target.value) || e.target.value === '') {
          this.setState({ [stateName]: e.target.value });
        }
        break;
      case 'email':
        this.setState({ [stateName]: e.target.value.trim() });
        break;
      default:
        break;
    }
  };

  renderInput(placeholder, required, stateName) {
    return (
      <div className='relative'>
        <input
          required={required}
          id={placeholder}
          name={placeholder}
          type='text'
          className='w-11/12 peer ml-4 p-2 bg-transparent border-2 border-gray-500 rounded-md text-gray-900 font-bold text-xl font-poppins placeholder-transparent focus:ring-0 focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50'
          placeholder={placeholder}
          value={this.state[stateName]}
          onChange={(e) => this.handleStateChange(e, stateName)}
        />
        <label
          htmlFor={placeholder}
          className='transition-all duration-200 ease-out 
        text-lg absolute top-[-18px] bg-offerPrimary p-px left-6 font-poppins 
        text-gray-700 font-bold peer-placeholder-shown:top-2 peer-placeholder-shown:text-xl 
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent
        peer-focus:text-lg peer-focus:top-[-18px] peer-focus:bg-offerPrimary peer-focus:p-px peer-focus:text-gray-700'>
          {placeholder}
        </label>
      </div>
    );
  }

  renderBooking({
    departureAt,
    arrivalAt,
    departureIata,
    arrivalIata,
    carrierCode,
    grandTotal,
    duration,
    classType,
    stopsString,
  }) {
    const departureObj = new Date(departureAt);
    const arrivalObj = new Date(arrivalAt);
    return (
      <div className='w-3/6 h-56 rounded-lg shadow-lg bg-offerPrimary p-4 mb-12'>
        <div className='flex w-full'>
          <p className='p-2 max-w-max font-poppins font-bold text-gray-700 text-lg bg-gray-400 rounded-md'>
            {this.handleClassType(classType)}
          </p>
        </div>
        <p className='mt-2 font-bold font-poppins text-offerSecondary text-5xl'>
          {`INR ${grandTotal}`}
        </p>
        <div className='flex mt-2 border-2 border-gray-500 rounded-lg py-2 px-6 items-center'>
          <div className='flex flex-col'>
            <p className='text-offerSecondary text-3xl font-poppins text-center font-bold'>
              {`${departureObj.getDate()}`}
            </p>
            <p className='text-offerSecondary text-lg font-poppins text-center font-bold'>
              {`${departureObj.toLocaleString('default', {
                month: 'short',
              })}`}
            </p>
          </div>
          <img
            src={`${carrierCode === 'UK' ? visLogo : aiLogo}`}
            alt='visa logo'
            className='ml-4 rounded-md'
          />
          <div className='flex flex-col ml-4'>
            <p className='text-offerSecondary text-xl font-poppins text-center font-bold'>
              {`${departureObj
                .getHours()
                .toString()
                .padStart(2, '0')}:${departureObj
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
            </p>
            <p className='text-offerSecondary text-lg font-poppins text-center font-bold'>
              {departureIata}
            </p>
          </div>
          <div className='flex flex-col flex-grow ml-4'>
            <p className='text-offerSecondary text-2xl font-poppins text-center font-bold'>
              {duration}
            </p>
            <div className='h-px bg-gray-700'></div>
            <p className='text-primrary text-lg font-poppins text-center font-bold'>
              {stopsString}
            </p>
          </div>
          <div className='flex flex-col ml-4'>
            <p className='text-offerSecondary text-xl font-poppins text-center font-bold'>
              {`${arrivalObj
                .getHours()
                .toString()
                .padStart(2, '0')}:${arrivalObj
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
            </p>
            <p className='text-offerSecondary text-lg font-poppins text-center font-bold'>
              {arrivalIata}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='flex flex-col min-h-full items-center bg-gradient-to-b from-primrary via-gradient2 to-gradient3 p-5'>
        {this.renderBooking(this.props.location.state)}
        <div className='w-3/6 rounded-lg shadow-lg bg-offerPrimary p-4 mb-12'>
          <p className='font-bold text-5xl text-left font-poppins mb-3'>
            Traveller Details
          </p>
          <p className='p-2 max-w-max font-poppins font-bold text-gray-700 text-lg bg-gray-400 rounded-md'>
            Adult (12+)
          </p>
          <div className='flex flex-col w-full mt-5'>
            <div className='flex'>
              <div className='flex border-2 border-gray-500 p-1 rounded-md items-center'>
                <Menu as='div' className='relative inline-block w-full z-10'>
                  <Menu.Button className='flex w-full items-center text-left text-gray-900 font-bold text-xl font-poppins'>
                    {this.state.title}
                    <ChevronDownIcon
                      className='h-5 w-5 ml-2 mr-1'
                      aria-hidden='true'
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto'>
                      <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => this.setState({ title: 'Mr.' })}
                              className={this.classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600',
                                'flex px-2 py-2 w-full font-bold text-xl font-poppins'
                              )}>
                              Mr.
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => this.setState({ title: 'Mrs.' })}
                              className={this.classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600',
                                'flex px-2 py-2 w-full font-bold text-xl font-poppins'
                              )}>
                              Mrs.
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => this.setState({ title: 'Miss' })}
                              className={this.classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600',
                                'flex px-2 py-2 w-full font-bold text-xl font-poppins'
                              )}>
                              Miss
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              {this.renderInput('First Name', true, 'firstName')}
              {this.renderInput('Middle Name', false, 'middleName')}
              {this.renderInput('Last Name', true, 'lastName')}
            </div>
            <p className='p-2 mt-5 max-w-max font-poppins font-bold text-gray-700 text-lg bg-gray-400 rounded-md'>
              Contact Details
            </p>
            <div className='flex mt-5 flex-start ml-[-16px]'>
              {this.renderInput('Mobile No.', true, 'mobileNo')}
              {this.renderInput('Email', true, 'email')}
            </div>
          </div>
        </div>
        <div className='w-3/6 rounded-lg shadow-lg bg-offerPrimary p-4 mb-12'>
          <p className='font-bold text-5xl text-left font-poppins mb-3'>
            Airline Seatmap
          </p>
          <div className='flex w-5/6 h-[50vh] mt-12 justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primrary scrollbar-track-tertiary'>
            <SeatMap selectSeat={this.selectSeatCb} />
          </div>
        </div>
        <div className='w-3/6 rounded-lg shadow-lg bg-offerPrimary p-4 mb-12'>
          <div className='flex w-full rounded-md p-4 justify-center'>
            <Link
              to={{
                pathname: '/bookingfinal',
                state: this.props.location.state,
              }}
              className={`rounded-md text-3xl  shadow-md font-bold font-poppins uppercase py-2 px-4 ${
                this.state.payActive
                  ? 'bg-tertiary text-gray-200 hover:bg-tertiaryDark'
                  : 'bg-tertiaryDeactive text-gray-300 pointer-events-none'
              }`}>
              Proceed to pay
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, user: state.auth.user };
};

export default connect(mapStateToProps)(BookingDetails);
