import React from 'react';

class Spinner extends React.Component {
  render() {
    return (
      <div className='flex justify-center items-center'>
        <div
          className='
      animate-spin
      rounded-full
      h-64
      w-64
      border-t-4 border-b-4 border-tertiary
    '></div>
      </div>
    );
  }
}

export default Spinner;
