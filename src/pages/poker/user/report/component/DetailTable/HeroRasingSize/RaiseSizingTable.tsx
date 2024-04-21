import { DataTable } from 'mantine-datatable';
import './raiseSizing.css'
import { detailTablePosition } from '../../../../../../../utils/reference/playCardColor'

function RaiseSizingTable({ actionType, stackDepth, raiseSizingData, raiseSizingTable }: any) {


    const extractingHand = (field: any, position: any) => {
        raiseSizingTable("Hero", field, position, actionType, stackDepth)
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
                    { accessor: '2bb', title: '2.00x ~ 2.49x' },
                    { accessor: '25bb', title: '2.50x ~ 2.99x' },
                    { accessor: '3bb', title: '3.00x ~ 3.49x' },
                    { accessor: '35bb', title: '3.50x ~ 3.99x' },
                    { accessor: '4bb', title: '4.00x ~ 4.49x' },
                    { accessor: '45bb', title: '4.50x ~ 5.00x' },
                    {
                        accessor: '501bb',
                        title: '5.01 x +',
                        render: (data: any) => (
                            <p
                                className='hover:cursor-pointer hover:text-yellow-500 transition-all'
                                onClick={() => extractingHand("501bb", data["_id"])}
                            >
                                {data["501bb"]}
                            </p>
                        )
                    },

                ]}
                minHeight={200}
            />
        </div >
    )
}

export default RaiseSizingTable