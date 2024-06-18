import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Filtering from "./component/filter"
import Displaying from "./component/display"
import { nowDate } from '../../../../utils/actionValidation/reporting/maceDate'
import { mainDataHandInfo, reportIntegration } from '../../../../utils/functions/user/report/Report'
import { defaultReportSetting } from '../../../../utils/reference/reporting';
import { toggleLoadingStatus } from "../../../../store/utilConfigSlice"
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { log } from 'console';

export default function Reporting() {

    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    const [valueStatus, setValueStatus] = useState<any>({ action: "", heroPosition: "", stackDepth: "", VillianPosition: "" })
    const [heroPosition, setHeroPosition] = useState<any>([])
    const [stackDepth, setStackDepth] = useState<any>([])
    const [VillianPosition, setVillianPosition] = useState<any>([])

    const [filter, setFilter] = useState({
        pokerType: "GGPoker",
        tableSize: 8,
        range: `2023-11-30 to ${nowDate()}`
    })

    const [squeezePanel, setSqueezePanel] = useState({
        type: undefined,
        RFI: undefined,
        caller: [],
        bet3: undefined,
        hero: [],
        SqueezeStackDepth: [0]
    })

    const [actionLit, setActionList] = useState<any>([])

    const [premiumStatus, setPremiumStatus] = useState({
        heroPosition: [],
        stackDepth: [],
        VillianPosition: [],
        action: ""
    })

    const [squeezeSetting, setSqueezeSetting] = useState({
        squeeze: null,
        squeezeAction: null
    })

    const [userTab, setUserTab] = useState(0)

    const [reportingResult, setReportingResult] = useState<any>({});
    const [userInfoResult, setUserInfoResult] = useState<any>({});


    const bufferSetPremiumStatus = (total: any) => {

        if (total.VillianPosition.some((item: any) => item >= total.heroPosition)) {
            MySwal.fire({
                title: "Villian can't be large than hero!",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: "color-error" }
            });
            return
        } else if (total.VillianPosition.length > 2) {
            MySwal.fire({
                title: "We limit the villian count as 2",
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: "color-error" }
            });
            return
        } else {
            setPremiumStatus(total)
        }
    }

    const bufferValueStatue = (total: any) => {
        console.log("total", total);

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

    useEffect(() => {
        let data1: any = {
            // ...valueStatus,
            // ...squeezeSetting,
            ...filter,
            ...squeezePanel,
            // isSqueeze: isSqueeze
        }

        if (
            // data.heroPosition.length !== 0 &&
            // data.stackDepth.length !== 0 &&

            data1.RFI !== undefined &&
            data1.caller.length !== 0 &&
            data1.bet3 !== undefined &&
            data1.hero.length !== 0 &&
            data1.SqueezeStackDepth.length !== 0

            // data.squeeze !== null &&
            // data.squeezeAction !== null
        ) {
            async function fetchData() {
                dispatch(toggleLoadingStatus())
                data1.isSqueeze = true
                data1.actionLit = actionLit
                const response = await reportIntegration(data1)
                dispatch(toggleLoadingStatus())
                setUserInfoResult(response.userData)
            }
            fetchData()
        }
    }, [filter, squeezePanel, actionLit])

    useEffect(() => {

        let data2: any = {
            // action: valueStatus.action,
            // heroPositionList: valueStatus.heroPosition,
            // stackDepthList: valueStatus.stackDepth,
            // VillianPosition: valueStatus.VillianPosition,
            // isSqueeze: isSqueeze,
            // ...squeezeSetting,
            // ...mainDataFilter,
            ...filter,
            ...squeezePanel
        }

        if (
            data2.pokerType !== "N/A" &&
            data2.tableSize !== -1 &&

            data2.RFI !== undefined &&
            data2.caller.length !== 0 &&
            data2.bet3 !== undefined &&
            data2.hero.length !== 0 &&
            data2.SqueezeStackDepth.length !== 0

            // data.heroPositionList.length !== 0 &&
            // data.stackDepthList.length !== 0 &&
            // data.range !== undefined &&
            // data.squeeze !== null &&
            // data.squeezeAction !== null
        ) {

            async function fetchMyAPI() {
                data2.isSqueeze = true
                data2.actionLit = actionLit

                const response = await mainDataHandInfo(data2)
                setReportingResult(response)
            }
            fetchMyAPI()
        }
    }, [filter, squeezePanel, actionLit])


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
            async function fetchData() {
                dispatch(toggleLoadingStatus())
                const response = await reportIntegration(data)
                dispatch(toggleLoadingStatus())
                setUserInfoResult(response.userData)
            }
            fetchData()
        }
    }, [valueStatus, filter, heroPosition, stackDepth, VillianPosition])


    return (
        <div className="">
            <Filtering

                userTab={userTab}
                setUserTab={(userTab: any) => setUserTab(userTab)}

                filter={filter}
                valueStatus={valueStatus}
                defaultReportSetting={defaultReportSetting}
                setFilter={(total: any) => setFilter(total)}

                setValueStatus={(total: any) => bufferValueStatue(total)}
                bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

                squeezePanel={squeezePanel}
                setSqueezePanel={(total: any) => setSqueezePanel(total)}

                actionLit={actionLit}
                setActionList={(total: any) => setActionList(total)}

                premiumStatus={premiumStatus}
                setPremiumStatus={(total: any) => bufferSetPremiumStatus(total)}

                squeezeSetting={squeezeSetting}
                setSqueezeSetting={(total: any) => setSqueezeSetting(total)}

                heroPosition={heroPosition}
                stackDepth={stackDepth}
                reportingResult={reportingResult}
                VillianPosition={VillianPosition}
            />
            <Displaying
                filter={filter}
                valueStatus={valueStatus}
                heroPosition={heroPosition}
                stackDepth={stackDepth}
                VillianPosition={VillianPosition}
                userTab={userTab}
                userInfoResult={userInfoResult}
                reportingResult={reportingResult}
            />
        </div>
    )
}