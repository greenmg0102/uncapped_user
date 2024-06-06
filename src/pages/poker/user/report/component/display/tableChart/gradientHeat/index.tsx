import PreflopChart from "./preflopChart"
import UserHand from "./userHand"


export default function GradientHeat() {

    return (
        <div className="flex justify-between items-start flex-wrap">
            <PreflopChart />
            <UserHand />
        </div>
    )
}