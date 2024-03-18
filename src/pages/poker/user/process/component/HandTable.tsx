import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useNavigate } from "react-router-dom";
import { accessTokenDecode } from '../../../../../utils/middlewareFunction/accessTokenDecode'
import sortBy from 'lodash/sortBy';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import clsx from 'clsx'
import Filtering from './Filtering'
import { setPageTitle } from '../../../../../store/themeConfigSlice';
import { getHands, deleteHand } from '../../../../../utils/functions/HandAPI'
import SmallPlayCard from '../../../../../components/UI/playcard/SmallPlayCard';
import { pokerMarkList } from '../../../../../utils/reference'
import { toggleLoadingStatus } from "../../../../../store/utilConfigSlice"

const HandTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [rowData, setRowData] = useState<any>([])

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 40, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, '_id'));
    const [totalCount, setTotalCount] = useState(0)
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: '_id', direction: 'asc' });

    const [dragModel, setDragModel] = useState(false)

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().split('T')[0];

    const [filter, setFilter] = useState({
        pokerType: "N/A",
        tableSize: "N/A",
        heroPosition: "N/A",
        range: `2023-11-30 to ${nextDay}`
    })

    useEffect(() => { dispatch(setPageTitle('Hand History Database')); });

    useEffect(() => {
        fetchMyAPI()
    }, [dispatch, pageSize, page, filter])

    async function fetchMyAPI() {
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            pageNumber: page,
            pageSize: pageSize,
            ...filter,
            userId: accessTokenDecode(accessToken)
        }
        dispatch(toggleLoadingStatus())
        const response = await getHands(data)
        dispatch(toggleLoadingStatus())
        setInitialRecords(() => response.data.hands)
        setTotalCount(response.data.totalCount)
    }

    useEffect(() => { setPage(1); }, [pageSize]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const hero8Site = ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB", "BB"]

    // const hero9Site = ["UTG", "UTG+1", "UTG+2", "LJ", "HJ", "CO", "BTN", "SB", "BB"]

    const heroFinding = (reportContent: any): string => {
        if (reportContent.heroPosition !== null) return hero8Site[reportContent.heroPosition]
        else return ""
    };

    const itemDelete = async (id: any) => {
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            id: id,
            pageNumber: page,
            pageSize: pageSize,
            ...filter,
            userId: accessTokenDecode(accessToken)
        }
        dispatch(toggleLoadingStatus())
        const response = await deleteHand(data)
        dispatch(toggleLoadingStatus())
        setInitialRecords(() => response.data.hands)
        setTotalCount(response.data.totalCount)
    }

    const holdCard = (holeCardInfo: { rank: string, suit: string }): any => <SmallPlayCard holeCardInfo={holeCardInfo} />

    const checkDetailInfo = (_id: any) => navigate("/user/poker/process/" + _id);

    const actionSet: { [key: string]: string } = {
        "fold": 'F',
        "folds": 'F',
        "raise": 'R',
        "all in, raise": 'R',
        "bet": 'B',
        "all in, bet": 'B',
        "call": 'C',
        "all in, call": 'C',
        "check": 'X',
        "all in, check": 'X',
    };

    return (
        <div className="panel">
            <Filtering
                page={page}
                filter={filter}
                rowData={rowData}
                pageSize={pageSize}
                dragModel={dragModel}
                setFilter={(total: any) => setFilter(total)}
                setDragModel={(bool: any) => setDragModel(bool)}
                setInitialRecords={(hands: any) => setInitialRecords(hands)}
                setTotalCount={(totalCount: any) => setInitialRecords(totalCount)}
            />

            <div className="datatables">
                <DataTable
                    noRecordsText="No results match your search query"
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={initialRecords}
                    columns={[
                        {
                            accessor: 'handId', title: 'DETAILS', render: ({ handId }) => <div className="text-info flex justify-center items-center">
                                <div className='w-[20px] h-[20px] hover:w-[40px] hover:h-[40px] transition-all'>
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 1024 1024"
                                        className="w-[20px] hover:cursor-pointer hover:w-[40px] transition-all"
                                        onClick={() => checkDetailInfo(handId)}
                                    >
                                        <path d="M391.166 156.304H501.7c228.857 0 422.263 184.597 422.263 403.115C923.963 780.312 742.427 960 519.315 960c-235.128 0-419.278-193.554-419.278-440.625 0-10.564 8.584-19.11 19.109-19.11h113.159c10.602 0 19.11 8.546 19.11 19.11 0 218.781 138.391 296.747 267.9 296.747 134.92 0 253.27-123.2 253.27-263.605 0-131.897-124.059-243.34-270.885-243.34l-106.555-3.227-3.979-149.646z" fill="#FF3B30" /><path d="M407.884 309.176v77.275c0 6.941-3.73 13.267-9.777 16.664-6.011 3.398-13.398 3.209-19.295-0.375L128.305 249.013c-5.71-3.508-9.147-9.669-9.147-16.383 0.078-6.681 3.585-12.876 9.333-16.312L378.998 66.729c5.894-3.542 13.285-3.657 19.221-0.221 6.008 3.358 9.665 9.702 9.665 16.609V309.176z" fill="#FF3B30" />
                                        <path d="M439.717 307.301l40.724-150.999h-72.557v150.035z" fill="#070707" />
                                    </svg>
                                </div>
                            </div>
                        },
                        {
                            accessor: 'pokerRoomId', title: 'PORKER', sortable: true, render: ({ pokerRoomId }) =>
                                <div className="text-info flex justify-center">
                                    <img
                                        src={pokerMarkList.filter((item: any) => item.value === pokerRoomId)[0].image}
                                        alt={pokerMarkList.filter((item: any) => item.value === pokerRoomId)[0].image}
                                        className="max-w-[20px] w-full m-auto mx-4"
                                    />
                                </div>
                        },
                        { accessor: 'gameFormat', title: 'GAME FORMAT', render: ({ gameFormat }) => <strong className="text-info flex justify-center">{gameFormat}</strong> },
                        { accessor: 'maxTableSeats', title: 'TABLE SIZE', sortable: true, render: ({ maxTableSeats }) => <strong className="text-info flex justify-center">{maxTableSeats}-max</strong> },
                        { accessor: 'reportContent', title: 'HERO', sortable: true, render: ({ reportContent }) => <strong className="text-info flex justify-center">{heroFinding(reportContent)}</strong> },
                        {
                            accessor: 'holeCards', title: 'HOLE CARDS', render: ({ holeCards }) => <strong className="text-info flex justify-center">
                                <div className='flex justify-center items-center'>
                                    {holeCards[0].cards.map((item: any, index: any) =>
                                        <div key={index}>
                                            {holdCard(item)}
                                        </div>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'actions', title: 'PF Act', render: ({ actions }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {actions.filter((item: any) => item.street === "preFlop" && item.playerName === "Hero").map((each: any, order: any) =>
                                        <span key={order}>{actionSet[each.action]}</span>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'communityCards', title: 'Flop', render: ({ communityCards }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {communityCards.length > 3 && communityCards.slice(0, 3).map((item: any, index: any) =>
                                        <div key={`flop-${index}`}>
                                            {holdCard(item)}
                                        </div>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'actions', title: 'F Act', render: ({ actions }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {actions.filter((item: any) => item.street === "Flop" && item.playerName === "Hero").map((each: any, order: any) =>
                                        <span key={order}>{actionSet[each.action]}</span>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'communityCards', title: 'Turn', render: ({ communityCards }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {communityCards.length > 4 && communityCards.slice(3, 4).map((item: any, index: any) =>
                                        <div key={`turn-${index}`}>
                                            {holdCard(item)}
                                        </div>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'actions', title: 'T Act', render: ({ actions }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {actions.filter((item: any) => item.street === "Turn" && item.playerName === "Hero").map((each: any, order: any) =>
                                        <span key={order}>{actionSet[each.action]}</span>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'communityCards', title: 'River', render: ({ communityCards }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {communityCards.length === 5 && communityCards.slice(4, 5).map((item: any, index: any) =>
                                        <div key={`river-${index}`}>
                                            {holdCard(item)}
                                        </div>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'actions', title: 'R Act', render: ({ actions }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {actions.filter((item: any) => item.street === "River" && item.playerName === "Hero").map((each: any, order: any) =>
                                        <span key={order}>{actionSet[each.action]}</span>
                                    )}
                                </div>
                            </strong>
                        },
                        { accessor: 'handDate', title: 'PLAYED DATE', sortable: true, render: ({ handDate }) => <strong className="text-info flex justify-center">{handDate}</strong> },
                        {
                            accessor: '_id', title: 'Action', sortable: true, render: ({ _id }) =>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary rounded-full"
                                    onClick={() => itemDelete(_id)}
                                >
                                    Delete
                                </button>
                        },
                    ]}
                    totalRecords={totalCount}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default HandTable
HandTable;
