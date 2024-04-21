import { useState, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import clsx from 'clsx'
import sortBy from 'lodash/sortBy';
import { detailTablePosition } from '../../../../../../../utils/reference/playCardColor'
import CircleChart from "./CircleChart"
import "../detailStyle.css"

const DetailStaticTable = ({ reportSetting, setReportSetting, detailedTable }: any) => {

    const [initialRecords, setInitialRecords] = useState(sortBy(detailedTable, '_id'));

    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    useEffect(() => {

        let bufferReal = detailedTable

        if (detailedTable.length > 0) {

            let real: any = {}

            Object.keys(detailedTable[0]).forEach((key: any) => {
                if (key === "totalCount") {
                    real[key] = detailedTable.reduce((sum: any, item: any) => sum + item[key], 0)
                } else {
                    real[key] = detailedTable.reduce((sum: any, item: any) => sum + item[key], 0) / Object.keys(detailedTable).length
                }
                real["_id"] = 10
            })

            bufferReal.push(real)

            setInitialRecords(() => {
                return bufferReal.filter((item: any) => {
                    return (
                        item._id ||
                        item.totalCount ||
                        item.bb100 ||
                        item.allinbb100 ||
                        item.VPIP ||
                        item.PFR ||
                        item.RFI ||
                        item['vs RFI'] ||
                        item["3-Bet"] ||
                        item["vs 3-Bet"] ||
                        item["4-Bet"] ||
                        item["vs 4-Bet"] ||
                        item["5-Bet"]
                    );
                });
            });
        }
    }, [detailedTable]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    const [luckWheel, setLuckWheel] = useState({
        bb: 0, allinBB: 0
    })

    useEffect(() => {

        if (Object.keys(detailedTable).length > 0) {

            let bb = 0
            let alliBB = 0

            Object.keys(detailedTable).forEach((key: any) => {
                bb += Number(detailedTable[key].bb100) / (Number(detailedTable[key].totalCount) / 100)
                alliBB += Number(detailedTable[key].allinbb100) / (Number(detailedTable[key].totalCount) / 100)
            })

            setLuckWheel({
                ...luckWheel,
                bb: Number((bb / Object.keys(detailedTable).length).toFixed(2)),
                allinBB: Number((alliBB / Object.keys(detailedTable).length).toFixed(2))
            })
        }
    }, [detailedTable])

    return (
        <div className="datatables cursor-pointer detailTable">
            <DataTable
                highlightOnHover
                className="whitespace-nowrap table-hover mantine-1avyp1d"
                records={initialRecords}
                columns={[
                    {
                        accessor: '_id',
                        title: 'Position',
                        sortable: true,
                        render: ({ _id }: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center text-gray-400 ",
                                        reportSetting.position === _id && reportSetting.action === "" ? "text-blue-500" : "",
                                    )
                                }
                                onClick={() => setReportSetting(_id, "")}
                            >
                                {detailTablePosition[_id]}
                            </p>
                        )
                    },
                    {
                        accessor: 'totalCount',
                        title: 'Hands',
                        render: ({ totalCount }) => (
                            <p className="text-center">
                                {totalCount}
                            </p>
                        ),
                    },
                    {
                        accessor: 'bb100',
                        title: 'bb/100',
                        render: ({ bb100, totalCount }) => (
                            <p
                                className={
                                    clsx(
                                        "text-center ",
                                        (Number(bb100) / (Number(totalCount) / 100)) > 0 ? "text-green-500" : "text-red-500"
                                    )
                                }
                            >
                                {(Number(bb100) / (Number(totalCount) / 100)).toFixed(2)}
                            </p>
                        ),
                    },
                    {
                        accessor: 'allinbb100',
                        title: 'All-in bb/100',
                        render: ({ allinbb100, totalCount }) => (
                            <p className={clsx("text-center w-[100px] ", (Number(allinbb100) / (Number(totalCount) / 100)) > 0 ? "text-green-500" : "text-red-500")}>
                                {(Number(allinbb100) / (Number(totalCount) / 100)).toFixed(2)}
                            </p>
                        ),
                    },
                    {
                        accessor: 'VPIP',
                        title: 'VPIP',
                        render: ({ VPIP, _id, totalCount }) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === _id && reportSetting.action === "VPIP") ||
                                            (reportSetting.position === _id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(_id, "VPIP")}
                            >
                                {(Number(VPIP) / (Number(totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(VPIP) / (Number(totalCount) / 100)).toFixed(2)}
                            </p>
                        ),
                    },
                    {
                        accessor: 'PFR',
                        title: 'PFR',
                        render: ({ PFR, _id, totalCount }) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === _id && reportSetting.action === "PFR") ||
                                            (reportSetting.position === _id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(_id, "PFR")}
                            >
                                {(Number(PFR) / (Number(totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(PFR) / (Number(totalCount) / 100)).toFixed(2)}
                            </p>
                        ),
                    },
                    {
                        accessor: 'RFI',
                        title: 'RFI',
                        render: ({ RFI, _id, totalCount }) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === _id && reportSetting.action === "RFI") ||
                                            (reportSetting.position === _id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(_id, "RFI")}
                            >
                                {(Number(RFI) / (Number(totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(RFI) / (Number(totalCount) / 100)).toFixed(2)}
                            </p>
                        ),
                    },
                    {
                        accessor: 'vs RFI',
                        title: 'vs RFI',
                        render: (item: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === item._id && reportSetting.action === "vs RFI") ||
                                            (reportSetting.position === item._id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(item._id, "vs RFI")}
                            >
                                {(Number(item["vs RFI"]) / (Number(item.totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(item["vs RFI"]) / (Number(item.totalCount) / 100)).toFixed(2)}
                            </p>
                        ),
                    },
                    {
                        accessor: '3-Bet',
                        title: '3-Bet',
                        render: (item: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === item._id && reportSetting.action === "3-Bet") ||
                                            (reportSetting.position === item._id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(item._id, "3-Bet")}
                            >
                                {(Number(item["3-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(item["3-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2)}
                            </p>
                        )
                    },
                    {
                        accessor: 'vs 3-Bet',
                        title: 'vs 3-Bet',
                        render: (item: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === item._id && reportSetting.action === "vs 3-Bet") ||
                                            (reportSetting.position === item._id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(item._id, "vs 3-Bet")}
                            >
                                {(Number(item["vs 3-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(item["vs 3-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2)}
                            </p>
                        )
                    },
                    {
                        accessor: '4-Bet',
                        title: '4-Bet',
                        render: (item: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === item._id && reportSetting.action === "4-Bet") ||
                                            (reportSetting.position === item._id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(item._id, "4-Bet")}
                            >
                                {(Number(item["4-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(item["4-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2)}
                            </p>
                        )
                    },
                    {
                        accessor: 'vs 4-Bet',
                        title: 'vs 4-Bet',
                        render: (item: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === item._id && reportSetting.action === "vs 3-Bet") ||
                                            (reportSetting.position === item._id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(item._id, "vs 3-Bet")}
                            >
                                {(Number(item["vs 3-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(item["vs 3-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2)}
                            </p>
                        )
                    },
                    {
                        accessor: '5-Bet',
                        title: '5-Bet',
                        render: (item: any) => (
                            <p
                                className={
                                    clsx(
                                        "text-center hover:text-yellow-500 hover:text-[18px] transition-all",
                                        (reportSetting.position === item._id && reportSetting.action === "5-Bet") ||
                                            (reportSetting.position === item._id && reportSetting.action === "") ? "text-yellow-500" : ""
                                    )
                                }
                                onClick={() => setReportSetting(item._id, "5-Bet")}
                            >
                                {(Number(item["5-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2) === "0.00" ? "-" : (Number(item["5-Bet"]) / (Number(item.totalCount) / 100)).toFixed(2)}
                            </p>
                        )
                    },
                ]}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                minHeight={10}
            />
        </div>
    );
};

export default DetailStaticTable;
