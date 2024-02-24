import { useState, useEffect } from 'react';
import { scatterChart } from '../../../../utils/functions/user/landing/scatterChart'
import { accessTokenDecode } from '../../../../utils/middlewareFunction/accessTokenDecode'
import { scatterGet } from '../../../../utils/actionValidation/landing/scatter'
import StackPosition from './scatterComponent/StackPosition';


const StasticData = () => {
    const [deviations, setDeviations] = useState<any>([])

    useEffect(() => {
        async function fetchData() {

            const accessToken = localStorage.getItem('accessToken');
            const userId = accessTokenDecode(accessToken)
            
            let actionList = ["RFI", "vs RFI"]

            for (let i = 0; i < actionList.length; i++) {

                const data = {
                    userId: userId,
                    action: actionList[i],
                    heroPositionList: [],
                    stackDepthList: [],
                    pokerType: "GGPoker",
                    tableSize: 8,
                    range: `2023-11-30 to 2025-11-30`
                }

                let result = await scatterChart(data)

                let real = scatterGet(result.mainData, result.userData, actionList[i], "raise")

                let buffer = deviations
                buffer.push(real)
                setDeviations(buffer)
            }
        }
        fetchData()

    }, [])

    return (
        <div className='py-2 px-0'>
            {deviations.length > 0 ?
                <StackPosition deviation={deviations[0]} />
                :
                null
            }
        </div>
    );
};

export default StasticData;