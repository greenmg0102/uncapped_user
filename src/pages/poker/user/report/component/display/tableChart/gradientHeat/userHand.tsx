import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import HeatMap from '../../../Gradient/HeatMap'
import GradientUser from '../../../Gradient/GradientUser';
import { getGlobalFrequency } from '../../../../../../../../utils/actionValidation/reporting/getGlobalFrequency'
import { getGloabalOpertunity } from '../../../../../../../../utils/functions/user/report/Report'
import { toggleLoadingStatus } from "../../../../../../../../store/utilConfigSlice"

export default function UserHand({ filter, valueStatus, heroPosition, stackDepth, VillianPosition, userTab, userInfoResult, reportingResult, reportItemActive, setReportItemActive, setInterestingPair }: any) {

    const dispatch = useDispatch();

    const [globalFre, setGlobalFre] = useState<any>({});

    useEffect(() => {

        async function fetchDataAndDispatch() {
            const data = {
                action: valueStatus.action,
                heroPosition: heroPosition,
                stackDepth: stackDepth,
                VillianPosition: VillianPosition,
                ...filter
            }
            dispatch(toggleLoadingStatus())
            const gloabalOpertunity = await getGloabalOpertunity(data);
            dispatch(toggleLoadingStatus())

            let result = getGlobalFrequency(gloabalOpertunity)

            setGlobalFre(result)
        }
        fetchDataAndDispatch();
    }, []);

    return (
        <div className="w-full lg:w-1/2">
            {true ?  // isHeat === true
                <HeatMap
                    isGrid={true}  // isGrid
                    userTab={userTab}
                    globalFre={globalFre}
                    userInfoResult={userInfoResult}
                    reportingResult={reportingResult}
                    reportItemActive={reportItemActive}
                    setInterestingPair={(pair: any) => setInterestingPair(pair)}
                    bufferSetReportItemActive={(item: any) => setReportItemActive((previous: string) => previous === item ? "" : item)}
                />
                :
                <GradientUser
                    userTab={userTab}
                    globalFre={globalFre}
                    userInfoResult={userInfoResult}
                    reportingResult={reportingResult}
                    reportItemActive={reportItemActive}
                    setInterestingPair={(pair: any) => setInterestingPair(pair)}
                    bufferSetReportItemActive={(item: any) => setReportItemActive((previous: string) => previous === item ? "" : item)}
                />
            }
        </div>
    )
}