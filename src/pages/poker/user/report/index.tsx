import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Filtering from "./component/filter"
import Displaying from "./component/display"
import { nowDate } from '../../../../utils/actionValidation/reporting/maceDate'
import { mainDataHandInfo, reportIntegration } from '../../../../utils/functions/user/report/Report'
import { defaultReportSetting } from '../../../../utils/reference/reporting';
import { toggleLoadingStatus } from "../../../../store/utilConfigSlice"

export default function Reporting() {

    const dispatch = useDispatch();

    const [valueStatus, setValueStatus] = useState<any>({ action: "", heroPosition: "", stackDepth: "", VillianPosition: "" })
    const [heroPosition, setHeroPosition] = useState<any>([])
    const [stackDepth, setStackDepth] = useState<any>([])
    const [VillianPosition, setVillianPosition] = useState<any>([])

    const [filter, setFilter] = useState({
        pokerType: "GGPoker",
        tableSize: 8,
        range: `2023-11-30 to ${nowDate()}`
    })

    const [userTab, setUserTab] = useState(1)

    const [reportingResult, setReportingResult] = useState<any>({});
    const [userInfoResult, setUserInfoResult] = useState<any>({});

    useEffect(() => {

        const data = {
            action: valueStatus.action,
            heroPositionList: heroPosition,
            stackDepthList: stackDepth,
            VillianPosition: VillianPosition,
            ...filter,
        }
        if (
            filter.pokerType !== "N/A" &&
            filter.tableSize !== -1 &&
            data.action !== "" &&
            filter.range !== undefined &&
            data.heroPositionList.length !== 0 &&
            data.stackDepthList.length !== 0
        ) {
            async function fetchMyAPI() {
                const response = await mainDataHandInfo(data)
                setReportingResult(response)
            }
            fetchMyAPI()
        }
    }, [valueStatus, filter, heroPosition, stackDepth, VillianPosition])

    useEffect(() => {
        const data = {
            action: valueStatus.action,
            heroPosition: heroPosition,
            stackDepth: stackDepth,
            VillianPosition: VillianPosition,
            ...filter,
            isSqueeze: false
        }
        if (
            data.action !== "" &&
            data.heroPosition.length !== 0 &&
            data.stackDepth.length !== 0
        ) {
            async function fetchData() {
                dispatch(toggleLoadingStatus())
                const response = await reportIntegration(data)
                dispatch(toggleLoadingStatus())
                setUserInfoResult(response.userData)
            }
            fetchData()
        }
    }, [valueStatus, filter])


    const bufferValueStatue = (total: any) => {
        if (total.heroPosition !== "") setHeroPosition(defaultReportSetting.heroPosition.find((item: any) => item.title === total.heroPosition).stringList)
        if (total.stackDepth !== "") setStackDepth(defaultReportSetting.stackDepth.find((item: any) => item.title === total.stackDepth).valueList)
        if (total.VillianPosition !== "") setVillianPosition(defaultReportSetting.VillianPosition.find((item: any) => item.title === total.VillianPosition).stringList)
        setValueStatus(total)
    }

    const bufferRportingStatue = (type: any, value: any) => {
        if (type === "heroPosition") setHeroPosition(heroPosition.includes(value) ? heroPosition.filter((item: any) => item !== value) : [...heroPosition, value])
        if (type === "stackDepth") setStackDepth(stackDepth.includes(value) ? stackDepth.filter((item: any) => item !== value) : [...stackDepth, value])
        if (type === "VillianPosition") setVillianPosition(VillianPosition.includes(value) ? VillianPosition.filter((item: any) => item !== value) : [...VillianPosition, value])
    }


    return (
        <div className="">
            <Filtering
                filter={filter}
                valueStatus={valueStatus}
                defaultReportSetting={defaultReportSetting}
                setFilter={(total: any) => setFilter(total)}
                setValueStatus={(total: any) => bufferValueStatue(total)}
                bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

                heroPosition={heroPosition}
                stackDepth={stackDepth}
                VillianPosition={VillianPosition}
            />
            <Displaying
                filter={filter}
                userTab={userTab}
                userInfoResult={userInfoResult}
                reportingResult={reportingResult}
            />
        </div>
    )
}