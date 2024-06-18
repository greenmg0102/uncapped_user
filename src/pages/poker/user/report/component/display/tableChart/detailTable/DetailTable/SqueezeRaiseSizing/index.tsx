import { useState, useEffect } from 'react'
import SqueezeSizing from './SqueezeSizing'
import { defaultReportSetting } from '../../../../../../../../../../utils/reference/reporting'
import { squeezeRaisingSize } from '../../../../../../../../../../utils/functions/user/report/RaiseSizing'

export default function SqueezeRaiseSizing({ filter, raiseSizingTable }: any) {

    const [actionType] = useState("squeeze")
    const [stackDepth, setStackDepth] = useState("Shallow Stack")

    const [raiseSizingData, setRaiseSizingData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const data = {
                actionType: actionType,
                stackDepth: stackDepth,
                ...filter
            }
            let result = await squeezeRaisingSize(data)

            result.sort((a: any, b: any) => { if (a._id < b._id) return -1; });
            setRaiseSizingData(result)
        }
        fetchData()
    }, [actionType, stackDepth])

    return (
        <div>
            <div className='flex justify-around items-center flex-wrap my-2 mx-auto w-[600px]'>
                <select
                    className="form-select text-white-dark w-[150px] mb-2"
                    value={stackDepth}
                    onChange={(e: any) => setStackDepth(e.target.value)}
                    required
                >
                    {defaultReportSetting.stackDepth.reverse().map((item: any, index: any) =>
                        <option key={index} value={item.title}>{item.title}</option>
                    )}
                </select>
            </div>
            <div className='w-full flex justify-center items-center my-4 mt-2 px-2'>
                <SqueezeSizing
                    actionType={actionType}
                    stackDepth={stackDepth}
                    raiseSizingData={raiseSizingData}
                    raiseSizingTable={(type: any, field: any, position: any, actionType: any, stackDepth: any) => raiseSizingTable(type, field, position, actionType, stackDepth)}
                />
            </div>
        </div>
    )
}