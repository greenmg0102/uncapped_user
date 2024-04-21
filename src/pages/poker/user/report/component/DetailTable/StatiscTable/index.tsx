import { useState, useEffect } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import clsx from 'clsx'
import sortBy from 'lodash/sortBy';
import CircleChart from "./CircleChart"
import DetailStaticTable from './DetailStaticTable'
import "../detailStyle.css"

const StatisTable = ({ reportSetting, setReportSetting, detailedTable }: any) => {

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
        <div>
            {
                detailedTable.length === 0 ?
                    <div className='h-[250px] sm:h-[450px] flex flex-col justify-center items-center w-full'>
                        <svg className='w-24' fill="#00cf55" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 412 511.56"><path fillRule="nonzero" d="M32.24 0h229.59a9.06 9.06 0 016.77 3.04l140.63 136.27a8.971 8.971 0 012.74 6.48h.03V479.32c0 8.83-3.63 16.88-9.47 22.74l-.05.05c-5.86 5.83-13.9 9.45-22.72 9.45H32.24c-8.87 0-16.94-3.63-22.78-9.47C3.63 496.26 0 488.19 0 479.32V32.24C0 23.37 3.63 15.3 9.46 9.46 15.3 3.63 23.37 0 32.24 0zm56.24 414.35c-5.01 0-9.08-4.06-9.08-9.07 0-5.01 4.07-9.08 9.08-9.08h235.04c5.01 0 9.07 4.07 9.07 9.08s-4.06 9.07-9.07 9.07H88.48zm0-74.22c-5.01 0-9.08-4.06-9.08-9.07 0-5.01 4.07-9.08 9.08-9.08h231.38c5.01 0 9.08 4.07 9.08 9.08s-4.07 9.07-9.08 9.07H88.48zm0-74.22c-5.01 0-9.08-4.07-9.08-9.08s4.07-9.07 9.08-9.07H275.7c5.01 0 9.08 4.06 9.08 9.07 0 5.01-4.07 9.08-9.08 9.08H88.48zm0-74.23c-5.01 0-9.08-4.06-9.08-9.07 0-5.01 4.07-9.08 9.08-9.08h114.45c5.01 0 9.07 4.07 9.07 9.08s-4.06 9.07-9.07 9.07H88.48zm0-74.22c-5.01 0-9.08-4.06-9.08-9.07a9.08 9.08 0 019.08-9.08h56.29a9.08 9.08 0 019.08 9.08c0 5.01-4.07 9.07-9.08 9.07H88.48zm176.37-92.85v114.4h118.07L264.85 24.61zm129 132.55H255.78c-5.01 0-9.08-4.07-9.08-9.08V18.15H32.24c-3.86 0-7.39 1.59-9.95 4.15-2.55 2.55-4.14 6.08-4.14 9.94v447.08c0 3.86 1.59 7.39 4.14 9.94 2.56 2.56 6.09 4.15 9.95 4.15h347.52c3.89 0 7.41-1.58 9.94-4.11l.04-.04c2.53-2.53 4.11-6.05 4.11-9.94V157.16z" /></svg>
                        <p className='text-[20px] mt-4'>You need to seelct any filtering option.</p>
                    </div>
                    :
                    <div className="flex justify-between items-start flex-wrap border border-gray-900 p-[4px] rounded-[12px]">

                        <div className="w-full md:w-1/4 p-[4px] grid grid-cols-1 gap-4 content-between">
                            <div className="w-full flex justify-center items-center">
                                <CircleChart luckWheel={luckWheel} />
                            </div>
                        </div>

                        <div className="w-full md:w-3/4 p-[4px]">
                            <DetailStaticTable
                                reportSetting={reportSetting}
                                setReportSetting={setReportSetting}
                                detailedTable={detailedTable}
                            />
                        </div>
                    </div>
            }
        </div>
    );
};

export default StatisTable;
