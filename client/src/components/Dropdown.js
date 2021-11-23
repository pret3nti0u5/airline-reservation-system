import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { selectAirtport } from '../actions/AirportActions';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import airportCodes from '../assets/data/airports.json';

class Dropdown extends React.Component {
  componentDidMount() {
    this.props.selectAirtport(this.props.location, this.props.from);
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  renderMenuItems() {
    return airportCodes.airports.map(
      ({ IATA_code, airport_name, city_name }) => (
        <Menu.Item key={IATA_code}>
          {({ active }) => (
            <button
              onClick={() =>
                this.props.selectAirtport(IATA_code, this.props.from)
              }
              className={this.classNames(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-600',
                'flex px-4 py-2 w-full font-poppins'
              )}>
              <div className='flex w-full items-center'>
                <div className='flex flex-col'>
                  <span className='mr-auto text-lg text-gray-900 font-semibold'>
                    {`${city_name}, India`}
                  </span>
                  <span className='mr-auto text-sm text-gray-700 font-semibold'>
                    {airport_name}
                  </span>
                </div>
                <span className='ml-auto font-bold'>{IATA_code}</span>
              </div>
            </button>
          )}
        </Menu.Item>
      )
    );
  }

  render() {
    const { IATA_code, airport_name, city_name } = airportCodes.airports.find(
      (airport) => {
        if (this.props.from) {
          return airport.IATA_code === this.props.selectedFromAirport;
        }
        return airport.IATA_code === this.props.selectedToAirport;
      }
    );
    return (
      <div
        className={`flex-grow border-2 border-gray-400 border-r-0 ${
          this.props.from ? 'rounded-tl-md rounded-bl-md' : ''
        } pl-4 pt-1 pb-1`}>
        <Menu as='div' className='relative inline-block w-full z-10'>
          <Menu.Button className='flex w-full items-center text-left text-gray-600 font-bold text-xl uppercase font-poppins'>
            {this.props.title}
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
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-56 overflow-auto'>
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
          {city_name}
        </p>
        <p className='text-left text-gray-500 font-normal text-lg font-poppins'>
          {`${IATA_code}, ${airport_name}`}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedFromAirport: state.airports.selectedFromAirport,
  selectedToAirport: state.airports.selectedToAirport,
});

export default connect(mapStateToProps, { selectAirtport })(Dropdown);
