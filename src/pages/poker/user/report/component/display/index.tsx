import { useState } from 'react'
import TableChart from './tableChart'
import HandList from './handList'

export default function Displaying({ filter, userTab, reportingResult, userInfoResult }: any) {

    const [interestingPair, setInterestingPair] = useState([])

    return (
        <div className="mt-8 flex justify-between items-start flex-wrap transition-all">
            <TableChart
                filter={filter}
                userTab={userTab}
                userInfoResult={userInfoResult}
                reportingResult={reportingResult}
                setInterestingPair={(pair: any) => setInterestingPair(pair)}
            />
            <HandList
                interestingPair={interestingPair}
            />
        </div>
    )
}