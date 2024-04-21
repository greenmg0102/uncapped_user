import Tippy from '@tippyjs/react';
import clsx from 'clsx'
import { useState, useEffect } from 'react';
import VillianPokerTable from './VillianPokerTable'
import { hero8Site, stackArray, villianPokerTable, RFIPosition, coldRFIPosition, CallerPosition, BET3Position, coldBET3Position, coldCallerPosition } from '../../../../../../utils/reference/playCardColor'
import { defaultReportSetting } from '../../../../../../utils/reference/reporting'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { heroPositionValidation } from '../../../../../../utils/reference/heroPositionValidation'
import { makingRange, availableHeroPosition, keyExtract, allowKey, makingColdRange, extractingMaximumPosition } from '../../../../../../utils/actionValidation/reporting/makingRange'
import 'tippy.js/dist/tippy.css';

export default function Squeeze({ squeezePanel, setSqueezePanel, actionLit, setActionList, squeezeModal, setSqueezeModal, actionPoint, setValueStatus, arrayPoint, premiumStatus, valueStatus, setPremiumStatus, notification, squeezeSetting, setSqueezeSetting }: any) {

    // const bufferPosition = (index: any) => {

    //     let availableHeroPostion = heroPositionValidation[valueStatus.action]

    //     // if (availableHeroPostion.some((item: any) => item === hero8Site[index]) === true) {
    //     if
    //         (
    //         //    availableHeroPostion.some((item: any) => item === hero8Site[index]) === true
    //         true
    //     ) {
    //         let currentAction = valueStatus.action
    //         if (valueStatus.heroPosition.some((currentHero: any) => currentHero === hero8Site[index])) {
    //             let real = valueStatus.heroPosition.filter((currentHero: any) => currentHero !== hero8Site[index])
    //             let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
    //             setValueStatus(realValueStatus)
    //             setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
    //         } else {

    //             let currentHeroPosition = valueStatus.heroPosition
    //             let real = [...currentHeroPosition, hero8Site[index]]

    //             let isMatch = checkMatch(defaultReportSetting.heroPosition, real);

    //             if (isMatch) {
    //                 let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
    //                 setValueStatus(realValueStatus)
    //                 setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
    //             } else {
    //                 notification('Range has been exceeded', 'info')
    //             }

    //             // let currentHeroPosition = valueStatus.heroPosition
    //             // let real = [...currentHeroPosition, hero8Site[index]]
    //             // let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
    //             // setValueStatus(realValueStatus)
    //             // setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
    //         }
    //     } else notification(`That position is not allow in ${valueStatus.action} `, 'error')

    // }

    // const bufferStack = (index: any) => {
    //     if (valueStatus.stackDepth.some((currentStack: any) => currentStack === index)) {
    //         let real = valueStatus.stackDepth.filter((currentStack: any) => currentStack !== index)
    //         arrayPoint("stackDepth", real)
    //         setPremiumStatus({ ...premiumStatus, stackDepth: real })
    //     } else {
    //         let currentStack = valueStatus.stackDepth
    //         let real = [...currentStack, index]

    //         let isMatch = stackMatch(defaultReportSetting.stackDepth, real);

    //         if (isMatch) {
    //             arrayPoint("stackDepth", real)
    //             setPremiumStatus({ ...premiumStatus, stackDepth: real })
    //         } else {
    //             notification('Range has been exceeded', 'info')
    //         }
    //     }
    // }

    // function checkMatch(heroPosition: any, randomArray: any) {
    //     for (let i = 0; i < heroPosition.length; i++) {
    //         const position = heroPosition[i];
    //         const stringList = position.stringList;
    //         let match = true;

    //         for (let j = 0; j < randomArray.length; j++) {
    //             if (!stringList.includes(randomArray[j])) {
    //                 match = false;
    //                 break;
    //             }
    //         }
    //         if (match) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function stackMatch(stackDepthList: any, randomArray: any) {
    //     for (let i = 0; i < stackDepthList.length; i++) {
    //         const position = stackDepthList[i];
    //         const valueList = position.valueList;
    //         let match = true;

    //         for (let j = 0; j < randomArray.length; j++) {
    //             if (!valueList.includes(randomArray[j] === 40 ? 398750 : randomArray[j])) {
    //                 match = false;
    //                 break;
    //             }
    //         }
    //         if (match) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // squeezeSetting = { squeezeSetting }
    // setSqueezeSetting = {(total: any) => setSqueezeSetting(total)

    const MySwal = withReactContent(Swal);

    const [settingStatus, setSettingStatus] = useState<any>({
        type: undefined,
        RFIPosition: {},
        CallerPosition: {},
        BET3Position: {},
        hero8Site: {},
    })

    // useEffect(() => {
    //     setSettingStatus({
    //         ...settingStatus,
    //         type: undefined,
    //         // RFIPosition: coldRFIPosition,
    //         // CallerPosition: coldCallerPosition,
    //         // BET3Position: coldBET3Position,
    //         // hero8Site: hero8Site,
    //     })
    // }, [])

    const handleSqueeze = (type: any, value: any) => {

        let real = squeezePanel

        console.log("real", real);
        console.log("type", type);
        console.log("value", value);
        

        if (type === "type") {
            setSettingStatus({
                ...settingStatus,
                type: value,
                RFIPosition: value === "Cold" ? coldRFIPosition : RFIPosition,
                CallerPosition: {},
                BET3Position: {},
                hero8Site: {}
            })
            setSqueezePanel({
                ...real,
                type: value,
                RFI: undefined,
                caller: [],
                bet3: undefined,
                hero: [],
            })
        } else if (type === "RFI") {

            if (squeezePanel.RFI === value) setSettingStatus({
                ...settingStatus,
                CallerPosition: settingStatus.type === "Cold" ? coldCallerPosition : CallerPosition,
                BET3Position: {},
                hero8Site: {}
            })
            else {
                let limit = keyExtract(settingStatus.type === "Cold" ? coldRFIPosition : RFIPosition, value)
                let result = allowKey(settingStatus.type === "Cold" ? coldCallerPosition : CallerPosition, limit)
                setSettingStatus({
                    ...settingStatus,
                    CallerPosition: result,
                    BET3Position: {},
                    hero8Site: {}
                })
            }

            setSqueezePanel({
                ...real,
                RFI: squeezePanel.RFI === value ? undefined : value,
                caller: [],
                bet3: undefined,
                hero: [],
            })

            let data = squeezePanel
            data.RFI = value

            let range = makingColdRange(data)
            setActionList(range)

        } else if (type === "caller") {

            if (squeezePanel.caller.some((item: any) => item === value)) {
                callerProcess(value)
            } else {
                if (squeezePanel.caller.length < 2) {
                    callerProcess(value)
                } else {
                    messageNotification("We limit caller as 2 players.")
                }
            }

        } else if (type === "bet3") {

            setSqueezePanel({
                ...real,
                bet3: squeezePanel.bet3 === value ? undefined : value,
                hero: [],
            })
            let bufferReal: any = squeezePanel
            bufferReal.bet3 = value

            let result = availableHeroPosition(bufferReal)
            setSettingStatus({
                ...settingStatus,
                hero8Site: result
            })

            let data = squeezePanel
            data.bet3 = value

            let range = makingColdRange(data)
            setActionList(range)

        } else if (type === "hero") {
            setSqueezePanel({
                ...real,
                hero: squeezePanel.hero.some((item: any) => item === value) ? squeezePanel.hero.filter((item: any) => item !== value) : [...squeezePanel.hero, value],
            })

            let data = squeezePanel
            data.hero = [value]

            let range = makingColdRange(data)
            setActionList(range)
        }
    }

    const messageNotification = (message: any) => {
        MySwal.fire({
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true,
            customClass: { popup: "color-info" }
        });
    }

    const callerProcess = (value: any) => {

        let bufferCallerList = squeezePanel.caller.some((item: any) => item === value) ? squeezePanel.caller.filter((item: any) => item !== value) : [...squeezePanel.caller, value]
        let lastedLimit = extractingMaximumPosition(hero8Site, bufferCallerList)

        let limit = keyExtract(settingStatus.type === "Cold" ? coldCallerPosition : CallerPosition, lastedLimit)
        let result = allowKey(settingStatus.type === "Cold" ? coldBET3Position : BET3Position, limit)

        setSettingStatus({
            ...settingStatus,
            BET3Position: result,
            hero8Site: {}
        })

        setSqueezePanel({
            ...squeezePanel,
            caller: bufferCallerList,
            bet3: undefined,
            hero: [],
        })

        let data = squeezePanel
        data.caller = [lastedLimit]

        let range = makingColdRange(data)
        setActionList(range)
    }

    return (
        <div className={
            clsx(
                "absolute transition-all bg-gray-900 opacity-[0.95] z-[2] border border-gray-600 rounded-[8px] overflow-hidden top-0 right-0",
                squeezeModal ? "w-full flex justify-between items-start flex-wrap pb-0 px-1 2xl:p-1 2xl:h-[203px]" : "w-0 h-0"
            )}
        >
            <div className='absolute flex justify-center items-center w-[45px] h-[45px] top-[0px] right-[5px]'>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="fullscreen-exit" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" className='hover:text-gray-200 text-primary cursor-pointer' onClick={() => setSqueezeModal(false)}>
                    <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
                </svg>
            </div>

            <div className='w-full flex justify-between items-start flex-wrap'>
                <div className='w-full 2xl:w-2/3 p-0 2xl:p-2 flex justify-between items-start'>
                    <div className='w-[100px]'>
                        <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                Type
                            </p>
                            <Tippy trigger="click" content="You need to select cold action or vs squeeze.">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div>
                        <div className='flex justify-center flex-col items-center flex-wrap'>

                            <Tippy content="VS squeeze Action">
                                <div
                                    className={clsx("mb-[5px] w-full p-[1px] transition-all cursor-pointer")}
                                >
                                    <div
                                        className={clsx('2xl:p-[5.5px] py-2 rounded-[4px] transition-all', "vs" === settingStatus.type ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                        onClick={() => handleSqueeze("type", "vs")}
                                    >
                                        <p className='text-center'>VS Squeeze</p>
                                    </div>
                                </div>
                            </Tippy>
                            <Tippy content="Cold Action">
                                <div
                                    className={clsx("mb-[5px] w-full p-[1px] transition-all cursor-pointer")}
                                >
                                    <div
                                        className={clsx('2xl:p-[5.5px] py-2 rounded-[4px] transition-all', "Cold" === settingStatus.type ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                        onClick={() => handleSqueeze("type", "Cold")}
                                    >
                                        <p className='text-center'>Cold</p>
                                    </div>
                                </div>
                            </Tippy>

                        </div>
                    </div>
                    <div className='w-[calc(100%-100px)] flex justify-between items-start'>
                        <div className='w-[25%]'>
                            <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                                <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                    RFI
                                </p>
                                <Tippy trigger="click" content="Define the RFI's Position">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </Tippy>
                            </div>
                            <div className='flex justify-between items-center flex-wrap'>
                                {Object.keys(settingStatus.RFIPosition).map((key: any, index: any) =>
                                    <Tippy key={index} content={settingStatus.RFIPosition[key]}>
                                        <div
                                            className={clsx("mb-[5px] w-1/2 p-[1px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={clsx('2xl:p-[5.5px] rounded-[4px] transition-all', squeezePanel.RFI === settingStatus.RFIPosition[index] ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                                onClick={() => handleSqueeze("RFI", settingStatus.RFIPosition[key])}
                                            >
                                                <p className='text-center'>{settingStatus.RFIPosition[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                                <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                    Caller
                                </p>
                                <Tippy trigger="click" content="Define the Caller's Position, It was limited until 2 caller.">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </Tippy>
                            </div>
                            <div className='flex justify-between items-center flex-wrap'>
                                {Object.keys(settingStatus.CallerPosition).map((key: any, index: any) =>
                                    <Tippy key={index} content={settingStatus.CallerPosition[key]}>
                                        <div
                                            className={clsx("mb-[5px] w-1/2 p-[1px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={clsx('2xl:p-[5.5px] rounded-[4px] transition-all', squeezePanel.caller.some((item: any) => item === settingStatus.CallerPosition[key]) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                                onClick={() => handleSqueeze("caller", settingStatus.CallerPosition[key])}
                                            >
                                                <p className='text-center'>{settingStatus.CallerPosition[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                                <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                    3BET
                                </p>
                                <Tippy trigger="click" content="Define the 3 Bet player's Position">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </Tippy>
                            </div>
                            <div className='flex justify-between items-center flex-wrap'>
                                {Object.keys(settingStatus.BET3Position).map((key: any, index: any) =>
                                    <Tippy key={index} content={settingStatus.BET3Position[key]}>
                                        <div
                                            className={clsx("mb-[5px] w-1/2 p-[1px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={clsx('2xl:p-[5.5px] rounded-[4px] transition-all', squeezePanel.bet3 === settingStatus.BET3Position[key] ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                                onClick={() => handleSqueeze("bet3", settingStatus.BET3Position[key])}
                                            >
                                                <p className='text-center'>{settingStatus.BET3Position[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className='w-[25%]'>
                            <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                                <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                    Hero
                                </p>
                                <Tippy trigger="click" content="Define the Hero's Position">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </Tippy>
                            </div>
                            <div className='flex justify-between items-center flex-wrap'>
                                {Object.keys(settingStatus.hero8Site).map((key: any, index: any) =>
                                    <Tippy key={index} content={settingStatus.hero8Site[key]}>
                                        <div
                                            className={clsx("mb-[5px] w-1/2 p-[1px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={clsx('2xl:p-[5.5px] rounded-[4px] transition-all', squeezePanel.hero.some((item: any) => item === settingStatus.hero8Site[key]) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                                onClick={() => handleSqueeze("hero", settingStatus.hero8Site[key])}
                                            >
                                                <p className='text-center'>{settingStatus.hero8Site[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='w-[40%] hidden'>
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
                    {/* <div className='w-[20%] hidden'>
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
                                            className={clsx('2xl:p-[5.5px] rounded-[4px] transition-all', premiumStatus.heroPosition.includes(hero8Site[key]) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                        // onClick={() => bufferPosition(index)}
                                        >

                                            <p className='text-center'>{hero8Site[key]}</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div> */}
                    {/* <div className='w-[30%] hidden'>
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
                                            className={clsx('p-[0.5px] 2xl:p-[2px] rounded-[4px] transition-all', premiumStatus.SqueezeStackDepth.includes(item) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                        // onClick={() => bufferStack(item)}
                                        >
                                            <p className='text-center'>{item} bb</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div> */}
                </div>
                <div className='w-full 2xl:w-1/3 p-0 2xl:p-2 '>

                    <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                        <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                            Hand Range
                        </p>
                        <Tippy trigger="click" content="Hand Range according to options.">
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                            </svg>
                        </Tippy>
                    </div>

                    <div className='flex justify-start items-center flex-wrap'>
                        {actionLit.map((item: any, index: any) =>
                            <div key={index} className="mr-[2px] mb-[2px]">
                                <p className='w-[40px] text-[11px] font-bold text-center border border-dashed border-gray-500 border-t-[0px] border-r-[0px] border-l-[0px]'>{item.position}</p>
                                <div className='flex justify-center'>
                                    <p
                                        className={
                                            clsx(
                                                'text-[12px] mb-0 text-center font-bold mt-1 inline px-2 rounded-full',
                                                item.action === "F" ? "bg-gray-200 text-gray-800" : item.action === "C" ? "bg-green-500 text-gray-200" : item.action === "H" ? "bg-blue-500 text-gray-200" : "bg-red-500 text-gray-200"
                                            )
                                        }
                                    >
                                        {item.action}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* <VillianPokerTable
                        premiumStatus={premiumStatus}
                        villianPokerTable={villianPokerTable}
                        setPremiumStatus={(total: any) => {
                            arrayPoint("VillianPosition", total.VillianPosition.map((villin: any) => hero8Site[villin]))
                            setPremiumStatus(total)
                        }}
                    /> */}
                </div>
            </div>
        </div >
    )
}