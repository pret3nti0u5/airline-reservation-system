import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Calendar } from 'react-date-range';
import { ChevronDownIcon } from '@heroicons/react/outline';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOffers } from '../actions/offersActions';
import Dropdown from './Dropdown';

class FlightSelect extends React.Component {
  state = { date: new Date(), hidden: true, class: 'Economy', nonStop: false };

  classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  handleOffersSearch = () => {
    this.props.getOffers(
      this.props.selectedFromAirport,
      this.props.selectedToAirport,
      this.state.date.toLocaleDateString('en-CA'),
      this.state.class.toUpperCase().split(' ').join('_'),
      this.state.nonStop
    );
  };

  handleDateSelect = (item) => {
    this.setState({ date: item, hidden: true });
  };

  renderMenuItems() {
    const classes = ['Economy', 'Premium Economy', 'Business'];
    return classes.map((classType) => (
      <Menu.Item key={classType}>
        {({ active }) => (
          <button
            onClick={() => this.setState({ class: classType })}
            className={this.classNames(
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-600',
              'flex px-4 py-2 w-full font-bold text-xl font-poppins'
            )}>
            {classType}
          </button>
        )}
      </Menu.Item>
    ));
  }

  render() {
    return (
      <div className='flex flex-col shadow-2xl bg-gray-50 rounded-md p-5 m-4 w-4/5'>
        <p className='font-bold text-5xl text-left font-poppins mb-3'>
          Select Flight Details
        </p>
        <div className='flex mt-2 pt-5 pb-5'>
          <Dropdown title={'From'} from={true} location={'GOI'} />
          <Dropdown title={'To'} from={false} location={'IXC'} />
          <div className='flex-grow'>
            <div className='border-2 border-gray-400 border-r-0 pl-4 pt-1 pb-1 relative'>
              <button
                className='text-xl text-gray-600 font-bold uppercase flex items-center w-full font-poppins'
                onClick={() => this.setState({ hidden: false })}>
                Departure
                <ChevronDownIcon
                  className='h-5 w-5 ml-auto mr-1'
                  aria-hidden='true'
                />
              </button>
              <div
                className={`absolute origin-center top-3 z-10 font-poppins ${
                  this.state.hidden ? 'hidden' : ''
                }`}>
                <Calendar
                  date={this.state.date}
                  minDate={new Date()}
                  color='#6366f1'
                  onChange={(item) => this.handleDateSelect(item)}
                />
              </div>
              <p className='text-left text-gray-900 font-bold text-5xl font-poppins'>
                {this.state.date.getDate() +
                  ' ' +
                  this.state.date.toLocaleString('default', { month: 'short' })}
              </p>
              <p className='text-left text-gray-500 font-normal text-lg font-poppins'>
                {this.state.date.toLocaleString('default', { weekday: 'long' })}
              </p>
            </div>
          </div>
          <div className='flex-grow'>
            <div className='border-2 border-gray-400 rounded-tr-md rounded-br-md pl-4 pt-1 pb-1'>
              <Menu as='div' className='relative inline-block w-full z-10'>
                <Menu.Button className='flex w-full items-center text-left text-gray-600 font-bold text-xl uppercase font-poppins'>
                  Class
                  <ChevronDownIcon
                    className='h-5 w-5 ml-auto mr-1'
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
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-48 overflow-auto'>
                    <div className='py-1'>
                      <Menu.Item disabled>
                        <span className='text-md flex px-4 py-2 w-full text-gray-500 justify-center font-bold font-poppins'>
                          Type To Search
                        </span>
                      </Menu.Item>
                      {this.renderMenuItems()}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <p className='text-left text-gray-900 font-bold text-5xl font-poppins'>
                {this.state.class}
              </p>
              <p className='text-left text-gray-500 font-normal text-lg font-poppins'>
                Only One Seat Selectable
              </p>
            </div>
          </div>
        </div>
        <div>
          <label className='inline-flex items-center'>
            <input
              type='checkbox'
              className='form-checkbox h-5 w-5 rounded-full text-tertiary
              focus:ring-0
              focus:ring-offset-0
              focus:ring-indigo-200
              focus:ring-opacity-50'
              checked={this.state.nonStop}
              onChange={(e) => this.setState({ nonStop: e.target.checked })}
            />
            <span className='ml-2 font-bold font-poppins text-xl text-gray-700'>
              Nonstop flights only
            </span>
          </label>
        </div>
        <div className='flex justify-center top-12 relative'>
          <Link
            to='/flights'
            onClick={() => this.handleOffersSearch()}
            className='font-poppins border-2 border-white bg-tertiary hover:bg-tertiaryDark text-white font-semibold py-2 px-20 rounded-full text-4xl shadow-xl'>
            Search
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedFromAirport: state.airports.selectedFromAirport,
  selectedToAirport: state.airports.selectedToAirport,
  offers: state.offers.OFFERS,
  isLoading: state.offers.isLoading,
});

export default connect(mapStateToProps, { getOffers })(FlightSelect);
