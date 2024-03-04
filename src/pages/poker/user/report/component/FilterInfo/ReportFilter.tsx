import EachButton from '../eachButton'
import clsx from 'clsx'
import StreetItem from '../../component/secondPanel'
import { pokerStreetOptionUser } from '../../../../../../utils/reference/playCardColor'

export default function ReportFilter({ valueStatus, defaultReportSetting, userTab, setAdvancedOptionModal, userInfoResult, interruptValueStatus, setUserTab }: any) {

    return (
        <div className=''>
            <p className='text-center font-bold text-[16px] text-gray-300 rounded-[4px] mb-3'>
                Report Filters
            </p>
            <div className='pl-1 mb-1'>
                <div className="flex justify-start items-center mb-1">
                    <p className="w-[60px] text-left mr-3">Action </p>
                    <p className='mr-1'>:</p>
                    {valueStatus.action !== "" ?
                        <p className='rounded-[4px] px-1 font-bold cursor-pointer bg-gray-800 hover:bg-gray-600 transition-all'>{valueStatus.action}</p>
                        :
                        <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    }
                </div>
                <div className="flex justify-start items-center mb-1">
                    <p className="w-[60px] text-left mr-3">Hero </p>
                    <p className='mr-1'>:</p>

                    {valueStatus.heroPosition.length !== 0 ?
                        valueStatus.heroPosition.map((item: any, index: any) =>
                            <span
                                key={index}
                                className="relative mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer hover:bg-gray-600 transition-all bg-gray-800"
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
                    <p className="w-[60px] text-left mr-3">Stack </p>
                    <p className='mr-1'>:</p>
                    {valueStatus.stackDepth.length !== 0 ?
                        valueStatus.stackDepth.map((item: any, index: any) =>
                            <span
                                key={index}
                                className="mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer hover:bg-gray-600 transition-all bg-gray-800"
                                onClick={() => setAdvancedOptionModal(true ? true : false)}
                            >
                                {item === 398750 ? 40 : item}
                            </span>
                        )
                        :
                        <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    }
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
                    <p className="w-[60px] text-left mr-3">Villain </p>
                    <p className='mr-1'>:</p>
                    {valueStatus.VillianPosition.length !== 0 ?
                        valueStatus.VillianPosition.map((item: any, index: any) =>
                            <span
                                key={index}
                                className="mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer hover:bg-gray-600 transition-all bg-gray-800"
                                onClick={() => setAdvancedOptionModal(true ? true : false)}
                            >
                                {item === 398750 ? 40 : item}
                            </span>
                        )
                        :
                        <p className='mr-[2px] rounded-[4px] px-1 font-bold cursor-pointer border border-gray-800 transition-all'>Empty</p>
                    }
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