import clsx from 'clsx'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function VillianPokerTable({ villianPokerTable, actionLit, SqueezeStackDepth }: any) {

    const extractActionList = (position: any) => actionLit.filter((item: any) => item.position === position)

    return (
        <div className="flex justify-center items-center h-[195px] w-full max-w-[500px]">
            <div className="relative w-[calc(100%-200px)] flex justify-center items-center flex-col border border-[2px] border-gray-600 rounded-full h-[130px]">
                {/* <p className="fond-bold text-[20px] mb-2">Uncapped</p> */}

                <div className='flex justify-between md:justify-start items-start flex-wrap'>
                    {actionLit.map((item: any, index: any) =>
                        <div key={index} className="mr-[4px] mb-[2px]">
                            {/* <p className='w-[40px] text-[11px] font-bold text-center border border-dashed border-gray-500 border-t-[0px] border-r-[0px] border-l-[0px]'>{item.position}</p> */}
                            <div className='flex justify-center'>
                                <p
                                    className={
                                        clsx(
                                            'text-[12px] mb-0 text-center font-bold mt-1 inline px-2 rounded-full',
                                            item.action === "F" ? "bg-gray-200 text-gray-800" : item.action === "C" ? "bg-green-500 text-gray-200" : item.action === "H" ? "bg-blue-500 text-gray-200" : "bg-red-500 text-gray-200"
                                        )
                                    }
                                >
                                    {item.action}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <p className={clsx((SqueezeStackDepth === 0 || SqueezeStackDepth === undefined) ? "hidden" : "fond-bold text-[14px] text-gray-200")}>{SqueezeStackDepth} bb</p>

                {villianPokerTable.map((item: any, index: any) =>
                    <div
                        key={index}
                        className={
                            clsx(
                                "absolute w-[40px] h-[40px] rounded-[40px] bg-gray-500 z-[2] flex flex-justify-center items-center flex-col top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-[1px] border-gray-800 cursor-pointer hover:border-gray-200 hover:bg-gray-900 hover:text-gray-100 transition-all",
                                actionLit.filter((actionItem: any) => actionItem.action === "H").length > 0 &&
                                    item.title === actionLit.filter((actionItem: any) => actionItem.action === "H")[0].position ? "border-gray-100" : "border-gray-800"
                            )
                        }
                        style={{
                            top: `${item.gps.top}%`,
                            ...(item.gps.left !== 0 && { left: `${item.gps.left}px` }),
                            ...(item.gps.right !== 0 && { right: `${item.gps.right}px` }),
                            // ...(item.gps.left !== 0 && { left: `calc(${item.gps.left}% - 10px)` }),
                            // ...(item.gps.right !== 0 && { right: `calc(${item.gps.right}% - 10px)` }),
                        }}
                    >
                        <div className='w-full h-[15px] pt-[3px]'>
                            <p className="text-center text-gray-300 font-bold text-[11px]">{item.title}</p>
                        </div>

                        {extractActionList(item.title).length === 1 ?
                            <div className='w-full h-[20px] flex justify-center items-center'>
                                <div
                                    className={
                                        clsx(
                                            'w-full h-[20px] border border-gray-600 border-l-[0px] border-t-[0px] border-b-[0px] border-r-[0px] rounded-bl-full text-center pt-[0px] font-bold text-gray-900 text-[12px]',
                                            extractActionList(item.title) &&
                                                extractActionList(item.title)[0] &&
                                                extractActionList(item.title)[0].action === "F" ? "text-gray-300" : extractActionList(item.title) &&
                                                    extractActionList(item.title)[0] &&
                                                    extractActionList(item.title)[0].action === "C" ? "text-green-500" : extractActionList(item.title) &&
                                                        extractActionList(item.title)[0] &&
                                                        extractActionList(item.title)[0].action === "H" ? "text-blue-500" : "text-red-600"
                                        )
                                    }
                                >
                                    {
                                        extractActionList(item.title) &&
                                        extractActionList(item.title)[0] &&
                                        extractActionList(item.title)[0].action
                                    }
                                </div>
                            </div>
                            :
                            <div className='w-full h-[20px] flex justify-between items-center'>
                                <div
                                    className={
                                        clsx(
                                            'w-[20px] h-[20px] border border-gray-600 border-l-[0px] border-t-[0px] border-r-[0px] border-b-[0px] rounded-bl-full text-right pr-[6px] pt-[0px] font-bold text-gray-400 text-[10px]',
                                            extractActionList(item.title) &&
                                                extractActionList(item.title)[0] &&
                                                extractActionList(item.title)[0].action === "F" ? "text-gray-200" : extractActionList(item.title) &&
                                                    extractActionList(item.title)[0] &&
                                                    extractActionList(item.title)[0].action === "C" ? "text-green-500" : extractActionList(item.title) &&
                                                        extractActionList(item.title)[0] &&
                                                        extractActionList(item.title)[0].action === "H" ? "text-blue-500" : "text-red-600"
                                        )
                                    }
                                >
                                    {
                                        extractActionList(item.title) &&
                                        extractActionList(item.title)[0] &&
                                        extractActionList(item.title)[0].action
                                    }
                                </div>
                                <div
                                    className={
                                        clsx(
                                            'w-[20px] h-[20px] border border-gray-600 border-l-[0px] border-t-[0px] border-b-[0px] border-r-[0px] rounded-bl-full text-left pl-[6px] pt-[0px] font-bold text-gray-400 text-[10px]',
                                            extractActionList(item.title) &&
                                                extractActionList(item.title)[1] &&
                                                extractActionList(item.title)[1].action === "F" ? "text-gray-500" : extractActionList(item.title) &&
                                                    extractActionList(item.title)[1] &&
                                                    extractActionList(item.title)[1].action === "C" ? "text-green-500" : extractActionList(item.title) &&
                                                        extractActionList(item.title)[1] &&
                                                        extractActionList(item.title)[1].action === "H" ? "text-blue-500" : "text-red-600"
                                        )
                                    }
                                >
                                    {
                                        extractActionList(item.title) &&
                                        extractActionList(item.title)[1] &&
                                        extractActionList(item.title)[1].action
                                    }
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div >
    )
}