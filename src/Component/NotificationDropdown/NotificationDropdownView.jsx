import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import NotificationIcon from '../../assets/notification-icon.png'

function NotificationDropdownView() {
    const [notification, setNotification] = useState(0)
    return (
        <>
            <Menu as="div" className="">
                <div>
                    <Menu.Button className="hover:bg-gray-100 w-full h-full flex justify-center items-center rounded-full border-transparent hover:border-slate-700 border-2 p-2 hover:scale-110 ease-in duration-300">
                        <img src={NotificationIcon} className='w-6 h-6' />
                        {notification > 0 && (
                            <div className="absolute -mt-5 -mr-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                <span className="text-xs">{notification}</span>
                            </div>
                        )}
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
                    <Menu.Items className="absolute right-20 z-10 mt-2 w-36 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                <button
                                    type="submit"
                                    className="hover:bg-gray-100 hover:text-gray-900 text-gray-700 flex items-center px-4 py-2 text-sm w-36"
                                >
                                    <span className='pl-1'>
                                        Notificacioones
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

export default NotificationDropdownView