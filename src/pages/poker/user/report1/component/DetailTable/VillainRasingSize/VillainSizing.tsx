import RaiseSizingTable from './RaiseSizingTable'

function VillainSizing({ actionType, stackDepth, raiseSizingData, raiseSizingTable }: any) {

    return (
        <div className="w-full">
            <div className="flex justify-center w-full">
                <div className="w-4/5">
                    <RaiseSizingTable
                        actionType={actionType}
                        stackDepth={stackDepth}
                        raiseSizingData={raiseSizingData}
                        raiseSizingTable={(type: any, field: any, position: any, actionType: any, stackDepth: any) => raiseSizingTable(type, field, position, actionType, stackDepth)}
                    />
                </div>
            </div>
        </div>
    )
}

export default VillainSizing