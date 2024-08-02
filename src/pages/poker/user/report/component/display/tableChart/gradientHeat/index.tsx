import { useEffect } from "react"
import PreflopChart from "./preflopChart"
import UserHand from "./userHand"

export default function GradientHeat({ filter, valueStatus, heroPosition, stackDepth, VillianPosition, userTab, userInfoResult, reportingResult, reportItemActive, setInterestingPair, setReportItemActive }: any) {
    return (
        <div className="flex justify-between items-start flex-wrap">
            <PreflopChart
                reportingResult={reportingResult}
                reportItemActive={reportItemActive}
                setReportItemActive={(item: any) => setReportItemActive(item)}
            />
            <UserHand
                filter={filter}
                valueStatus={valueStatus}
                heroPosition={heroPosition}
                stackDepth={stackDepth}
                VillianPosition={VillianPosition}
                userTab={userTab}
                reportingResult={reportingResult}
                userInfoResult={userInfoResult}
                reportItemActive={reportItemActive}
                setInterestingPair={(pair: any) => setInterestingPair(pair)}
                setReportItemActive={(item: any) => setReportItemActive(item)}
            />
        </div>
    )
}