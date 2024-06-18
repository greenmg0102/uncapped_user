import RangeItem from "./rangeItem"
import PanelItem from "./panelItem"

import { defaultReportSetting } from '../../../../../../../utils/reference/reporting';
import { hero8Site, stackArray, villianPokerTable } from '../../../../../../../utils/reference/playCardColor'

export default function PremiumPanel({ changeStatus, setValueStatus, valueStatus, heroPosition, stackDepth, VillianPosition, bufferRportingStatue }: any) {

    return (
        <>
            <div className="flex items-start flex-wrap">
                <div className="w-full lg:w-2/5">
                    <center className="font-bold text-gray-200 text-[15px]">Action</center>
                    <div className=" flex justify-between flex-wrap mt-2">
                        {defaultReportSetting.action.map((item: any, index: any) =>
                            <div className="w-1/3">
                                <PanelItem key={index} value={item.title} height={22} valueStatus={valueStatus} type={"action"} setValueStatus={(total: any) => setValueStatus(total)} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-3/5 flex mt-4 lg:my-0">
                    <div className="w-1/3">
                        <center className="font-bold text-gray-200 text-[15px]">Hero Pos</center>
                        <div className=" flex justify-between flex-wrap mt-2">
                            {
                                defaultReportSetting.eachPosition.map((item: any, index: any) =>
                                    <div className="w-1/2">
                                        <RangeItem
                                            key={index} value={item} height={22} valueStatus={valueStatus} type={"heroPosition"} list={heroPosition}
                                            bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="w-1/3">
                        <center className="font-bold text-gray-200 text-[15px]">Stack Dep</center>
                        <div className=" flex justify-between flex-wrap mt-2">
                            {
                                defaultReportSetting.eachStack.map((item: any, index: any) =>
                                    <div className="w-1/2">
                                        <RangeItem
                                            key={index} value={item} height={22} valueStatus={valueStatus} type={"stackDepth"} list={stackDepth}
                                            bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="w-1/3">
                        <center className="font-bold text-gray-200 text-[15px]">Villain Pos</center>
                        <div className=" flex justify-between flex-wrap mt-2">
                            {
                                defaultReportSetting.eachPosition.map((item: any, index: any) =>
                                    <div className="w-1/2">
                                        <RangeItem
                                            key={index} value={item} height={22} valueStatus={valueStatus} type={"VillianPosition"} list={VillianPosition}
                                            bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around items-center mt-4">
                <div
                    className="border border-blue-500 transition-all hover:border-blue-200 hover:text-blue-200 rounded-[4px] text-center text-blue-500 py-[4px] w-[200px] cursor-pointer"
                    onClick={() => changeStatus(0)}
                >
                    Back (General)
                </div>
                <div
                    className="border border-blue-500 transition-all hover:border-blue-200 hover:text-blue-200 rounded-[4px] text-center text-blue-500 py-[4px] w-[200px] cursor-pointer"
                    onClick={() => changeStatus(2)}
                >
                    Squeeze
                </div>
            </div>
        </>
    )
}