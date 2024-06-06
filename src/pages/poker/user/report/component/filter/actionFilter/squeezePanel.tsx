import PanelItem from "./panelItem"


export default function SqueezePanel({ changeStatus, setValueStatus, valueStatus }: any) {

    return (
        <>
            <div className="flex items-start flex-wrap">
                <div className="w-full lg:w-2/5">
                    <center className="font-bold text-gray-200 text-[15px]">Action</center>
                    <div className=" flex justify-between flex-wrap mt-2">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any, index: any) =>
                                <div className="w-1/3">
                                    <PanelItem key={index} value={item} height={30} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="w-full lg:w-3/5 flex mt-4 lg:my-0">
                    <div className="w-1/3">
                        <center className="font-bold text-gray-200 text-[15px]">Hero Pos</center>
                        <div className=" flex flex-col justify-between mt-2">
                            {
                                [1, 2, 3, 4].map((item: any, index: any) =>
                                    <PanelItem key={index} value={item} height={30} />
                                )
                            }
                        </div>
                    </div>
                    <div className="w-1/3">
                        <center className="font-bold text-gray-200 text-[15px]">Stack Dep</center>
                        <div className=" flex flex-col justify-between mt-2">
                            {
                                [1, 2, 3].map((item: any, index: any) =>
                                    <PanelItem key={index} value={item} height={30} />
                                )
                            }
                        </div>
                    </div>
                    <div className="w-1/3">
                        <center className="font-bold text-gray-200 text-[15px]">Villain Pos</center>
                        <div className=" flex flex-col justify-between mt-2">
                            {
                                [1, 2, 3, 4].map((item: any, index: any) =>
                                    <PanelItem key={index} value={item} height={30} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-around items-center mt-4">
                <div
                    className="border border-blue-500 transition-all hover:border-blue-200 hover:text-blue-200 rounded-[4px] text-center text-blue-500 py-[4px] w-[200px] cursor-pointer"
                    onClick={() => changeStatus(1)}
                >
                    Back
                </div>
            </div>
        </>
    )
}