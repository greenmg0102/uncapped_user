import Tippy from '@tippyjs/react';
import clsx from 'clsx'
import VillianPokerTable from './VillianPokerTable'
import { hero8Site, stackArray, villianPokerTable } from '../../../../../../utils/reference/playCardColor'
import { defaultReportSetting } from '../../../../../../utils/reference/reporting'
import { heroPositionValidation } from '../../../../../../utils/reference/heroPositionValidation'
import 'tippy.js/dist/tippy.css';

export default function Squeeze({ squeezeModal, setSqueezeModal, actionPoint, setValueStatus, arrayPoint, premiumStatus, valueStatus, setPremiumStatus, notification, squeezeSetting, setSqueezeSetting }: any) {

    const bufferPosition = (index: any) => {

        let availableHeroPostion = heroPositionValidation[valueStatus.action]

        // if (availableHeroPostion.some((item: any) => item === hero8Site[index]) === true) {
        if
            (
            //    availableHeroPostion.some((item: any) => item === hero8Site[index]) === true
            true
        ) {
            let currentAction = valueStatus.action
            if (valueStatus.heroPosition.some((currentHero: any) => currentHero === hero8Site[index])) {
                let real = valueStatus.heroPosition.filter((currentHero: any) => currentHero !== hero8Site[index])
                let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
                setValueStatus(realValueStatus)
                setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
            } else {

                let currentHeroPosition = valueStatus.heroPosition
                let real = [...currentHeroPosition, hero8Site[index]]

                let isMatch = checkMatch(defaultReportSetting.heroPosition, real);

                if (isMatch) {
                    let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
                    setValueStatus(realValueStatus)
                    setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
                } else {
                    notification('Range has been exceeded', 'info')
                }

                // let currentHeroPosition = valueStatus.heroPosition
                // let real = [...currentHeroPosition, hero8Site[index]]
                // let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
                // setValueStatus(realValueStatus)
                // setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
            }
        } else notification(`That position is not allow in ${valueStatus.action} `, 'error')

    }

    const bufferStack = (index: any) => {
        if (valueStatus.stackDepth.some((currentStack: any) => currentStack === index)) {
            let real = valueStatus.stackDepth.filter((currentStack: any) => currentStack !== index)
            arrayPoint("stackDepth", real)
            setPremiumStatus({ ...premiumStatus, stackDepth: real })
        } else {
            let currentStack = valueStatus.stackDepth
            let real = [...currentStack, index]

            let isMatch = stackMatch(defaultReportSetting.stackDepth, real);

            if (isMatch) {
                arrayPoint("stackDepth", real)
                setPremiumStatus({ ...premiumStatus, stackDepth: real })
            } else {
                notification('Range has been exceeded', 'info')
            }
        }
    }

    function checkMatch(heroPosition: any, randomArray: any) {
        for (let i = 0; i < heroPosition.length; i++) {
            const position = heroPosition[i];
            const stringList = position.stringList;
            let match = true;

            for (let j = 0; j < randomArray.length; j++) {
                if (!stringList.includes(randomArray[j])) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return true;
            }
        }
        return false;
    }

    function stackMatch(stackDepthList: any, randomArray: any) {
        for (let i = 0; i < stackDepthList.length; i++) {
            const position = stackDepthList[i];
            const valueList = position.valueList;
            let match = true;

            for (let j = 0; j < randomArray.length; j++) {
                if (!valueList.includes(randomArray[j] === 40 ? 398750 : randomArray[j])) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return true;
            }
        }
        return false;
    }


    // squeezeSetting = { squeezeSetting }
    // setSqueezeSetting = {(total: any) => setSqueezeSetting(total)

    return (
        <div className={
            clsx(
                "absolute transition-all bg-gray-900 opacity-[0.95] z-[2] border border-gray-600 rounded-[8px] overflow-hidden top-0 right-0",
                squeezeModal ? "w-full flex justify-between items-center flex-wrap pb-0 px-1 2xl:p-1 2xl:h-[203px]" : "w-0 h-0"
            )}
        >
            <div className='absolute flex justify-center items-center w-[45px] h-[45px] top-[0px] right-[5px]'>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="fullscreen-exit" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" className='hover:text-gray-200 text-primary cursor-pointer' onClick={() => setSqueezeModal(false)}>
                    <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
                </svg>
            </div>

            <div className='w-full flex justify-between items-start flex-wrap'>
                <div className='w-full 2xl:w-2/3 p-0 2xl:p-2 flex justify-between items-start'>
                    <div className='w-[40%]'>
                        {/* <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[8px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                Action
                            </p>
                            <Tippy trigger="click" content="Define the Action">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div> */}
                        <div>
                            <div className='flex justify-between items-center mt-[1px] mb-0 p-1 pt-2 pb-[9px]'>
                                <p className='w-[40%] text-center font-bold text-[16px] text-gray-300 mb-0'>
                                    Squeeze
                                </p>
                                <p className='w-[60%] text-center font-bold text-[16px] text-gray-300 mb-0'>
                                    VS Squ
                                </p>
                            </div>
                            <div className='flex justify-between items-start'>
                                <div
                                    className={clsx("mb-1 w-[40%] p-[1px] transition-all cursor-pointer")}
                                >
                                    {defaultReportSetting.squeezeAction.squeeze.map((item: any, index: any) =>
                                        <div
                                            key={index}
                                            className={clsx(
                                                '2xl:p-[5.5px] rounded-tl-[4px] rounded-bl-[4px] transition-all mb-[6px]',
                                                squeezeSetting.squeeze === item ? "bg-gray-500 text-gray-100" : " bg-gray-800"
                                            )}
                                            onClick={() => setSqueezeSetting({ ...squeezeSetting, squeeze: squeezeSetting.squeeze === item ? null : item })}
                                        >
                                            <p className='text-center'>{item}</p>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={clsx("mb-1 w-[60%] p-[1px] transition-all cursor-pointer")}
                                >
                                    {defaultReportSetting.squeezeAction.action.map((item: any, index: any) =>
                                        <div
                                            key={index}
                                            className={clsx(
                                                '2xl:p-[5.5px] rounded-tr-[4px] rounded-br-[4px] transition-all mb-[6px]',
                                                squeezeSetting.squeezeAction === item.value ? "bg-gray-500 text-gray-100" : " bg-gray-800"
                                            )}
                                            onClick={() => setSqueezeSetting({ ...squeezeSetting, squeezeAction: squeezeSetting.squeezeAction === item.value ? null : item.value })}
                                        >
                                            <p className='text-center'>{item.value}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div className={
                                clsx(
                                    'flex justify-between items-center flex-wrap rounded-[4px]',
                                    premiumStatus.action === "" ? "border border-dashed" : "text-gray-600"
                                )}
                            >
                                {defaultReportSetting.action.map((item: any, index: any) =>
                                    <Tippy key={index} content={index}>
                                        <div className={clsx("mb-1 w-1/3 rounded-[4px] p-[1px] transition-all cursor-pointer bg-gray-900")}>
                                            <div
                                                className={clsx('p-[4px] 2xl:p-[4px] 2xl:p-[6px] rounded-[4px] transition-all', premiumStatus.action === item.title ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                                onClick={() => actionPoint(item.title)}
                                            >
                                                <p className='text-center'>{item.title}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div> */}
                    </div>
                    <div className='w-[30%]'>
                        <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                Hero Pos
                            </p>
                            <Tippy trigger="click" content="Define the Hero's Position">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div>
                        <div className='flex justify-between items-center flex-wrap'>
                            {Object.keys(hero8Site).map((key: any, index: any) =>
                                <Tippy key={index} content={hero8Site[key]}>
                                    <div
                                        className={clsx("mb-[5px] w-1/2 p-[1px] transition-all cursor-pointer")}
                                    >
                                        <div
                                            className={clsx('2xl:p-[5.5px] rounded-[4px] transition-all', premiumStatus.heroPosition.includes(hero8Site[index]) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                            onClick={() => bufferPosition(index)}
                                        >

                                            <p className='text-center'>{hero8Site[key]}</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div>
                    <div className='w-[30%]'>
                        <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[8px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                Stack Dep
                            </p>
                            <Tippy trigger="click" content="Define the Stack Depth">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div>
                        <div className='flex justify-between items-center flex-wrap'>

                            {stackArray.map((item: any) =>
                                <Tippy key={item} content={item}>
                                    <div className={clsx("mb-1 w-1/2 p-[1px] transition-all cursor-pointer")}>
                                        <div
                                            className={clsx('p-[0.5px] 2xl:p-[2px] rounded-[4px] transition-all', premiumStatus.stackDepth.includes(item) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                            onClick={() => bufferStack(item)}
                                        >
                                            <p className='text-center'>{item} bb</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full 2xl:w-1/3 p-2 pt-0'>
                    <VillianPokerTable
                        premiumStatus={premiumStatus}
                        villianPokerTable={villianPokerTable}
                        setPremiumStatus={(total: any) => {
                            arrayPoint("VillianPosition", total.VillianPosition.map((villin: any) => hero8Site[villin]))
                            setPremiumStatus(total)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}