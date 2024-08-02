import ActionFilter from "./actionFilter"
import ReportFilter from "./reportFilter"
import UserFilter from "./userFilter"
import Datafilter from "./datafilter"

export default function Filtering({ userTab, isGradinet, setUserTab, squeezePanel, setSqueezePanel, actionLit, setActionList, reportingResult, premiumStatus, setPremiumStatus, squeezeSetting, setSqueezeSetting, defaultReportSetting, filter, valueStatus, setValueStatus, setFilter, heroPosition, stackDepth, VillianPosition, bufferRportingStatue }: any) {

  return (
    <div className="border border-gray-500 rounded-[8px] flex justify-between flex-wrap p-2">

      <ActionFilter
        valueStatus={valueStatus}
        setValueStatus={(total: any) => setValueStatus(total)}
        bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

        squeezePanel={squeezePanel}
        setSqueezePanel={(total: any) => setSqueezePanel(total)}

        actionLit={actionLit}
        setActionList={(total: any) => setActionList(total)}

        premiumStatus={premiumStatus}
        setPremiumStatus={(total: any) => setPremiumStatus(total)}

        squeezeSetting={squeezeSetting}
        setSqueezeSetting={(total: any) => setSqueezeSetting(total)}

        heroPosition={heroPosition}
        stackDepth={stackDepth}
        VillianPosition={VillianPosition}
      />
      <div className="w-full xl:w-1/2 flex justify-between flex-wrap">
        <ReportFilter

          userTab={userTab}
          setUserTab={(userTab: any) => setUserTab(userTab)}
          reportingResult={reportingResult}

          valueStatus={valueStatus}
          defaultReportSetting={defaultReportSetting}
          setValueStatus={(total: any) => setValueStatus(total)}
          bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

          heroPosition={heroPosition}
          stackDepth={stackDepth}
          VillianPosition={VillianPosition}
          isGradinet={isGradinet}
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