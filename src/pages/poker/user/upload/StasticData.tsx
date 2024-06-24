import { useState, useEffect } from 'react';
import { globalStatistic } from '../../../../utils/functions/user/landing/scatterChart'
import { accessTokenDecode } from '../../../../utils/middlewareFunction/accessTokenDecode'
import { scatterGet } from '../../../../utils/actionValidation/landing/scatter'
import StackPosition from './scatterComponent/StackPosition';

const StasticData = () => {

    const [deviations, setDeviations] = useState<any>([])

    useEffect(() => {

        async function fetchData() {

            const accessToken = localStorage.getItem('accessToken');
            const userId = accessTokenDecode(accessToken)

            const data = {
                userId: userId,
                range: `2023-11-30 to 2025-11-30`
            }
            let result = await globalStatistic(data)
            let real = []

            real.push({
                nameSumBB: "sumBB",
                sumBBData: result.map((item: any) => item.sumBB),
                nameSumExpected: "Net Expected",
                sumExpectedData: result.map((item: any) => item.sumExpected),
                nameSumShow: "sumShow",
                sumShowData: result.map((item: any) => item.sumShow),
                nameSumNotShowHand: "sumNotShowHand",
                sumNotShowHandData: result.map((item: any) => item.sumNotShowHand),
                xXios: [...Array(result.length).fill(0).map((item: any, index: any) => index + 1)]
            })
            setDeviations(real)
        }
        fetchData()
    }, [])

    return (
        <div className='py-2 px-0'>
            <StackPosition deviation={deviations} />
        </div>
    );
};

export default StasticData;