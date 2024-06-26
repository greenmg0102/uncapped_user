import Tippy from '@tippyjs/react';
import PanelItem from "../panelItem"
import clsx from 'clsx'
import { useState, useEffect } from 'react';
import VillianPokerTable from './VillianPokerTable'
import { hero8Site, stackDepthArray, villianPokerTable, RFIPosition, coldRFIPosition, CallerPosition, BET3Position, coldBET3Position, coldCallerPosition } from '../../../../../../../../utils/reference/playCardColor'
import { defaultReportSetting } from '../../../../../../../../utils/reference/reporting'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { heroPositionValidation } from '../../../../../../../../utils/reference/heroPositionValidation'
import { availableHeroPosition, keyExtract, allowKey, makingColdRange, extractingMaximumPosition } from '../../../../../../../../utils/actionValidation/reporting/makingRange'
import 'tippy.js/dist/tippy.css';

export default function Squeeze({ squeezePanel, setSqueezePanel, actionLit, setActionList, squeezeModal, setSqueezeModal, actionPoint, setValueStatus, arrayPoint, premiumStatus, valueStatus, setPremiumStatus, notification, squeezeSetting, setSqueezeSetting }: any) {

    const MySwal = withReactContent(Swal);

    const [settingStatus, setSettingStatus] = useState<any>({
        type: undefined,
        RFIPosition: {},
        CallerPosition: {},
        BET3Position: {},
        hero8Site: {},
        stackDepth: []
    })

    useEffect(() => {
        setSettingStatus({
            ...settingStatus,
            RFIPosition: RFIPosition,
        })
    }, [])

    const handleSqueeze = (type: any, value: any) => {

        let real = squeezePanel

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
                SqueezeStackDepth: []
            })
        } else if (type === "RFI") {

            if (squeezePanel.RFI === value) {

                setSettingStatus({
                    ...settingStatus,
                    CallerPosition: {},
                    BET3Position: {},
                    hero8Site: {}
                })
            }
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
                SqueezeStackDepth: []
            })

            let data = squeezePanel
            data.RFI = data.RFI === value ? undefined : value

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
                SqueezeStackDepth: []
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
                hero: [value],
                SqueezeStackDepth: []
            })

            let data = squeezePanel
            data.hero = [value]

            let range = makingColdRange(data)
            setActionList(range)
        } else if (type === "stack") {
            setSqueezePanel({
                ...real,
                SqueezeStackDepth: [value]
            })
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
        data.caller = bufferCallerList

        let range = makingColdRange(data)
        setActionList(range)
    }

    return (
        <div className={
            clsx(
                "transition-all opacity-[0.95] z-[2] overflow-hidden",
                squeezeModal ? "w-full flex justify-between items-start flex-wrap pb-0 px-1 2xl:p-1 2xl:h-[203px]" : "w-0 h-0"
            )}
        >
            <div className='absolute flex justify-center items-center w-[45px] h-[45px] top-[0px] right-[5px]'>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="fullscreen-exit" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" className='hover:text-gray-200 text-primary cursor-pointer' onClick={() => setSqueezeModal(false)}>
                    <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
                </svg>
            </div>

            <div className='w-full flex justify-between items-start flex-wrap'>
                <div className='w-full 2xl:w-[calc(100%-320px)] p-0 flex justify-between items-start flex-wrap'>

                    <div className='w-full flex justify-between items-start'>
                        <div className='w-[20%]'>
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

                                {/* <div className=" flex justify-between flex-wrap mt-2">
                                    {Object.keys(settingStatus.RFIPosition).map((item: any, index: any) =>
                                        <div className="w-1/2">
                                            <PanelItem key={index} value={settingStatus.RFIPosition[item]} height={30} valueStatus={valueStatus} type={"action"} setValueStatus={(total: any) => setValueStatus(total)} />
                                        </div>
                                    )}
                                </div> */}

                                {Object.keys(settingStatus.RFIPosition).map((key: any, index: any) =>
                                    <Tippy key={index} content={settingStatus.RFIPosition[key]}>
                                        <div
                                            className={clsx("w-1/2 pb-[1px] px-[1px] h-[22px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={clsx('rounded-[4px] transition-all', squeezePanel.RFI === settingStatus.RFIPosition[index] ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                                onClick={() => handleSqueeze("RFI", settingStatus.RFIPosition[key])}
                                            >
                                                <p className='text-center'>{settingStatus.RFIPosition[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className='w-[20%]'>
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
                                {Object.keys(CallerPosition).map((key: any, index: any) =>
                                    <Tippy key={index} content={CallerPosition[key]}>
                                        <div
                                            className={clsx("w-1/2 pb-[1px] px-[1px] h-[22px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={
                                                    clsx(
                                                        'rounded-[4px] transition-all',
                                                        !Object.keys(settingStatus.CallerPosition).some((callerKey: any) => callerKey === key) ?
                                                            'cursor-not-allowed text-gray-700' : '',

                                                        squeezePanel.caller.some((item: any) => item === CallerPosition[key]) ?
                                                            "bg-gray-500 text-gray-100"
                                                            :
                                                            " bg-gray-800"
                                                    )
                                                }
                                                onClick={
                                                    () => Object.keys(settingStatus.CallerPosition).some((callerKey: any) => callerKey === key) ?
                                                        handleSqueeze("caller", CallerPosition[key])
                                                        :
                                                        messageNotification("Un-selectable position")
                                                }
                                            >
                                                <p className='text-center'>{CallerPosition[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className='w-[20%]'>
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

                                {Object.keys(BET3Position).map((key: any, index: any) =>
                                    <Tippy key={index} content={BET3Position[key]}>
                                        <div
                                            className={clsx("w-1/2 pb-[1px] px-[1px] h-[22px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={
                                                    clsx(
                                                        'rounded-[4px] transition-all',
                                                        !Object.keys(settingStatus.BET3Position).some((bet3Key: any) => bet3Key === key) ?
                                                            'cursor-not-allowed text-gray-700' : '',

                                                        squeezePanel.bet3 === BET3Position[key] ?
                                                            "bg-gray-500 text-gray-100"
                                                            :
                                                            " bg-gray-800"
                                                    )
                                                }
                                                onClick={
                                                    () => Object.keys(settingStatus.BET3Position).some((bet3Key: any) => bet3Key === key) ?
                                                        handleSqueeze("bet3", BET3Position[key])
                                                        :
                                                        messageNotification("Un-selectable position")
                                                }
                                            >
                                                <p className='text-center'>{BET3Position[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}

                            </div>
                        </div>
                        <div className='w-[20%]'>
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
                                {Object.keys(hero8Site).map((key: any, index: any) =>
                                    <Tippy key={index} content={hero8Site[key]}>
                                        <div
                                            className={clsx("w-1/2 pb-[1px] px-[1px] h-[22px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={
                                                    clsx(
                                                        'rounded-[4px] transition-all',
                                                        !Object.keys(settingStatus.hero8Site).some((heroKey: any) => heroKey === key) ?
                                                            'cursor-not-allowed text-gray-700' : '',

                                                        squeezePanel.hero.some((item: any) => item === hero8Site[key]) ?
                                                            "bg-gray-500 text-gray-100"
                                                            :
                                                            " bg-gray-800"
                                                    )
                                                }
                                                onClick={
                                                    () => Object.keys(settingStatus.hero8Site).some((heroKey: any) => heroKey === key) ?
                                                        handleSqueeze("hero", hero8Site[key])
                                                        :
                                                        messageNotification("Un-selectable position")
                                                }
                                            >
                                                <p className='text-center'>{hero8Site[key]}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className='w-[20%]'>
                            <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[9px]'>
                                <p className='text-center font-bold text-[16px] text-gray-300 mb-0 pr-2'>
                                    Stack
                                </p>
                                <Tippy trigger="click" content="Define the Caller's Position, It was limited until 2 caller.">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </Tippy>
                            </div>
                            <div className='flex justify-between items-center flex-wrap'>
                                {stackDepthArray.map((item: any, index: any) =>
                                    <Tippy key={index} content={item}>
                                        <div
                                            className={clsx("w-1/2 pb-[1px] px-[1px] h-[22px] transition-all cursor-pointer")}
                                        >
                                            <div
                                                className={
                                                    clsx(
                                                        'rounded-[4px] transition-all',
                                                        squeezePanel.hero.length > 0 ? "" : "cursor-not-allowed text-gray-700",
                                                        squeezePanel.SqueezeStackDepth.some((each: any) => each === item) ?
                                                            "bg-gray-500 text-gray-100"
                                                            :
                                                            " bg-gray-800"
                                                    )
                                                }
                                                onClick={() => handleSqueeze("stack", item)}
                                            >
                                                <p className='text-center'>{item === 398750 ? 40 : item}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-full 2xl:w-[320px] py-5 2xl:py-4 pt-0 flex justify-center'>

                    <VillianPokerTable
                        actionLit={actionLit}
                        premiumStatus={premiumStatus}
                        villianPokerTable={villianPokerTable}
                        SqueezeStackDepth={squeezePanel.SqueezeStackDepth[0]}
                        setPremiumStatus={(total: any) => {
                            arrayPoint("VillianPosition", total.VillianPosition.map((villin: any) => hero8Site[villin]))
                            setPremiumStatus(total)
                        }}
                    />
                </div>
            </div>
        </div >
    )
}