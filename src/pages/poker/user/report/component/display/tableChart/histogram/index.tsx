import { useState } from 'react';
import MACD from './MACD';
import { handPair } from '../../../../../../../../utils/functions/user/report/MACD'

export default function Histogram({ filter, userInfoResult, reportingResult }: any) {

    const [actionType, setActionType] = useState("raise")
    const [range, setRange] = useState("A")
    const [handType, setHandType] = useState("")
    // const [reportSetting, setReportSetting] = useState({ position: "", action: "" })

    const bufferCurrentHand = async (handType: any) => {
        const data = {
            actionType: actionType,
            handType: handType,
            handRange: range,
            // reportSetting: reportSetting,
            // page: page,
            // pageSize: pageSize,
            ...filter
        }
        // const response = await handPair(data)
        // setUserResultList(response)
    }

    return (
        <div className="">
            <MACD
                range={range}
                filter={filter}
                actionType={actionType}
                userInfoResult={userInfoResult}
                reportingResult={reportingResult}
                setRange={(range: any) => setRange(range)}
                setHandType={(handType: any) => setHandType(handType)}
                setActionType={(actionType: any) => setActionType(actionType)}
                bufferCurrentHand={(data: any) => bufferCurrentHand(data)}
            />
        </div>
    )
}