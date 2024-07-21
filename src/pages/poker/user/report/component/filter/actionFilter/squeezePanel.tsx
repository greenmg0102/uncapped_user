import Squeeze from './Squeeze'


export default function SqueezePanel({ squeezePanel, setSqueezePanel, actionLit, setActionList, squeezeSetting, setSqueezeSetting, premiumStatus, setPremiumStatus, changeStatus, setValueStatus, valueStatus }: any) {

    const bufferAction = (title: any) => {
        let realValueStatus = { action: title, heroPosition: [], stackDepth: [], VillianPosition: [] }
        // actionPoint(realValueStatus)
        setPremiumStatus({ ...premiumStatus, action: title, heroPosition: [], stackDepth: [], VillianPosition: [] })
    }

    return (
        <>
            <Squeeze
                squeezePanel={squeezePanel}
                setSqueezePanel={(total: any) => setSqueezePanel(total)}

                actionLit={actionLit}
                setActionList={(total: any) => setActionList(total)}
                valueStatus={valueStatus}
                premiumStatus={premiumStatus}
                squeezeModal={true}
                squeezeSetting={squeezeSetting}
                setValueStatus={(total: any) => setValueStatus(total)}
                setPremiumStatus={(total: any) => setPremiumStatus(total)}
                setSqueezeSetting={(total: any) => setSqueezeSetting(total)}
                setSqueezeModal={(bool: boolean) => console.log(bool)}
                actionPoint={(premiumAction: any) => bufferAction(premiumAction)}
                // arrayPoint={(type: any, premiumArry: any) => arrayPoint(type, premiumArry)}
                // notification={(message: any, color: any) => notification(message, color)}
            />
            <div className="flex justify-around items-center mt-0">
                <div
                    className="border border-blue-500 transition-all hover:border-blue-200 hover:text-blue-200 rounded-[4px] text-center text-blue-500 py-[4px] w-[200px] cursor-pointer"
                    onClick={() => changeStatus(1)}
                >
                    Back (Premium)
                </div>
            </div>
        </>
    )
}