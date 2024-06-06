
import { playCardArray } from '../../../../../../../../utils/reference'
import CompareHeatItemUser from "./CompareHeatItemUser"
import { defineOpacity } from '../../../../../../../../utils/actionValidation/reporting/defineOpacity'
import { pokerStreetOptionExample } from '../../../../../../../../utils/reference/playCardColor'

export default function UserHand({ userTab, userInfoResult, reportItemActive, setReportItemActive, setInterestingPair }: any) {

    return (
        <div className="w-full lg:w-1/2">
            {Object.keys(userInfoResult).length > 0 ?
                <div className='flex justify-start flex-wrap'>
                    {
                        playCardArray.map((item: any, index: any) =>
                            <div
                                key={index}
                                className='cursor-pointer'
                                style={{ width: "7.692%", padding: "1px" }}
                            >
                                <CompareHeatItemUser
                                    data={item}
                                    userTab={userTab}
                                    definite={defineOpacity(userInfoResult)}
                                    handResult={userInfoResult[item]}
                                    reportItemActive={reportItemActive}
                                    standard={pokerStreetOptionExample[userTab]}
                                    setInterestingPair={(pair: any) => setInterestingPair(pair)}
                                    bufferSetReportItemActive={(item: any) => setReportItemActive(item)}
                                />
                            </div>
                        )
                    }
                </div>
                :
                <div className='h-[250px] sm:h-[450px] flex flex-col justify-center items-center w-full'>
                    <svg version="1.1" id="Layer_1" className='w-32' fill="#00cf55" x="0px" y="0px" viewBox="0 0 122.88 117.85"><g><path d="M60.05,68.41L18.02,46.33L6.2,60.47c14.91,7.88,29.82,15.76,44.74,23.65L60.05,68.41L60.05,68.41z M63.3,23.47L21.12,44.39 L62.24,66l41.2-21.65L79.81,31.99L63.3,23.47L63.3,23.47z M15.89,43.95L0.39,29.27c-0.57-0.65-0.51-1.65,0.15-2.23 c0.09-0.08,0.2-0.15,0.3-0.21L47.95,0.18c0.75-0.4,1.68-0.12,2.1,0.61l13.23,18.22L72.1,2.49c0.41-0.77,1.36-1.07,2.13-0.66 l47.8,25.27c0.14,0.08,0.27,0.17,0.39,0.29c0.61,0.62,0.6,1.62-0.02,2.23l-14.16,13.91l13.71,16.41c0.56,0.67,0.47,1.67-0.2,2.22 c-0.1,0.08-0.21,0.15-0.32,0.21l-12.31,6.51v24.4c0,0.66-0.4,1.22-0.98,1.46l-44.51,22.59c-0.29,0.32-0.71,0.52-1.17,0.52 c-0.62,0-1.15-0.35-1.41-0.87l-44.59-22.3c-0.55-0.28-0.87-0.83-0.87-1.41L15.59,69L3.05,62.37c-0.11-0.06-0.22-0.13-0.32-0.21 c-0.67-0.56-0.76-1.56-0.2-2.22L15.89,43.95L15.89,43.95z M60.84,21.06L48.11,3.67L4.07,28.7L18.46,42.1L60.84,21.06L60.84,21.06z M65.75,21.08l14.75,7.72l25.08,12.93l13.07-12.84L74.15,5.35L65.75,21.08L65.75,21.08z M106.47,46.33L64.44,68.41l9.11,15.7 l44.74-23.65L106.47,46.33L106.47,46.33z" /></g></svg>
                    <p className='text-[20px] mt-4'>There is no data which be matched with filtering option</p>
                </div>
            }
        </div>
    )
}