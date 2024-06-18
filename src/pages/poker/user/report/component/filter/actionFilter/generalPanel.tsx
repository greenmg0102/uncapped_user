import PanelItem from "./panelItem"

import { defaultReportSetting } from '../../../../../../../utils/reference/reporting';

export default function GeneralPanel({ changeStatus, setValueStatus, valueStatus }: any) {

  return (
    <>
      <div className="flex items-start flex-wrap">
        <div className="w-full lg:w-2/5">
          <center className="font-bold text-gray-200 text-[15px]">Action</center>
          <div className=" flex justify-between flex-wrap mt-2">
            {defaultReportSetting.action.map((item: any, index: any) =>
              <div className="w-1/3">
                <PanelItem key={index} value={item.title} height={22} valueStatus={valueStatus} type={"action"} setValueStatus={(total: any) => setValueStatus({ ...total, action: valueStatus.action === total.action ? "" : total.action })} />
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-3/5 flex mt-4 lg:my-0">
          <div className="w-1/3">
            <center className="font-bold text-gray-200 text-[15px]">Hero Pos</center>
            <div className=" flex flex-col justify-between mt-2">
              {
                defaultReportSetting.heroPosition.map((item: any, index: any) =>
                  <PanelItem key={index} value={item.title} height={22} valueStatus={valueStatus} type={"heroPosition"} setValueStatus={(total: any) => setValueStatus({ ...total, heroPosition: valueStatus.heroPosition === total.heroPosition ? "" : total.heroPosition })} />
                )
              }
            </div>
          </div>
          <div className="w-1/3">
            <center className="font-bold text-gray-200 text-[15px]">Stack Dep</center>
            <div className=" flex flex-col justify-between mt-2">
              {
                defaultReportSetting.stackDepth.map((item: any, index: any) =>
                  <PanelItem key={index} value={item.title} height={22} valueStatus={valueStatus} type={"stackDepth"} setValueStatus={(total: any) => setValueStatus({ ...total, stackDepth: valueStatus.stackDepth === total.stackDepth ? "" : total.stackDepth })} />
                )
              }
            </div>
          </div>
          <div className="w-1/3">
            <center className="font-bold text-gray-200 text-[15px]">Villain Pos</center>
            <div className=" flex flex-col justify-between mt-2">
              {
                defaultReportSetting.VillianPosition.map((item: any, index: any) =>
                  <PanelItem key={index} value={item.title} height={22} valueStatus={valueStatus} type={"VillianPosition"} setValueStatus={(total: any) => setValueStatus({ ...total, VillianPosition: valueStatus.VillianPosition === total.VillianPosition ? "" : total.VillianPosition })} />
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <div
          className="border border-blue-500 transition-all hover:border-blue-200 hover:text-blue-200 rounded-[4px] text-center text-blue-500 py-[4px] w-[200px] cursor-pointer"
          onClick={() => changeStatus(1)}
        >
          Premium
        </div>
      </div>
    </>
  )
}