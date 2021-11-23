import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import visLogo from '../assets/images/visLogo.svg';

class BookingDetails extends React.Component {
  state = { title: 'Mr.' };

  classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  renderInput(placeholder) {
    return (
      <div className='relative'>
        <input
          id={placeholder}
          name={placeholder}
          type='text'
          className='w-11/12 peer ml-4 p-2 bg-transparent border-2 border-gray-500 rounded-md text-gray-900 font-bold text-xl font-poppins placeholder-transparent'
          placeholder={placeholder}
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

  renderBooking() {
    return (
      <div className='w-3/6 h-56 rounded-lg shadow-lg bg-offerPrimary p-4 mb-12'>
        <div className='flex w-full'>
          <p className='p-2 max-w-max font-poppins font-bold text-gray-700 text-lg bg-gray-400 rounded-md'>
            Economy
          </p>
        </div>
        <p className='mt-2 font-bold font-poppins text-offerSecondary text-5xl'>
          INR 10,000
        </p>
        <div className='flex mt-2 border-2 border-gray-500 rounded-lg py-2 px-6 items-center'>
          <div className='flex flex-col'>
            <p className='text-offerSecondary text-3xl font-poppins text-center font-bold'>
              20
            </p>
            <p className='text-offerSecondary text-lg font-poppins text-center font-bold'>
              Nov
            </p>
          </div>
          <img src={visLogo} alt='visa logo' className='ml-4 rounded-md' />
          <div className='flex flex-col ml-4'>
            <p className='text-offerSecondary text-xl font-poppins text-center font-bold'>
              18:00
            </p>
            <p className='text-offerSecondary text-lg font-poppins text-center font-bold'>
              GOI
            </p>
          </div>
          <div className='flex flex-col flex-grow ml-4'>
            <p className='text-offerSecondary text-2xl font-poppins text-center font-bold'>
              2H40M
            </p>
            <div className='h-px bg-gray-700'></div>
            <p className='text-primrary text-lg font-poppins text-center font-bold'>
              based stops
            </p>
          </div>
          <div className='flex flex-col ml-4'>
            <p className='text-offerSecondary text-xl font-poppins text-center font-bold'>
              18:00
            </p>
            <p className='text-offerSecondary text-lg font-poppins text-center font-bold'>
              IXC
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='flex flex-col min-h-full items-center bg-gradient-to-b from-primrary via-gradient2 to-gradient3 p-5'>
        {this.renderBooking()}
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
              {this.renderInput('First Name')}
              {this.renderInput('Middle Name')}
              {this.renderInput('Last Name')}
            </div>
            <p className='p-2 mt-5 max-w-max font-poppins font-bold text-gray-700 text-lg bg-gray-400 rounded-md'>
              Contact Details
            </p>
            <div className='flex mt-5 flex-start ml-[-16px]'>
              {this.renderInput('Mobile No.')}
              {this.renderInput('Email')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookingDetails;
