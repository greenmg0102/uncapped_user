import PreflopChart from "./preflopChart"
import UserHand from "./userHand"


export default function ChartComparison({ userTab, userInfoResult, reportingResult, reportItemActive, setInterestingPair, setReportItemActive }: any) {

    return (
        <div className="flex justify-between items-start flex-wrap">
            <PreflopChart
                reportingResult={reportingResult}
                reportItemActive={reportItemActive}
                setReportItemActive={(item: any) => setReportItemActive(item)}
            />
            <UserHand
                userTab={userTab}
                userInfoResult={userInfoResult}
                reportItemActive={reportItemActive}
                setInterestingPair={(pair: any) => setInterestingPair(pair)}
                setReportItemActive={(item: any) => setReportItemActive(item)}
            />
        </div>
    )
}