import { useState } from "react"

import GeneralPanel from "./generalPanel"
import PremiumPanel from "./premiumPanel"
import SqueezePanel from "./squeezePanel"

export default function ActionFilter({ squeezePanel, setSqueezePanel, actionLit, setActionList, squeezeSetting, setSqueezeSetting, setValueStatus, valueStatus, heroPosition, stackDepth, VillianPosition, bufferRportingStatue, premiumStatus, setPremiumStatus }: any) {

    const [panelStatus, setPanelStatus] = useState(0)

    return (
        <div className="w-full xl:w-1/2 border border-gray-500 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[0px] xl:border-r-[1px] xl:border-b-[0px] p-2 pl-2 xl:pl-0">

            {panelStatus === 0 &&
                <GeneralPanel
                    valueStatus={valueStatus}
                    setValueStatus={(total: any) => setValueStatus(total)}
                    changeStatus={(status: any) => setPanelStatus(status)}
                />
            }

            {panelStatus === 1 &&
                <PremiumPanel
                    valueStatus={valueStatus}
                    setValueStatus={(total: any) => setValueStatus(total)}
                    changeStatus={(status: any) => setPanelStatus(status)}
                    bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

                    heroPosition={heroPosition}
                    stackDepth={stackDepth}
                    VillianPosition={VillianPosition}
                />
            }
            
            {panelStatus === 2 &&
                <SqueezePanel
                    squeezePanel={squeezePanel}
                    setSqueezePanel={(total: any) => setSqueezePanel(total)}

                    actionLit={actionLit}
                    setActionList={(total: any) => setActionList(total)}

                    premiumStatus={premiumStatus}
                    setPremiumStatus={(total: any) => setPremiumStatus(total)}

                    squeezeSetting={squeezeSetting}
                    setSqueezeSetting={(total: any) => setSqueezeSetting(total)}

                    valueStatus={valueStatus}
                    setValueStatus={(total: any) => setValueStatus(total)}
                    changeStatus={(status: any) => setPanelStatus(status)}
                />
            }

        </div>
    )
}