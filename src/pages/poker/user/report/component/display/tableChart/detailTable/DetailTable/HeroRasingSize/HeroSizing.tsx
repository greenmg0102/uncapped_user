import RaiseSizingTable from './RaiseSizingTable'


function HeroSizing({ actionType, stackDepth, raiseSizingData, raiseSizingTable }: any) {

    return (
        <div className="w-full">
            <div className="flex justify-center w-full">
                    <RaiseSizingTable
                        actionType={actionType}
                        stackDepth={stackDepth}
                        raiseSizingData={raiseSizingData}
                        raiseSizingTable={(type: any, field: any, position: any, actionType: any, stackDepth: any) => raiseSizingTable(type, field, position, actionType, stackDepth)}
                    />
            </div>
        </div >
    )
}

export default HeroSizing