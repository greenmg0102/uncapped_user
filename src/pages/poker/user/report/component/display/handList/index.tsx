import { useState, useEffect } from 'react'
import UserDetailList from './userDetailList/index'
import { reportEachPair } from '../../../../../../../utils/functions/user/report/Report'

export default function HandList({ interestingPair }: any) {

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 40, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    const [userResultList, setUserResultList] = useState({
        totalCount: 0,
        result: []
    })

    const [userResultModal, setUserResultModal] = useState(false)
    const [advancedOptionModal, setAdvancedOptionModal] = useState(false)
    const [activeUserData, setActiveUserData] = useState("Pairs")


    useEffect(() => {
        async function fetchMyAPI() {
            const data = {
                nodeList: interestingPair,
                page: page,
                pageSize: pageSize
            }
            const response = await reportEachPair(data)
            setUserResultList(response)
        }
        fetchMyAPI()
    }, [interestingPair, page, pageSize])

    return (
        <div className="border border-gray-600 p-2 min-h-[495px] rounded-[8px] w-full xl:w-[30%] mt-12">
            <UserDetailList
                page={page}
                pageSize={pageSize}
                PAGE_SIZES={PAGE_SIZES}
                interestingPair={interestingPair}
                userResultList={userResultList}
                activeUserData={activeUserData}
                setActiveUserData={(activeId: any) => setActiveUserData(activeId)}
                setPage={(e: any) => setPage(e)}
                setUserResultModal={(bool: boolean) => setUserResultModal(bool)}
                setPageSize={(e: any) => setPageSize(e)}
                onPageChange={(p: any) => setPage(p)}
            />
        </div>
    )
}