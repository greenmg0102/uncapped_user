import { useState } from 'react';
import Tippy from '@tippyjs/react';
import clsx from 'clsx'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { heroPositionValidation } from '../../../../../../utils/reference/heroPositionValidation'
import { hero8Site, stackArray, villianPokerTable } from '../../../../../../utils/reference/playCardColor'
import { defaultReportSetting } from '../../../../../../utils/reference/reporting'
import 'tippy.js/dist/tippy.css';
import Squeeze from '../Squeeze'

export default function Premium({ squeezePanel, setSqueezePanel, actionLit, setActionList, advancedOptionModal, setAdvancedOptionModal, actionPoint, setValueStatus, arrayPoint, premiumStatus, valueStatus, setIsSqueeze, setPremiumStatus, defaultReportSetting, squeezeSetting, setSqueezeSetting }: any) {

    const MySwal = withReactContent(Swal);
    const [squeezeModal, setSqueezeModal] = useState(false)

    const bufferSqueezeHandle = (bool: any) => {
        setSqueezeModal(bool)
        setIsSqueeze(bool)
    }

    const bufferAction = (title: any) => {
        let realValueStatus = { action: title, heroPosition: [], stackDepth: [], VillianPosition: [] }
        actionPoint(realValueStatus)
        setPremiumStatus({ ...premiumStatus, action: title, heroPosition: [], stackDepth: [], VillianPosition: [] })
    }

    const bufferPosition = (index: any) => {
        let availableHeroPostion = heroPositionValidation[valueStatus.action]

        if
            (
            //    availableHeroPostion.some((item: any) => item === hero8Site[index]) === true
            true
        ) {
            let currentAction = valueStatus.action
            if (valueStatus.heroPosition.some((currentHero: any) => currentHero === hero8Site[index])) {
                let real = valueStatus.heroPosition.filter((currentHero: any) => currentHero !== hero8Site[index])

                let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
                actionPoint(realValueStatus)
                setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })

            } else {

                let currentHeroPosition = valueStatus.heroPosition
                let real = [...currentHeroPosition, hero8Site[index]]

                let isMatch = checkMatch(defaultReportSetting.heroPosition, real);

                if (isMatch) {
                    let realValueStatus = { action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] }
                    actionPoint(realValueStatus)
                    setPremiumStatus({ ...premiumStatus, action: currentAction, heroPosition: real, stackDepth: [], VillianPosition: [] })
                } else {
                    notification('Range has been exceeded', 'info')
                }
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

    const bufferVillian = (position: any) => {
        if (premiumStatus.VillianPosition.includes(position)) setPremiumStatus({ ...premiumStatus, VillianPosition: premiumStatus.VillianPosition.filter((item: any) => item !== position) })
        else setPremiumStatus({ ...premiumStatus, VillianPosition: [...premiumStatus.VillianPosition, position] })
    }

    const notification = (message: any, color: any) => {
        MySwal.fire({
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true,
            customClass: { popup: `color-${color}` }
        });
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

    return (
        <div>
            <div className={
                clsx(
                    "absolute transition-all p-1 2xl:p-0 bg-gray-900 opacity-[0.95] z-[2] border border-gray-600 rounded-[8px] 2xl:rounded-tr-[0px] 2xl:rounded-br-[0px] overflow-hidden top-0 left-0",
                    advancedOptionModal ? "w-full 2xl:h-[203px]" : "w-0 h-0"
                )}
            >
                <div className='absolute flex justify-center items-center w-[45px] h-[45px] top-[0px] left-[5px]'>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="fullscreen-exit" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" className='hover:text-gray-200 text-primary cursor-pointer' onClick={() => setAdvancedOptionModal(false)}>
                        <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
                    </svg>
                </div>

                <div className='p-1 flex justify-between items-start flex-wrap'>
                    <div className='w-full 2xl:w-[40%] p-2 px-[1px] pl-0'>
                        <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[8px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0'>
                                Action
                            </p>
                            <Tippy trigger="click" content="Define the Action">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div>
                        <div>
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
                                                onClick={() => bufferAction(item.title)}
                                            >
                                                <p className='text-center'>{item.title}</p>
                                            </div>
                                        </div>
                                    </Tippy>
                                )}
                            </div>

                            <Tippy content={"Squeeze"}>
                                <div className={clsx("mb-1 w-1/3 rounded-[4px] p-[1px] transition-all cursor-pointer bg-gray-900")}>
                                    <div
                                        className={clsx('p-1 rounded-[4px] transition-all bg-gray-800 border border-blue-500 border-dashed')}
                                        onClick={() => bufferSqueezeHandle(true)}
                                    >
                                        <p className='text-center'>Squeeze</p>
                                    </div>
                                </div>
                            </Tippy>
                        </div>
                    </div>
                    <div className='w-1/3 2xl:w-[20%] pt-0 2xl:p-2 2xl:px-[1px] pl-0'>
                        <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[8px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0'>
                                Hero Pos
                            </p>
                            <Tippy trigger="click" content="Define the Hero's Position">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div>
                        <div className={
                            clsx(
                                'flex justify-between items-center flex-wrap rounded-[4px]',
                                premiumStatus.heroPosition.length === 0 && premiumStatus.action !== "" ? "border border-dashed" : "text-gray-600"
                            )}
                        >
                            {Object.keys(hero8Site).map((key: any, index: any) =>
                                <Tippy key={index} content={hero8Site[key]}>
                                    <div
                                        className={clsx("mb-[3px] w-1/2 p-[1px] transition-all cursor-pointer")}
                                    >
                                        <div
                                            className={clsx('p-[4px] 2xl:p-[6px] rounded-[4px] transition-all', premiumStatus.heroPosition.includes(hero8Site[index]) ? "bg-blue-500 text-gray-100" : "bg-gray-800")}
                                            onClick={() => bufferPosition(index)}
                                        >
                                            <p className='text-center'>{hero8Site[key]}</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div>
                    <div className='w-1/3 2xl:w-[20%] pt-0 2xl:p-2 2xl:px-[1px] pl-0'>
                        <div className='flex justify-center items-center p-1 py-4 pt-1'>
                            <p className='text-center font-bold text-[16px] text-gray-300'>
                                Stack Depth
                            </p>
                            <Tippy trigger="click" content="Define the Stack Depth">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='cursor-pointer'>
                                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
                                </svg>
                            </Tippy>
                        </div>
                        <div className={
                            clsx(
                                'flex justify-between items-center flex-wrap rounded-[4px]',
                                premiumStatus.stackDepth.length === 0 && premiumStatus.heroPosition !== undefined ? "border border-dashed" : "text-gray-600"
                            )}
                        >
                            {stackArray.map((item: any) =>
                                <Tippy key={item} content={item}>
                                    <div className={clsx("mb-[3px] w-1/2 p-[1px] transition-all cursor-pointer")}>
                                        <div
                                            className={clsx('p-[0.5px] 2xl:p-[2px] rounded-[4px] transition-all', premiumStatus.stackDepth.includes(item) ? "bg-gray-500 text-gray-100" : " bg-gray-800")}
                                            onClick={() => bufferStack(item)}
                                        >
                                            <p className='text-center'>{item === 398750 ? 40 : item} bb</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div>
                    <div className='w-1/3 2xl:w-[20%] pt-0 2xl:p-2 2xl:px-[1px] pl-0'>
                        <div className='flex justify-center items-center mb-0 p-1 pt-2 pb-[8px]'>
                            <p className='text-center font-bold text-[16px] text-gray-300 mb-0'>
                                Villian Pos
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
                                    <div className={clsx("mb-1 w-1/2 p-[1px] transition-all cursor-pointer text-gray-600")}>
                                        <div
                                            className={clsx('p-[4px] 2xl:p-[6px] rounded-[4px] transition-all', premiumStatus.VillianPosition.includes(index) ? "bg-red-800 text-gray-100 font-bold" : "bg-gray-800")}
                                            onClick={() => {
                                                if (index >= premiumStatus.heroPosition) {
                                                    notification('Villian can"t be large or same than hero!', 'error')
                                                    return
                                                }
                                                else if (premiumStatus.VillianPosition.length === 2 && !premiumStatus.VillianPosition.some((item: any) => item === index)) {
                                                    notification('Villian can"t be large than hero!', 'error')
                                                    return
                                                }
                                                else {
                                                    arrayPoint("VillianPosition", [hero8Site[index]])
                                                    bufferVillian(index)
                                                }
                                            }}
                                        >
                                            <p className='text-center'>{hero8Site[key]}</p>
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Squeeze

                squeezePanel={squeezePanel}
                setSqueezePanel={(total: any) => setSqueezePanel(total)}

                actionLit={actionLit}
                setActionList={(total: any) => setActionList(total)}

                valueStatus={valueStatus}
                premiumStatus={premiumStatus}
                squeezeModal={squeezeModal}
                squeezeSetting={squeezeSetting}
                setValueStatus={(total: any) => setValueStatus(total)}
                setPremiumStatus={(total: any) => setPremiumStatus(total)}
                setSqueezeSetting={(total: any) => setSqueezeSetting(total)}
                setSqueezeModal={(bool: boolean) => bufferSqueezeHandle(bool)}
                actionPoint={(premiumAction: any) => bufferAction(premiumAction)}
                arrayPoint={(type: any, premiumArry: any) => arrayPoint(type, premiumArry)}
                notification={(message: any, color: any) => notification(message, color)}
            />
        </div>
    )
}