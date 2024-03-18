import { useState, useEffect, Fragment } from 'react';
import Dropdown from '../../../../../components/Dropdown';
import { useDispatch } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { accessTokenDecode } from '../../../../../utils/middlewareFunction/accessTokenDecode'
import clsx from 'clsx'
import { bundleDeleteHand } from '../../../../../utils/functions/HandAPI'
import 'flatpickr/dist/flatpickr.css';
import { toggleLoadingStatus } from "../../../../../store/utilConfigSlice"

export default function AdvancedFilter({ pageSize, page, dragModel, setDragModel, pokerType, tableSize, heroPosition, setInitialRecords, setTotalCount }: any) {

    const dispatch = useDispatch();

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().split('T')[0];

    const [filter, setFilter] = useState({
        pokerType: "N/A",
        tableSize: "N/A",
        heroPosition: "N/A",
        range: `2023-11-30 to ${nextDay}`,
        newRange: `2023-11-30 to ${nextDay}`
    })

    const [modal2, setModal2] = useState(false);

    const bufferRange = (range: any) => {
        const startDate = new Date(Date.parse(range[0]));
        const endDate = new Date(Date.parse(range[1]));
        const formattedRange = `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`;
        setFilter({ ...filter, range: formattedRange });
    }

    const bundleDelete = async () => {

        setModal2(false)

        const accessToken = localStorage.getItem('accessToken');
        const data = {
            pageNumber: page,
            pageSize: pageSize,
            ...filter,
            userId: accessTokenDecode(accessToken)
        }
        dispatch(toggleLoadingStatus())
        let result: any = await bundleDeleteHand(data)
        dispatch(toggleLoadingStatus())
        setInitialRecords(() => result.hands)
        setTotalCount(result.totalCount)
    }



    return (
        <div
            className={
                clsx(
                    "relative w-full transition-all",
                    dragModel ? "border border-dashed border-primary rounded-[12px] rounded-br-[4px] rounded-bl-[4px] p-2 pt-4" : " overflow-hidden h-[0px]"
                )
            }
        >
            <div className='absolute top-[12px] right-[12px]'>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="fullscreen-exit" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" className='hover:text-gray-200 text-primary cursor-pointer' onClick={() => setDragModel(false)}>
                    <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
                </svg>
            </div>
            <p className='text-center text-[20px] font-bold'>Bundle hands Deleting Option</p>

            <div className='flex justify-between mt-2'>
                <div className='flex justify-start items-center'>

                    <div className='flex justify-start items-center my-[4px] mr-4'>
                        <p className='mb-0 mr-[8px] text-[14px] w-[75px]'>Poker Type</p>
                        <div className="inline-flex">
                            <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none btn-sm">{filter.pokerType}</button>
                            <div className="dropdown">
                                <Dropdown
                                    placement='bottom-end'
                                    btnClassName="btn  btn-sm btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                                    button={<span className="sr-only"></span>}
                                >
                                    <ul className="!min-w-[170px]">
                                        {pokerType.map((item: any, index: any) =>
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() => setFilter({ ...filter, pokerType: item.value })}
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center my-[4px] mr-4'>
                        <p className='mb-0 mr-[8px] text-[14px] w-[65px]'>Table Size</p>
                        <div className="inline-flex">
                            <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none btn-sm">{filter.tableSize}</button>
                            <div className="dropdown">
                                <Dropdown
                                    placement='bottom-end'
                                    btnClassName="btn  btn-sm btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                                    button={<span className="sr-only"></span>}
                                >
                                    <ul className="!min-w-[170px]">
                                        {tableSize.map((item: any, index: any) =>
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() => setFilter({ ...filter, tableSize: item.value })}
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center my-[4px] mr-4'>
                        <p className='mb-0 mr-[8px] text-[14px] w-[85px]'>Hero Position</p>
                        <div className="inline-flex">
                            <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none btn-sm">{filter.heroPosition}</button>
                            <div className="dropdown">
                                <Dropdown
                                    placement='bottom-end'
                                    btnClassName="btn  btn-sm btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                                    button={<span className="sr-only"></span>}
                                >
                                    <ul className="!min-w-[170px]">
                                        {heroPosition.map((item: any, index: any) =>
                                            <li key={index}>
                                                <button
                                                    type="button"
                                                    onClick={() => setFilter({ ...filter, heroPosition: item.value })}
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center my-[4px] mr-4'>
                        <p className='mb-0 mr-[4x] text-[14px] w-[40px]'>Date</p>
                        <Flatpickr
                            options={{
                                mode: 'range',
                                dateFormat: 'Y-m-d',
                                position: 'auto left',
                            }}
                            value={filter.range}
                            className="form-input !border-primary !w-[190px] !py-[5px] !pb-[2px] !px-[4px]"
                            onChange={(range: any) => bufferRange(range)}
                        />
                    </div>
                </div>
                <div className='flex'>
                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm ml-1"
                        onClick={() => setDragModel(false)}
                    >
                        S e a r c h
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger ml-4 btn-sm"
                        onClick={() => setModal2(true)}
                    >
                        Purge Hands
                    </button>

                    <Transition appear show={modal2} as={Fragment}>
                        <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen px-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                <h5 className="font-bold text-lg">Do you wanna really purge hands?  </h5>
                                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <p>
                                                    Purge function removes selected hands from your database, do you wish to continue?
                                                </p>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => bundleDelete()}>
                                                        Purge hands
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                </div>
            </div>
        </div>
    )
}
