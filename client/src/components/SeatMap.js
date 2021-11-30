import React from 'react';
import { UserIcon } from '@heroicons/react/solid';

class SeatMap extends React.Component {
  state = { reservedSeats: [], selectedSeat: '' };

  componentDidMount() {
    this.bookRandomSeats();
  }

  bookRandomSeats() {
    const reservedSeats = [];
    for (let i = 0; i < Math.floor(Math.random() * (168 - 60)) + 60; i++) {
      const row = Math.floor(Math.random() * 22) + 1;
      const col = Math.floor(Math.random() * 8) + 1;
      reservedSeats.push(`${row}${col}`);
    }
    this.setState({ reservedSeats });
  }

  handleSeatSelect(i, j) {
    if (!this.state.reservedSeats.includes(`${i}${j}`)) {
      this.setState({ selectedSeat: `${i}${j}` });
      this.props.selectSeat(`${i}${j}`);
    }
  }

  renderSeats(cols, rows) {
    let seats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (j === 4) {
          seats.push(<div key={`${i}${j}`}></div>);
          continue;
        }

        if (i === 0) {
          const colArr = ['', 'A', 'B', 'C', '', 'D', 'E', 'F'];
          seats.push(
            <div
              className='text-center text-gray-900 font-poppins font-bold text-lg'
              key={`${i}${j}`}>
              {colArr[j]}
            </div>
          );
          continue;
        }

        if (j === 0) {
          seats.push(
            <div
              className='text-center text-gray-900 font-poppins font-bold text-lg'
              key={`${i}${j}`}>
              {String(i).padStart(2, '0')}
            </div>
          );
          continue;
        }
        seats.push(
          <button
            className={`rounded-md p-3 ${
              this.state.reservedSeats.includes(`${i}${j}`)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } ${
              this.state.selectedSeat === `${i}${j}`
                ? 'bg-green-400'
                : 'bg-pink-500'
            }`}
            key={`${i}${j}`}
            onClick={() => this.handleSeatSelect(i, j)}>
            <UserIcon className='h-5 w-5 text-gray-200' />
          </button>
        );
      }
    }
    return seats;
  }

  render() {
    return (
      <div className='inline-grid grid-cols-8 gap-3 justify-items-center'>
        {this.renderSeats(8, 22)}
      </div>
    );
  }
}
export default SeatMap;
