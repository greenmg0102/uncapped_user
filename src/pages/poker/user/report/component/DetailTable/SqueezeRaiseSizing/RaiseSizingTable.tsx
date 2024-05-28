import { DataTable } from 'mantine-datatable';
import './raiseSizing.css'
import clsx from 'clsx'
import { detailTablePosition } from '../../../../../../../utils/reference/playCardColor'

function RaiseSizingTable({ actionType, stackDepth, raiseSizingData, raiseSizingTable }: any) {

    const extractingHand = (field: any, position: any) => {
        raiseSizingTable("Suqeeze", field, position, actionType, stackDepth)
    }

    return (
        <div className="w-full datatables">
            <DataTable
                noRecordsText="No results match your search query"
                highlightOnHover
                className="whitespace-nowrap table-hover"
                records={raiseSizingData}
                columns={[
                    {
                        accessor: '_id',
                        title: 'Position',
                        render: ({ _id }: any) => (
                            <p>
                                {detailTablePosition[_id]}
                            </p>
                        )
                    },
                    {
                        accessor: '1squeeze',
                        title: '1.0x ~ 2.99x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['1squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('1squeeze', data["_id"])}
                                >
                                    {data && data['1squeeze']}
                                </p>

                            </div>
                        )
                    },
                    {
                        accessor: '3squeeze',
                        title: '3.0x ~ 3.49x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['3squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('3squeeze', data["_id"])}
                                >
                                    {data && data['3squeeze']}
                                </p>

                            </div>
                        )
                    },
                    {
                        accessor: '35squeeze',
                        title: '3.5x ~ 3.99x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['35squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('35squeeze', data["_id"])}
                                >
                                    {data && data['35squeeze']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: '4squeeze',
                        title: '4.0x ~ 4.49x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['4squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('4squeeze', data["_id"])}
                                >
                                    {data && data['4squeeze']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: '45squeeze',
                        title: '4.5x ~ 4.99x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['45squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('45squeeze', data["_id"])}
                                >
                                    {data && data['45squeeze']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: '5squeeze',
                        title: '5.0x ~ 5.49x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['5squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('5squeeze', data["_id"])}
                                >
                                    {data && data['5squeeze']}
                                </p>

                            </div>
                        )
                    },
                    {
                        accessor: '55squeeze',
                        title: '5.5x ~ 5.99x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['55squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('55squeeze', data["_id"])}
                                >
                                    {data && data['55squeeze']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: '6squeeze',
                        title: '6.0x +',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data['6squeeze'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand('6squeeze', data["_id"])}
                                >
                                    {data && data['6squeeze']}
                                </p>
                            </div>
                        )
                    },
                ]}
                minHeight={200}
            />
        </div>
    )
}

export default RaiseSizingTable