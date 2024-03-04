import { findNearestColor } from '../../../../../..//utils/actionValidation/reporting/getGlobalFrequency'
import { actionNodeDistinguish } from '../../../../../../utils/system/actionNodeDistinguish'
import clsx from 'clsx'

const HeatMapItem = ({ nextObject, userTab, data, reportingResultItem, handResult, setInterestingPair, bufferSetReportItemActive, reportItemActive }: any) => {
    return (
        <div
            className={clsx("relative h-[36px] z-[1] cursor-pointer transition-all", reportItemActive === data ? "rounded-[4px]" : "rounded-[0px]")}
            style={{
                backgroundColor: findNearestColor(Math.abs((1 - reportingResultItem.played[0]) - nextObject)),
                filter: reportItemActive === data ? `blur(${0}px)` : `blur(${25}px)`
            }}
            onClick={() => {
                bufferSetReportItemActive(data)
                setInterestingPair(actionNodeDistinguish(handResult, userTab) ? actionNodeDistinguish(handResult, userTab) : [])
            }}
        >
            <div className={clsx("absoulte transition-all", reportItemActive === data ? "w-[180px] h-[120px] bg-gray-100 rounded-[4px] p-2 pt-4 border border-gray-900 border-[2px]" : "w-[0px] h-[0px]")}>
                <p className='text-left text-[32px] text-gray-800 font-bold'>{data}</p>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-900 font-bold text-right mt-2'>Category</p>
                    <p className='text-gray-900 font-bold text-right mt-2'>Frequency</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-900 font-bold'>Total</p>
                    <p className='text-gray-900 font-bold'>{(Math.abs((1 - reportingResultItem.played[0]) - nextObject) * 100).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};
export default HeatMapItem;