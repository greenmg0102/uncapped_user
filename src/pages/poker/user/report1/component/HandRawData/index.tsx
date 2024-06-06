import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { hero8Site, hero9Site } from '../../../../../../utils/reference/playCardColor'

export default function HandRawData({ handRawData, activeNodeData, setHandRawData, setActiveUserData, setUserResultModal }: any) {

    const MySwal = withReactContent(Swal);

    const [handData, setHandData] = useState([])
    const [isBB, setIsBB] = useState(false)

    useEffect(() => {
        if (Object.keys(activeNodeData).length > 0) {
            let real = activeNodeData.rawData.split("\n");
            setHandData(real)
        }
    }, [activeNodeData])

    useEffect(() => {

        let real = activeNodeData.rawData.split("\n");
        if (isBB) {

            let buffer: any = []

            const seatRegexp = /\(([\d,]+) in chips\)/;
            const antRegexp = /ante (\d+)/;
            const smallBlindRegexp = /small blind (\d+)/;
            const bigBlindRegexp = /big blind (\d+)/;

            const raisesRegexp = /raises (\d+) to (\d+)/;
            const callRegexp = /calls (\d+)/;

            handData.forEach((element: any) => {
                if (element.match(seatRegexp)) {
                    const number = element.match(seatRegexp)[1].replace(/,/g, '');
                    const updatedString = element.replace(/\(\d+,\d+ in chips\)/, `(${(number / activeNodeData.bigBlind).toFixed(2)}bb in chips)`);
                    buffer.push(updatedString)
                }
                else if (element.match(antRegexp)) {
                    const match = element.match(antRegexp);
                    const lastNumber = match ? match[1] : null;
                    const updatedString = element.replace(antRegexp, `${(lastNumber / activeNodeData.bigBlind).toFixed(2)}bb`);
                    buffer.push(updatedString)
                }
                else if (element.match(smallBlindRegexp)) {
                    const match = element.match(smallBlindRegexp);
                    const lastNumber = match ? match[1] : null;
                    const updatedString = element.replace(smallBlindRegexp, `${(lastNumber / activeNodeData.bigBlind).toFixed(1)}bb`);
                    buffer.push(updatedString)
                }
                else if (element.match(bigBlindRegexp)) {
                    const match = element.match(bigBlindRegexp);
                    const lastNumber = match ? match[1] : null;
                    const updatedString = element.replace(bigBlindRegexp, `${(lastNumber / activeNodeData.bigBlind).toFixed(1)}bb`);
                    buffer.push(updatedString)
                }
                else if (element.match(raisesRegexp)) {
                    const match = element.match(raisesRegexp);
                    const raiseValue1 = match ? match[1] : null;
                    const raiseValue2 = match ? match[2] : null;
                    let count = 0;
                    const updatedString = element.replace(/\d+/g, (match: any) => {
                        count++;
                        if (count === 1) {
                            return `${(raiseValue1 / activeNodeData.bigBlind).toFixed(2)}bb`;
                        } else if (count === 2) {
                            return `${(raiseValue2 / activeNodeData.bigBlind).toFixed(2)}bb`;
                        }
                        return match;
                    });
                    buffer.push(updatedString)
                }
                else if (element.match(callRegexp)) {
                    const match = element.match(callRegexp);
                    const lastNumber = match ? match[1] : null;
                    const updatedString = element.replace(callRegexp, `${(lastNumber / activeNodeData.bigBlind).toFixed(2)}bb`);
                    buffer.push(updatedString)
                }
                else {
                    buffer.push(element)
                }
            });

            setHandData(buffer)

        } else {
            setHandData(real)
        }
    }, [isBB])


    const copyToClipboard = () => {
        navigator.clipboard.writeText(activeNodeData.rawData)
            .then(() => {
                MySwal.fire({
                    title: 'The Hand was copied.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: 'color-success',
                    },
                });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    const changeAsBB = (bool: any) => {

    }

    return (
        <Transition appear show={handRawData} as={Fragment}>
            <Dialog as="div" open={handRawData} onClose={() => setHandRawData(false)}>
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
                                <div className='bg-[#fbfbfb] dark:bg-[#121c2c] px-5 py-3'>
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-start justify-between pb-2">
                                        <h4 className="font-bold text-xl">Hand Data</h4>
                                    </div>
                                    <div className='flex justify-between items-center flex-wrap px-5 mt-2 border border-dashed p-2 rounded-[6px] border-gray-500'>
                                        <div className=''>
                                            <p className='mr-2 text-center text-gray-200 font-bold'>{hero8Site[activeNodeData.reportContent.heroPosition]}</p>
                                            <p className='mr-2 text-center'>Hero Position</p>
                                        </div>
                                        <div className=''>
                                            <p className='mr-2 text-center text-gray-200 font-bold'>{activeNodeData.reportContent.stackDepth}</p>
                                            <p className='mr-2 text-center'>Stack Depth</p>
                                        </div>
                                        <div className=''>
                                            <p className='mr-2 text-center text-gray-200 font-bold'>{activeNodeData.bigBlind}</p>
                                            <p className='mr-2 text-center'>Big Blind</p>
                                        </div>
                                        {/* <div className=''>
                                            <p className='mr-2 text-center text-gray-200 font-bold'>{hero8Site[activeNodeData.buttonSeat]}</p>
                                            <p className='mr-2 text-center'>Button Seat</p>
                                        </div> */}
                                    </div>
                                </div>
                                <div className='flex justify-between items-center px-5 mt-1'>
                                    <p className='text-right mb-0 text-primary'>Played Time: <span className='text-gray-500'>{activeNodeData.handTime}</span></p>
                                    <p className='text-right mb-0'>{activeNodeData.handDate}</p>
                                </div>
                                <div className='flex justify-end items-center px-5 pt-2'>

                                    <Tippy content={isBB ? "Convert to chips" : "Convert to bb"}>
                                        <p
                                            className='mb-0 font-bold cursor-pointer mr-2 hover:text-primary hover:border-primary transition-all cursor-pointer p-[1px] px-[2px] border border-gray-400 rounded-[6px]'
                                            onClick={() => setIsBB(!isBB)}
                                        >
                                            {isBB ? "Ch" : "BB"}
                                        </p>
                                    </Tippy>

                                    <Tippy content="Copy to clipboard">
                                        <svg
                                            viewBox="64 64 896 896"
                                            focusable="false"
                                            data-icon="copy"
                                            width="1.5em"
                                            height="1.5em"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className='cursor-pointer hover:text-primary transition-all cursor-pointer'
                                            onClick={() => copyToClipboard()}
                                        >
                                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                        </svg>
                                    </Tippy>
                                </div>
                                <div className="p-5 pt-2">  
                                    <div className='h-[400px] overflow-y-scroll'>
                                        {handData.map((item: any, index: any) =>
                                            <p
                                                key={index}
                                                className='transition-all font-bold border-l border-[#805DCA] text-[16px] px-2 mb-[3px] hover:text-gray-400 cursor-pointer'
                                            >
                                                {item}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-8">
                                        <button
                                            type="button"
                                            className="btn btn-success ltr:ml-4 rtl:mr-4"
                                            onClick={() => {
                                                setActiveUserData(activeNodeData._id)
                                                setUserResultModal(true)
                                                setHandRawData(false)
                                            }}
                                        >
                                            Reply
                                        </button>
                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setHandRawData(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}