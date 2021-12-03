import React from 'react';
import visLogo from '../assets/images/visLogo.svg';
import aiLogo from '../assets/images/aiLogo.svg';

class BookingFinal extends React.Component {
  handleClassType = (classType) => {
    return classType
      .split('_')
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

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
          {`PNR : ${Math.random().toString(36).slice(6).toUpperCase()}`}
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
        <div className='text-center text-9xl text-offerPrimary font-poppins font-bold mt-24'>
          <p>Your booking is confirmed.</p>
          <p className='text-7xl mt-12'>Enjoy your flight!</p>
        </div>
      </div>
    );
  }
}

export default BookingFinal;
