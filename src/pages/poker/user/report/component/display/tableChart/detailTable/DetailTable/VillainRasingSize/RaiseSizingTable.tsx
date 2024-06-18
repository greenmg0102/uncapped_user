import { DataTable } from 'mantine-datatable';
import './raiseSizing.css'
import clsx from 'clsx'
import { detailTablePosition } from '../../../../../../../../../../utils/reference/playCardColor'

function RaiseSizingTable({ actionType, stackDepth, raiseSizingData, raiseSizingTable }: any) {

    const extractingHand = (field: any, position: any) => {
        console.log('"extractingHand', field, position);

        raiseSizingTable("villain", field, position, actionType, stackDepth)
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
                        accessor: actionType.includes("all in") ? '10bballin' : '2bb',
                        title: actionType.includes("all in") ? '<10bb' : '2.00x ~ 2.49x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '10bballin' : '2bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '10bballin' : '2bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '10bballin' : '2bb']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: actionType.includes("all in") ? '20bballin' : '25bb',
                        title: actionType.includes("all in") ? '11-20bb' : '2.50x ~ 2.99x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '20bballin' : '25bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '20bballin' : '25bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '20bballin' : '25bb']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: actionType.includes("all in") ? '30bballin' : '3bb',
                        title: actionType.includes("all in") ? '21bb-30bb' : '3.00x ~ 3.49x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '30bballin' : '3bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '30bballin' : '3bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '30bballin' : '3bb']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: actionType.includes("all in") ? '40bballin' : '35bb',
                        title: actionType.includes("all in") ? '31bb-40bb' : '3.50x ~ 3.99x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '40bballin' : '35bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '40bballin' : '35bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '40bballin' : '35bb']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: actionType.includes("all in") ? '50bballin' : '4bb',
                        title: actionType.includes("all in") ? '41-50bb' : '4.00x ~ 4.49x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '50bballin' : '4bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '50bballin' : '4bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '50bballin' : '4bb']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: actionType.includes("all in") ? '60bballin' : '45bb',
                        title: actionType.includes("all in") ? '51-60bb' : '4.50x ~ 5.00x',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '60bballin' : '45bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '60bballin' : '45bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '60bballin' : '45bb']}
                                </p>
                            </div>
                        )
                    },
                    {
                        accessor: actionType.includes("all in") ? '61bballin' : '501bb',
                        title: actionType.includes("all in") ? '>61bb' : '5.01 x +',
                        render: (data: any) => (
                            <div className='flex justify-center items-end'>
                                <p
                                    className={
                                        clsx(
                                            'hover:cursor-pointer hover:text-yellow-500 transition-all mr-[2px]',
                                            data && data[actionType.includes("all in") ? '61bballin' : '501bb'] === 0 ? "" : "text-green-500"
                                        )
                                    }
                                    onClick={() => extractingHand(actionType.includes("all in") ? '61bballin' : '501bb', data["_id"])}
                                >
                                    {data && data[actionType.includes("all in") ? '61bballin' : '501bb']}
                                </p>
                            </div>
                        )
                    }
                ]}
                minHeight={200}
            />
        </div >
    )

}

export default RaiseSizingTable