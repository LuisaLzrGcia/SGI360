import {
    Table,
    Badge,
    Button,
} from "@tremor/react";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
function ModalView({ closeModal, isOpen, componentReact, title, sizeModal = "" }) {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={`${sizeModal == "" ? "w-1/3" : sizeModal
                                        } max-w-xl transform overflow-hidden ring-tremor bg-white p-6 text-left align-middle shadow-tremor transition-all rounded-xl`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="w-full flex justify-center items-center uppercase text-lg">
                                            {title}
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <Button
                                                className="p-0 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                                                onClick={closeModal}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-md">
                                        {componentReact}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalView