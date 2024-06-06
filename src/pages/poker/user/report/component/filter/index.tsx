import ActionFilter from "./actionFilter"
import ReportFilter from "./reportFilter"
import UserFilter from "./userFilter"
import Datafilter from "./datafilter"

export default function Filtering({ defaultReportSetting, filter, valueStatus, setValueStatus, setFilter, heroPosition, stackDepth, VillianPosition, bufferRportingStatue }: any) {

  return (
    <div className="border border-gray-500 rounded-[8px] flex justify-between flex-wrap p-2">
      <ActionFilter
        valueStatus={valueStatus}
        setValueStatus={(total: any) => setValueStatus(total)}
        bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
        
        heroPosition={heroPosition}
        stackDepth={stackDepth}
        VillianPosition={VillianPosition}
      />
      <div className="w-full xl:w-1/2 flex justify-between flex-wrap">
        <ReportFilter
          valueStatus={valueStatus}
          defaultReportSetting={defaultReportSetting}
          setValueStatus={(total: any) => setValueStatus(total)}
          bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

          heroPosition={heroPosition}
          stackDepth={stackDepth}
          VillianPosition={VillianPosition}
        />
        <UserFilter />
        <Datafilter
          filter={filter}
          setFilter={(total: any) => setFilter(total)}
        />
      </div>
    </div>
  )
}