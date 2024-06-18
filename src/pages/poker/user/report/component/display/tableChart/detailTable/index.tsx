import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DetailTable from './DetailTable';
import { setPageTitle } from '../../../../../../../../store/themeConfigSlice';
import { detailedTableGet, conditionPair } from '../../../../../../../../utils/functions/user/report/Report'


export default function DetailTablePoint({ page, PAGE_SIZES, pageSize, filter }: any) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [stackDepthCategory, setStackDepthCategory] = useState("10, 15, 20, 25, 30, 40, 50, 60, 80, 100")

    const [detailedTable, setDetailedTable] = useState([])
    const [reportSetting, setReportSetting] = useState({ position: "", action: "" })
    const [detailType, setDetailType] = useState("Hero")

    useEffect(() => {

        dispatch(setPageTitle('Statistical Report'));

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken === null && refreshToken === null) navigate('/auth/boxed-signin');

        async function fetchMyAPI() {
            const detailedTableGetData: any = {
                // ...valueStatus,
                ...filter,
                heroPosition: [],
                heroPositionIndex: -1,
                stackDepth: [],
                VillianPosition: [],
                villianPositionIndex: -1,
                action: "",
                stackDepthCategory: stackDepthCategory,
                detailType: detailType
            }

            // if (
            //     detailedTableGetData.action !== "" &&
            //     detailedTableGetData.pokerType !== "N/A" &&
            //     detailedTableGetData.tableSize !== -1 &&
            //     detailedTableGetData.heroPosition.length !== 0 &&
            //     detailedTableGetData.stackDepth.length !== 0 &&
            //     detailedTableGetData.range !== undefined
            // ) {

            const detailResult = await detailedTableGet(detailedTableGetData)
            setDetailedTable(detailResult)
            // }
        }
        fetchMyAPI()
    }, [filter, stackDepthCategory])


    useEffect(() => {
        if (reportSetting.position !== "") {
            async function fetchMyAPI() {
                const data = {
                    reportSetting: reportSetting,
                    page: page,
                    pageSize: pageSize,
                    ...filter,
                    stackDepthCategory: stackDepthCategory
                }
                const response = await conditionPair(data)
                // setUserResultList(response)
                console.log("response", response);
            }
            fetchMyAPI()
        }
    }, [reportSetting, page, pageSize, stackDepthCategory])

    const [raiseSizingConfig, setRaiseSizingConfig] = useState({
        type: undefined,
        field: undefined,
        position: undefined,
        actionType: undefined,
        stackDepth: undefined,
    })

    const raiseSizingTable = async (type: any, field: any, position: any, actionType: any, stackDepth: any) => {

        setRaiseSizingConfig({
            type: type,
            field: field,
            position: position,
            actionType: actionType,
            stackDepth: stackDepth
        })
    }

    const bufferStackDepthCategory = (value: any, type: any) => {
        setStackDepthCategory(value)
        // setDetailType(type)
    }
    return (
        <div className="">
            <DetailTable
                filter={filter}
                detailedTable={detailedTable}
                reportSetting={reportSetting}
                stackDepthCategory={stackDepthCategory}
                setDetailType={(type: any) => setDetailType(type)}
                raiseSizingTable={(type: any, field: any, position: any, actionType: any, stackDepth: any) => raiseSizingTable(type, field, position, actionType, stackDepth)}
                setReportSetting={(position: any, action: any) => setReportSetting({ ...reportSetting, position: position, action: action })}
                setStackDepthCategory={(stackCategory: any, type: any) => bufferStackDepthCategory(stackCategory, type)}
            />
        </div>
    )
}