import { useState } from 'react'
import TableChart from './tableChart'
import HandList from './handList'

export default function Displaying({ filter, valueStatus, heroPosition, stackDepth, VillianPosition, userTab, reportingResult, userInfoResult, setIsGradient }: any) {

    const [interestingPair, setInterestingPair] = useState([])

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 40, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    return (
        <div className="mt-8 flex justify-between items-start flex-wrap transition-all">
            <TableChart
                filter={filter}
                valueStatus={valueStatus}
                heroPosition={heroPosition}
                stackDepth={stackDepth}
                VillianPosition={VillianPosition}
                userTab={userTab}
                userInfoResult={userInfoResult}
                reportingResult={reportingResult}
                page={page}
                PAGE_SIZES={PAGE_SIZES}
                pageSize={pageSize}
                setIsGradient={(bool: any) => setIsGradient(bool)}
                setInterestingPair={(pair: any) => setInterestingPair(pair)}
            />
            <HandList
                page={page}
                PAGE_SIZES={PAGE_SIZES}
                pageSize={pageSize}
                interestingPair={interestingPair}
                setPage={(page: any) => setPage(page)}
                setPageSize={(pageSize: any) => setPageSize(pageSize)}
            />
        </div>
    )
}