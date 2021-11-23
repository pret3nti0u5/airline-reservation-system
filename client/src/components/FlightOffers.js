import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import visLogo from '../assets/images/visLogo.svg';
import aiLogo from '../assets/images/aiLogo.svg';
import Spinner from './Spinner';

class FlightOffers extends React.Component {
  handleClassType = (classType) => {
    return classType
      .split('_')
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

  renderOfferDOM(
    {
      departureAt,
      arrivalAt,
      departureIata,
      arrivalIata,
      carrierCode,
      grandTotal,
      duration,
      classType,
    },
    stopsString
  ) {
    const departureObj = new Date(departureAt);
    const arrivalObj = new Date(arrivalAt);
    return (
      <div
        className='w-3/6 h-56 rounded-lg shadow-lg bg-offerPrimary p-4 mb-12'
        key={uuidv4()}>
        <div className='flex w-full'>
          <p className='p-2 max-w-max font-poppins font-bold text-gray-700 text-lg bg-gray-400 rounded-md'>
            {this.handleClassType(classType)}
          </p>
          <button className='ml-auto rounded-md bg-tertiary text-gray-200 shadow-md font-bold font-poppins uppercase py-2 px-4 hover:bg-tertiaryDark'>
            Book
          </button>
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

  renderOffers() {
    let domArr = [];
    let dataArr = [];
    if (!this.props.isLoading && this.props.offers.length > 0) {
      this.props.offers.forEach((offer) => {
        if (offer.itineraries[0].segments.length === 1) {
          const data = {
            departureIata: offer.itineraries[0].segments[0].departure.iataCode,
            departureAt: offer.itineraries[0].segments[0].departure.at,
            arrivalIata: offer.itineraries[0].segments[0].arrival.iataCode,
            arrivalAt: offer.itineraries[0].segments[0].arrival.at,
            duration: offer.itineraries[0].duration.slice(2),
            stops: [],
            carrierCode: offer.itineraries[0].segments[0].carrierCode,
            craftNo: offer.itineraries[0].segments[0].number,
            grandTotal: offer.price.grandTotal,
            classType: offer.travelerPricings[0].fareDetailsBySegment[0].cabin,
          };
          dataArr.push(data);
        } else {
          const len = offer.itineraries[0].segments.length;
          const stops = [];
          for (let i = 0; i < len - 1; i++) {
            stops.push(offer.itineraries[0].segments[i].arrival.iataCode);
          }
          const data = {
            departureIata: offer.itineraries[0].segments[0].departure.iataCode,
            departureAt: offer.itineraries[0].segments[0].departure.at,
            arrivalIata:
              offer.itineraries[0].segments[len - 1].arrival.iataCode,
            arrivalAt: offer.itineraries[0].segments[len - 1].arrival.at,
            duration: offer.itineraries[0].duration.slice(2),
            stops,
            carrierCode: offer.itineraries[0].segments[0].carrierCode,
            craftNo: offer.itineraries[0].segments[0].number,
            grandTotal: offer.price.grandTotal,
            classType: offer.travelerPricings[0].fareDetailsBySegment[0].cabin,
          };
          dataArr.push(data);
        }
      });

      dataArr.forEach((offer) => {
        if (offer.stops.length === 0) {
          domArr.push(this.renderOfferDOM(offer, 'Direct'));
        } else {
          const stopsLen = offer.stops.length;
          let stopsString = `${
            stopsLen === 1 ? '1 stop via' : `${stopsLen} stops via`
          }`;
          for (let i = 0; i < stopsLen; i++) {
            if (i === 0) {
              stopsString += ` ${offer.stops[i]}`;
            } else {
              stopsString += ` and ${offer.stops[i]}`;
            }
          }
          domArr.push(this.renderOfferDOM(offer, stopsString));
        }
      });

      return domArr;
    }
    if (!this.props.isLoading && this.props.offers.length === 0) {
      return (
        <div className='text-center text-9xl text-offerPrimary font-poppins font-bold mt-24'>
          <p>Sorry, No Flights Found!</p>
          <p className='text-7xl mt-12'>
            You can try again with a different search.
          </p>
        </div>
      );
    }
    if (this.props.isLoading) {
      return <Spinner />;
    }
  }

  render() {
    return (
      <div className='flex flex-col min-h-full items-center bg-gradient-to-b from-primrary via-gradient2 to-gradient3 p-5'>
        {this.renderOffers()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  offers: state.offers.OFFERS,
  isLoading: state.offers.isLoading,
});

export default connect(mapStateToProps)(FlightOffers);
