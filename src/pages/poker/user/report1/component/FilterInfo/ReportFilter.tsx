import { useEffect, useState } from 'react'
import EachButton from '../eachButton'
import clsx from 'clsx'
import StreetItem from '../../component/secondPanel'
import { pokerStreetOptionUser } from '../../../../../../utils/reference/playCardColor'

export default function ReportFilter({ valueStatus, defaultReportSetting, userTab, reportingResult, setAdvancedOptionModal, userInfoResult, interruptValueStatus, setUserTab }: any) {

    const [critical, setCritical] = useState([false, false, false, false])

    useEffect(() => {

        let critical = [false, false, false, false]

        Object.keys(reportingResult).forEach((key: any) => {
            reportingResult[key].played.forEach((item: any, index: any) => {
                critical[index] = critical[index] ? critical[index] : !critical[index] && item !== 0
            })
        })

        setCritical(critical)

    }, [reportingResult])

    return (
        <div className=''>
            <p className='text-center font-bold text-[16px] text-gray-300 rounded-[4px] mb-3'>
                Report Filters
            </p>
            <div className='pl-1 mb-1'>
                <div className="flex justify-start items-center mb-1">
                    <div className='w-[70px] flex justify-between items-center pr-1'>
                        <p className="text-left">Action </p>
                        <p className="text-left">:</p>
                    </div>
                    {valueStatus.action !== "" ?
                        <p className='rounded-[4px] px-1 font-bold cursor-pointer bg-gray-800 hover:bg-gray-600 transition-all'>{valueStatus.action}</p>
                        :
                        <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    }
                </div>
                <div className="flex justify-start items-start mb-1">
                    <div className='w-[70px] flex justify-between items-center pr-1'>
                        <p className="text-left">Hero </p>
                        <p className="text-left">:</p>
                    </div>
                    <div className='w-[calc(100%-70px)] flex justify-start items-center flex-wrap'>
                        {valueStatus.heroPosition.length !== 0 ?
                            valueStatus.heroPosition.map((item: any, index: any) =>
                                <span
                                    key={index}
                                    className="relative mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer hover:bg-gray-600 transition-all bg-gray-800 mb-[2px]"
                                    onClick={() => setAdvancedOptionModal(true ? true : false)}
                                >
                                    {item === 398750 ? 40 : item}
                                    {/* <div
                                    className={clsx(
                                        'transition-all', 
                                        true ?
                                        'absolute w-[200px] left-0 bg-gray-900 border border-gray-700 rounded-[4px] p-4 z-[99]'
                                        :
                                        'hidden'
                                    )}
                                    >
                                    <p><span className='text-red-500 mr-2'>!</span>You need to purchase the premium function for using capsulation function </p>
                                </div> */}
                                </span>
                            )
                            :
                            <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                        }
                    </div>

                    {/* {valueStatus.heroPositionIndex !== -1 ?
                        defaultReportSetting["heroPosition"][valueStatus.heroPositionIndex].stringList.map((item: any, index: any) =>
                            <EachButton
                                key={index}
                                item={item}
                                type={"heroPosition"}
                                standard={valueStatus.heroPosition}
                                interruptValueStatus={(type: string, value: number) => interruptValueStatus(type, value)}
                            />
                        )
                        :
                        <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    } */}
                </div>
                <div className="flex justify-start items-center mb-1">
                    <div className='w-[70px] flex justify-between items-center pr-1'>
                        <p className="text-left">Stack </p>
                        <p className="text-left">:</p>
                    </div>

                    <div className='w-[calc(100%-70px)] flex justify-start items-center flex-wrap'>
                        {valueStatus.stackDepth.length !== 0 ?
                            valueStatus.stackDepth.map((item: any, index: any) =>
                                <span
                                    key={index}
                                    className="mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer hover:bg-gray-600 transition-all bg-gray-800 mb-[2px]"
                                    onClick={() => setAdvancedOptionModal(true ? true : false)}
                                >
                                    {item === 398750 ? 40 : item}
                                </span>
                            )
                            :
                            <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                        }
                    </div>
                    {/* {
                        defaultReportSetting["stackDepth"].filter((each: any) => each.valueList.some((a: any) => valueStatus.stackDepth.includes(a)))[0] ?
                            defaultReportSetting["stackDepth"].filter((each: any) => each.valueList.some((a: any) => valueStatus.stackDepth.includes(a)))[0].valueList.map((item: any, order: any) =>
                                <EachButton
                                    key={order}
                                    item={item}
                                    type={"stackDepth"}
                                    standard={valueStatus.stackDepth}
                                    interruptValueStatus={(type: string, value: number) => interruptValueStatus(type, value)}
                                />
                            )
                            :
                            <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    } */}
                </div>
                <div className="flex justify-start items-center mb-1">
                    <div className='w-[70px] flex justify-between items-center pr-1'>
                        <p className="text-left">Villain </p>
                        <p className="text-left">:</p>
                    </div>
                    <div className='w-[calc(100%-70px)] flex justify-start items-center flex-wrap'>
                        {valueStatus.VillianPosition.length !== 0 ?
                            valueStatus.VillianPosition.map((item: any, index: any) =>
                                <span
                                    key={index}
                                    className="mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer hover:bg-gray-600 transition-all bg-gray-800 mb-[2px]"
                                    onClick={() => setAdvancedOptionModal(true ? true : false)}
                                >
                                    {item === 398750 ? 40 : item}
                                </span>
                            )
                            :
                            <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                        }
                    </div>
                    {/* {
                        valueStatus.villianPositionIndex !== -1 ?
                            defaultReportSetting["VillianPosition"][valueStatus.villianPositionIndex].stringList.map((item: any, index: any) =>
                                <EachButton
                                    key={index}
                                    item={item}
                                    type={"VillianPosition"}
                                    standard={valueStatus.VillianPosition}
                                    interruptValueStatus={(type: string, value: number) => interruptValueStatus(type, value)}
                                />
                            )
                            :
                            <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    } */}
                </div>
                <div className='flex justify-center items-center flex-wrap'>
                    {
                        pokerStreetOptionUser.map((item: any, index: any) =>
                            <StreetItem
                                key={index}
                                item={item}
                                userTab={userTab}
                                critical={critical[index]}
                                action={valueStatus.action}
                                userResult={userInfoResult}
                                setUserTab={(order: any) => setUserTab(order)}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}