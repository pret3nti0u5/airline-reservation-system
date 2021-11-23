import React from 'react';
import { connect } from 'react-redux';
import { selectAirtport } from '../actions/AirportActions';
import destinations from '../assets/data/destinations';

class Destinations extends React.Component {
  handleClick = (iata) => {
    this.props.selectAirtport(iata, false);
    this.props.refProp.current.scrollIntoView({ behavior: 'smooth' });
  };

  renderDestinations() {
    return destinations.map(({ name, src, iata }) => (
      <button
        key={iata}
        className='group h-96 w-60 rounded-md relative overflow-hidden mr-5 mb-5'
        onClick={() => this.handleClick(iata)}>
        <img
          className='min-h-full min-w-full object-cover group-hover:scale-125 transform transition-all duration-300 ease-out'
          src={src}
          alt={name}
        />
        <p className='absolute bottom-3 left-3 font-bold font-poppins text-xl text-white group-hover:text-3xl transition-all duration-300 ease-out'>
          {name}
        </p>
        <div className='absolute top-0 w-full h-full group-hover:bg-black group-hover:bg-opacity-20'></div>
      </button>
    ));
  }

  render() {
    return (
      <div className='p-5 overflow-x-hidden bg-secondary'>
        <p className='text-8xl text-tertiary font-poppins font-bold'>
          Explore Popular Destinations
        </p>
        <div className='flex mt-24 w-full flex-wrap justify-center'>
          {this.renderDestinations()}
        </div>
      </div>
    );
  }
}

export default connect(null, { selectAirtport })(Destinations);
