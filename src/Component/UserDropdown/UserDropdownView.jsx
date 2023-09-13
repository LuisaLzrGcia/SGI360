import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import UserIcon from '../../assets/user-icon.png'

function UserDropdownView({handleLogOut}) {
    return (
        <>
            <Menu as="div" className="">
                <div>
                    <Menu.Button className="hover:bg-gray-100 w-full h-full flex justify-center items-center rounded-full border-transparent hover:border-slate-700 border-2 p-2 hover:scale-110 ease-in duration-300">
                        <img src={UserIcon} alt="" className='w-6 h-6' />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                <button
                                onClick={handleLogOut}
                                    type="submit"
                                    className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 flex items-center px-4 py-2 text-sm w-36"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    <span className='pl-1'>
                                        Cerar sesión
                                    </span>
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default UserDropdownView