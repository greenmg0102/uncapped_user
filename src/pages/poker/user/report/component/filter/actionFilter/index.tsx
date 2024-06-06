import { useState } from "react"

import GeneralPanel from "./generalPanel"
import PremiumPanel from "./premiumPanel"
import SqueezePanel from "./squeezePanel"


export default function ActionFilter({ setValueStatus, valueStatus, heroPosition, stackDepth, VillianPosition, bufferRportingStatue }: any) {

    const [panelStatus, setPanelStatus] = useState(0)

    return (
        <div className="w-full xl:w-1/2 border border-gray-500 border-t-[0px] border-b-[1px] border-l-[0px] border-r-[0px] xl:border-r-[1px] xl:border-b-[0px] p-2">

            {panelStatus === 0 &&
                <GeneralPanel
                    valueStatus={valueStatus}
                    setValueStatus={(total: any) => setValueStatus(total)}
                    changeStatus={(status: any) => setPanelStatus(status)}
                />}
            {panelStatus === 1 &&
                <PremiumPanel
                    valueStatus={valueStatus}
                    setValueStatus={(total: any) => setValueStatus(total)}
                    changeStatus={(status: any) => setPanelStatus(status)}
                    bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}

                    heroPosition={heroPosition}
                    stackDepth={stackDepth}
                    VillianPosition={VillianPosition}
                />}
            {panelStatus === 2 &&
                <SqueezePanel
                    valueStatus={valueStatus}
                    setValueStatus={(total: any) => setValueStatus(total)}
                    changeStatus={(status: any) => setPanelStatus(status)}
                />}

        </div>
    )
}