import { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useNavigate } from "react-router-dom";
import { accessTokenDecode } from '../../../../../utils/middlewareFunction/accessTokenDecode'
import sortBy from 'lodash/sortBy';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import clsx from 'clsx'
import ConfrimModal from './ConfrimModal'
import Filtering from './Filtering'
import { setPageTitle } from '../../../../../store/themeConfigSlice';
import { getHands, deleteHand } from '../../../../../utils/functions/HandAPI'
import SmallPlayCard from '../../../../../components/UI/playcard/SmallPlayCard';
import { pokerMarkList } from '../../../../../utils/reference'
import { toggleLoadingStatus } from "../../../../../store/utilConfigSlice";

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

    const [confrimModal, setConfrimModal] = useState(false);
    const [removeId, setRemoveId] = useState(undefined);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.toISOString().split('T')[0];

    const [filter, setFilter] = useState({
        pokerType: "N/A",
        tableSize: "2~10",
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

    const removeStep1 = async (id: any) => {
        setRemoveId(id)
        setConfrimModal(true)
    }

    const removeStep2 = async (bool: any, isRemove: any) => {
        if (!isRemove) {
            setRemoveId(undefined)
        }
        else {
            itemDelete(removeId)
        }

        setConfrimModal(bool)
    }

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

            <ConfrimModal
                confrimModal={confrimModal}
                setConfrimModal={(bool: any, isRemove: any) => removeStep2(bool, isRemove)}
            />

            <div className="datatables">
                <DataTable
                    noRecordsText="No results match your search query"
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={initialRecords}
                    columns={[
                        {
                            accessor: 'pokerRoomId', title: 'NET', sortable: true, render: ({ pokerRoomId }) =>
                                <div className="text-info flex justify-center">
                                    <img
                                        src={pokerMarkList.filter((item: any) => item.value === pokerRoomId)[0].image}
                                        alt={pokerMarkList.filter((item: any) => item.value === pokerRoomId)[0].image}
                                        className="max-w-[20px] w-full m-auto mx-4"
                                    />
                                </div>
                        },
                        { accessor: 'gameFormat', title: 'FORMAT', render: ({ gameFormat }) => <strong className="text-info flex justify-center">{gameFormat}</strong> },
                        { accessor: 'maxTableSeats', title: 'SIZE', sortable: true, render: ({ maxTableSeats }) => <strong className="text-info flex justify-center">{maxTableSeats}-max</strong> },
                        { accessor: 'reportContent', title: 'HERO', sortable: true, render: ({ reportContent }) => <strong className="text-info flex justify-center">{heroFinding(reportContent)}</strong> },
                        {
                            accessor: 'holeCards', title: 'HERO', render: ({ holeCards }) => <strong className="text-info flex justify-center">
                                <div className='flex justify-center items-center'>
                                    {holeCards.find((item: any) => item.playerName === "Hero").cards.map((item: any, index: any) =>
                                        <div key={index}>
                                            {holdCard(item)}
                                        </div>
                                    )}
                                </div>
                            </strong>
                        },
                        {
                            accessor: 'actions', title: 'PF', render: ({ actions }) => <strong className="text-info flex justify-start">
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
                            accessor: 'actions', title: 'F', render: ({ actions }) => <strong className="text-info flex justify-start">
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
                            accessor: 'actions', title: 'T', render: ({ actions }) => <strong className="text-info flex justify-start">
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
                            accessor: 'actions', title: 'R', render: ({ actions }) => <strong className="text-info flex justify-start">
                                <div className='flex justify-center items-center'>
                                    {actions.filter((item: any) => item.street === "River" && item.playerName === "Hero").map((each: any, order: any) =>
                                        <span key={order}>{actionSet[each.action]}</span>
                                    )}
                                </div>
                            </strong>
                        },
                        { accessor: 'handDate', title: 'DATE', sortable: true, render: ({ handDate }) => <strong className="text-info flex justify-center">{handDate.split(' ')[0]}</strong> },
                        {
                            accessor: '_id', title: 'Action', sortable: true, render: ({ _id, handId }) =>
                                <div className='flex justify-between items-center'>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm rounded-full"
                                        onClick={() => checkDetailInfo(handId)}
                                    >
                                        Reply
                                    </button>
                                    <button
                                        type="button"
                                        className="mr-1 btn btn-outline-danger btn-sm rounded-full"
                                        onClick={() => removeStep1(_id)}
                                    >
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="rest" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M508 704c79.5 0 144-64.5 144-144s-64.5-144-144-144-144 64.5-144 144 64.5 144 144 144zm0-224c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80z"></path><path d="M832 256h-28.1l-35.7-120.9c-4-13.7-16.5-23.1-30.7-23.1h-451c-14.3 0-26.8 9.4-30.7 23.1L220.1 256H192c-17.7 0-32 14.3-32 32v28c0 4.4 3.6 8 8 8h45.8l47.7 558.7a32 32 0 0031.9 29.3h429.2a32 32 0 0031.9-29.3L802.2 324H856c4.4 0 8-3.6 8-8v-28c0-17.7-14.3-32-32-32zm-518.6-76h397.2l22.4 76H291l22.4-76zm376.2 664H326.4L282 324h451.9l-44.3 520z"></path></svg>
                                    </button>
                                </div>
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
