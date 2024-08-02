import { useState, useEffect } from 'react';
import styles from './PokerTable.module.css'
import SmallPlayCard from '../playcard/SmallPlayCard'
import { hero8Site, hero9Site } from '../../../utils/reference/playCardColor'
import clsx from 'clsx'

const PlayerBet = ({ playSeatInfo, item, playCount, handData, players, index, currentStatus, isNext, defaultAnte, calculateBetting }: any) => {

    const type = playCount > 8 ? 'hero9Site' : 'hero8Site'
    const buttonSeat = handData.buttonSeat
    const playInfo = players[index]

    const [info, setInfo] = useState({
        player: '',
        chipAmount: 0,
        anteAmount: 0,
        smallBlind: 0,
        bigBlind: 0,
        dealt: false,
        heroCard: [],
        status: undefined,
        callAmount: undefined,
        raiseFromAmount: undefined,
        raiseToAmount: undefined,
        isAllIn: undefined,
        show: false,
        showCard: []
    })

    useEffect(() => {

        if (currentStatus.type === "chip") {
            if (playInfo.playerName === currentStatus.player) setInfo({ ...info, player: currentStatus.player, chipAmount: currentStatus.amount })
        } else if (currentStatus.type === "ante") {
            let real = 0
            currentStatus.real.forEach((element: any) => {
                real++
                if (playInfo.playerName === element.player) {
                    setInfo({ ...info, anteAmount: element.amount, chipAmount: info.chipAmount - element.amount })
                }
                calculateBetting(element.amount * real)
            });
        } else if (currentStatus.type === "smallBlind") {
            if (playInfo.playerName === currentStatus.player) {
                setInfo({ ...info, player: currentStatus.player, smallBlind: currentStatus.amount, anteAmount: currentStatus.amount, chipAmount: info.chipAmount - currentStatus.amount })
                calculateBetting(currentStatus.amount)
            }
        } else if (currentStatus.type === "bigBlind") {
            if (playInfo.playerName === currentStatus.player) {
                setInfo({ ...info, player: currentStatus.player, bigBlind: currentStatus.amount, anteAmount: currentStatus.amount, chipAmount: info.chipAmount - currentStatus.amount })
                calculateBetting(currentStatus.amount)
            }
        } else if (currentStatus.type === "street") {

            if (currentStatus.status === "HOLE") console.log("now is hole street");
            else if (currentStatus.status === "FLOP") console.log("now is FLOP street");
            else if (currentStatus.status === "TURN") console.log("now is TURN street");
            else if (currentStatus.status === "RIVER") console.log("now is RIVER street");
            else if (currentStatus.status === "SHOWDOWN") console.log("now is SHOWDOWN street")

        } else if (currentStatus.type === "dealt" && currentStatus.player !== "Hero") {
            if (playInfo.playerName === currentStatus.player) setInfo({ ...info, dealt: true })
        } else if (currentStatus.type === "dealt" && currentStatus.player === "Hero") {
            if (playInfo.playerName === currentStatus.player) setInfo({ ...info, dealt: true, heroCard: currentStatus.playCard })
        } else if (currentStatus.type === "actionKind") {
            if (playInfo.playerName === currentStatus.player && currentStatus.status === "folds") {
                setInfo({ ...info, status: currentStatus.status, player: currentStatus.player })
            }
            if (playInfo.playerName === currentStatus.player && currentStatus.status === "calls") {
                calculateBetting(parseInt(currentStatus.amount.replace(",", "")))
                setInfo({ ...info, status: currentStatus.status, callAmount: currentStatus.amount, anteAmount: currentStatus.amount, player: currentStatus.player, chipAmount: info.chipAmount - currentStatus.amount })
            }
            if (playInfo.playerName === currentStatus.player && currentStatus.status === "raises") {
                calculateBetting(parseInt(currentStatus.toNumber.replace(",", "")))
                setInfo({
                    ...info,
                    status: currentStatus.status,
                    raiseFromAmount: currentStatus.raisesNumber,
                    raiseToAmount: currentStatus.toNumber,
                    player: currentStatus.player,
                    anteAmount: currentStatus.toNumber,
                    chipAmount: info.chipAmount - currentStatus.amount
                })
            }
        } else if (currentStatus.type === "showPlaycard") {
            if (playInfo.playerName === currentStatus.player) setInfo({ ...info, dealt: true, show: true, showCard: currentStatus.playCard })
        }
    }, [currentStatus])

    return (
        <div
            className={styles.playcard_table_user}
            style={{
                top: (playSeatInfo[item].y) + "%", left: (playSeatInfo[item].x) + "%"
            }}
        >
            <div className="relative z-[1]">
                <div className={clsx("relative w-[100px] md:w-[110px] h-[55px] border bg-[#4f5a83] border-[3px] py-1 rounded-[12px]", playInfo.playerName === "Hero" ? "border-green-600" : "border-gray-600")}>

                    <div className='flex justify-center items-center'>

                        {playInfo.playerName === "Hero" ?
                            // <svg fill="#10B981" width="2em" height="2em" viewBox="0 0 32 32" version="1.1">
                            //     <path d="M19.971 14.602c0.578-0.088 1.666-0.472 2.049-0.771 0.418-0.244 0.635-0.534 0.648-0.872 0.041-0.515 0.018-1.015-0.070-1.501-0.088-0.487-0.187-1.041-0.295-1.663-1.176 1.853-2.771 3.103-4.786 3.752l-0.224 0.486c0.947 0.609 1.84 0.798 2.678 0.569v0zM13.42 13.547c-2.028-0.649-3.631-1.899-4.807-3.752-0.095 0.622-0.189 1.176-0.284 1.663s-0.115 0.986-0.061 1.501c0.027 0.352 0.243 0.642 0.649 0.872 0.306 0.252 1.511 0.723 2.028 0.771 0.838 0.229 1.73 0.040 2.678-0.568l-0.203-0.487zM14.018 17.015c-0.155 0.406-0.125 1.037 0.092 1.578h0.941v-2.978c-0.393 0.528-0.878 0.994-1.033 1.4zM16.053 18.593h0.908c0.054-0.148 0.095-0.438 0.122-0.554s0.041-0.24 0.041-0.375c0-0.365-0.079-0.696-0.235-0.994s-0.564-0.648-0.836-1.055v2.978zM26.568 8.654c0.203 0.798 0.271 1.609 0.203 2.434-0.135 1.65-0.838 3.306-2.109 4.604l1.116 2.13-1.644 1.866c-2.326-1.11-3.063 0.044-3.063 1.663v6.649h-1.047v-5.964h-0.946v5.964h-1.088v-5.964h-0.938v5.964h-1.034v-5.964h-0.938v5.964h-1.033v-5.946l-0.939-0.018v5.964h-1.090v-5.964h-0.943v5.964h-1.035v-6.649c0-1.625-0.867-2.855-3.198-1.663l-1.683-1.866 1.176-2.13c-1.271-1.298-1.951-2.951-2.1-4.613-0.075-0.833-0.014-1.647 0.182-2.445 0.997-4.056 4.496-4.698 5.182-4.807 3.905-0.541 7.818-0.541 11.737 0 0.669 0.115 4.213 0.819 5.232 4.827z"></path>
                            // </svg>

                            <svg height="2em" width="2em" version="1.1" id="Layer_1" viewBox="0 0 511.993 511.993">
                                <path style={{ fill: "#8CC153" }} d="M460.304,407.635l-1.812-0.516c-26.469-7.109-35.436-13.953-47.217-18.438
                                    c-41.828-15.938-52.703-27.406-55.484-32.828c-0.109-0.203-0.172-0.406-0.266-0.609l-0.344-48.576l-99.186-1.125l-99.17,1.125
                                    l-0.344,48.576c-0.094,0.203-0.172,0.406-0.266,0.609c-2.781,5.422-13.656,16.891-55.483,32.828
                                    c-11.796,4.484-20.75,11.328-47.233,18.438l-1.812,0.516c-24.109,7.969-40.327,30.328-40.327,55.561v48.797h244.635h244.637v-48.797
                                    C500.632,437.963,484.429,415.603,460.304,407.635z"/>
                                <path style={{ fill: "#DBAFA5" }} d="M355.79,355.853c-0.109-0.203-0.172-0.406-0.266-0.609l-0.344-48.576l-99.185-1.125l-99.17,1.125
	                                l-0.344,48.576c-0.094,0 .203-0.172,0.406-0.266,0.609c-2.781,5.422,99.78,156.139,99.78,156.139S358.571,361.275,355.79,355.853z"/>
                                <path style={{ fill: "#EAC6BB" }} d="M393.618,212.684c0,89.405-85.248,171.7-137.623,171.7c-52.374,0-137.623-82.295-137.623-171.7
	                                c0-89.42,61.624-148.419,137.623-148.419C331.993,64.265,393.618,123.264,393.618,212.684z"/>
                                <path style={{ fill: "#ED5564" }} d="M395.727,63.64C383.868,45,367.586,30.172,347.321,19.563C322.556,6.579,291.823,0,255.995,0
                                    c-35.812,0-66.546,6.578-91.311,19.562c-20.281,10.609-36.562,25.437-48.405,44.077c-20.125,31.595-20.344,63.094-20.344,64.422
                                    v106.717c0,4.688,3.062,8.828,7.531,10.203c4.484,1.375,9.344-0.344,11.969-4.234l40.155-59.327h200.762l40.203,59.343
                                    c2.031,2.984,5.375,4.688,8.844,4.688c1.047,0,2.094-0.156,3.125-0.469c4.5-1.375,7.547-5.516,7.547-10.203V128.061
                                    C416.071,126.733,415.837,95.234,395.727,63.64z"/>
                                {/* <path style="opacity:0.2;fill:#FFFFFF;enable-background:new    ;" d="M395.727,63.64C383.868,45,367.586,30.172,347.321,19.563
                                    C322.556,6.579,291.823,0,255.995,0c-35.812,0-66.546,6.578-91.311,19.562c-20.281,10.609-36.562,25.437-48.405,44.077
                                    c-20.125,31.595-20.344,63.094-20.344,64.422v10.672c0-1.328,0.219-32.828,20.343-64.421c11.843-18.641,28.125-33.468,48.405-44.077
                                    c24.766-12.985,55.5-19.563,91.312-19.563c35.828,0,66.561,6.578,91.326,19.562c20.266,10.609,36.547,25.437,48.406,44.077
                                    c20.109,31.593,20.344,63.093,20.344,64.421V128.06C416.071,126.733,415.837,95.234,395.727,63.64z"/> */}
                                <path style={{ fill: "#DA4453" }} d="M95.935,128.061v10.672h320.136v-10.672c0-0.453-0.016-4.406-0.859-10.672H96.779
	                                C95.951,123.655,95.935,127.608,95.935,128.061z"/>
                                <path style={{ fill: "#8CC153" }} d="M132.684,277.574c26.484,60.686,84.108,106.811,123.311,106.811
	                                c39.188,0,96.732-46.031,123.264-106.654c-56.766,4.5-122.389-21.609-122.389-21.609S189.84,282.793,132.684,277.574z"/>
                                <path style={{ fill: "#656D78" }} d="M321.524,384.182c0,0-19.982,21.344-65.592,21.344c-45.593,0-65.624-21.344-65.624-21.344
	                                l65.687,127.81l70.561-94.232L321.524,384.182z"/>
                                <g>
                                    <polygon style={{ fill: "#A0D468" }} points="255.995,511.992 156.747,318.715 127.934,388.838 160.512,413.853 154.684,437.869 	" />
                                    <polygon style={{ fill: "#A0D468" }} points="255.995,511.992 355.259,318.715 383.837,388.838 351.274,413.853 357.087,437.869 	" />
                                </g>
                            </svg>
                            :
                            <svg fill="#111827" width="2em" height="2em" viewBox="0 0 32 32" version="1.1">
                                <path d="M19.971 14.602c0.578-0.088 1.666-0.472 2.049-0.771 0.418-0.244 0.635-0.534 0.648-0.872 0.041-0.515 0.018-1.015-0.070-1.501-0.088-0.487-0.187-1.041-0.295-1.663-1.176 1.853-2.771 3.103-4.786 3.752l-0.224 0.486c0.947 0.609 1.84 0.798 2.678 0.569v0zM13.42 13.547c-2.028-0.649-3.631-1.899-4.807-3.752-0.095 0.622-0.189 1.176-0.284 1.663s-0.115 0.986-0.061 1.501c0.027 0.352 0.243 0.642 0.649 0.872 0.306 0.252 1.511 0.723 2.028 0.771 0.838 0.229 1.73 0.040 2.678-0.568l-0.203-0.487zM14.018 17.015c-0.155 0.406-0.125 1.037 0.092 1.578h0.941v-2.978c-0.393 0.528-0.878 0.994-1.033 1.4zM16.053 18.593h0.908c0.054-0.148 0.095-0.438 0.122-0.554s0.041-0.24 0.041-0.375c0-0.365-0.079-0.696-0.235-0.994s-0.564-0.648-0.836-1.055v2.978zM26.568 8.654c0.203 0.798 0.271 1.609 0.203 2.434-0.135 1.65-0.838 3.306-2.109 4.604l1.116 2.13-1.644 1.866c-2.326-1.11-3.063 0.044-3.063 1.663v6.649h-1.047v-5.964h-0.946v5.964h-1.088v-5.964h-0.938v5.964h-1.034v-5.964h-0.938v5.964h-1.033v-5.946l-0.939-0.018v5.964h-1.090v-5.964h-0.943v5.964h-1.035v-6.649c0-1.625-0.867-2.855-3.198-1.663l-1.683-1.866 1.176-2.13c-1.271-1.298-1.951-2.951-2.1-4.613-0.075-0.833-0.014-1.647 0.182-2.445 0.997-4.056 4.496-4.698 5.182-4.807 3.905-0.541 7.818-0.541 11.737 0 0.669 0.115 4.213 0.819 5.232 4.827z"></path>
                            </svg>
                        }
                    </div>

                    <p className='text-center text-gray-900 font-bold text-[18px] mb-0'>
                        {type === "hero9Site" ? hero9Site[playInfo.seatNumber] : hero8Site[playInfo.seatNumber]}
                    </p>

                    <p className='text-center mb-0 text-gray-900 font-bold text-[12px]'>{info.chipAmount}</p>

                    <div className={clsx(buttonSeat === playInfo.seatNumber ? "absolute right-[0px] top-[15px]" : "hidden")}>
                        <img
                            src="https://static.thenounproject.com/png/485972-200.png"
                            className="r48jcc pT0Scc iPVvYb"
                            style={{ maxWidth: 20, height: 20, margin: 0, visibility: "visible", width: 20 }}
                            alt="Vector Icon. Dealer Button With Card Suits For Playing Poker ..."
                            data-xblocker="passed"
                        />
                    </div>

                </div>
            </div>


            <div
                className={clsx(
                    info.anteAmount <= defaultAnte ? "hidden" : "",
                    'absolute flex justify-center items-center flex-col font-bold text-gray-100 transition-all absolute top-[150%] left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                    playSeatInfo[item].cheapPosition && playSeatInfo[item].cheapPosition.x ? '' : 'hidden'
                )}
            >
                <img
                    src={"/assets/images/playCardSymbol/PokerChips.png"}
                    className={clsx("transition-all", info.anteAmount ? 'bg-cover' : 'hidden')}
                    alt="suit"
                    width="25" height="25"
                />
                <p className='transition-all text-center text-[14px]'>{info.anteAmount}</p>
            </div>

            <div
                className={
                    clsx(
                        'absolute top-1/2 text-[20px] text-green-100 text-center w-[110px] transform font-bold',
                        styles.letter_animation, info.smallBlind === 0 ? styles.letter_animation_pre : styles.letter_animation_run
                    )
                }
            > S B </div>
            <div
                className={
                    clsx(
                        'absolute top-1/2 text-[20px] text-green-500 text-center w-[110px] transform font-bold',
                        styles.letter_animation, info.bigBlind === 0 ? styles.letter_animation_pre : styles.letter_animation_run
                    )
                }
            > B B </div>
            <div
                className={
                    clsx(
                        'absolute top-1/2 text-[30px] text-red-300 text-center w-[110px] transform font-bold',
                        styles.letter_animation, info.status !== 'calls' ? styles.letter_animation_pre : styles.letter_animation_run
                    )
                }
            > Call </div>
            <div
                className={
                    clsx(
                        'absolute top-1/2 text-[30px] text-red-700 text-center w-[110px] transform font-bold',
                        styles.letter_animation, info.status !== 'raises' ? styles.letter_animation_pre : styles.letter_animation_run
                    )
                }
            > Raise </div>
            {info.status !== "folds" ?
                <div>
                    {info.heroCard.length === 0 ?
                        <div className={clsx('absolute top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center transition-all', info.dealt ? '' : 'hidden')} >
                            <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline cursor-pointer hover:w-14 transition-all" src="/assets/images/poker-mark/backPlaycard.png" alt="logo" />
                            <img className="w-8 ltr:-ml-1 rtl:-mr-1 inline cursor-pointer hover:w-14 transition-all" src="/assets/images/poker-mark/backPlaycard.png" alt="logo" />
                        </div>
                        :
                        <div className={clsx('absolute top-[-10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center transition-all', info.dealt ? '' : 'hidden')} >
                            {info.heroCard.map((item: any, index: any) =>
                                <SmallPlayCard
                                    key={index}
                                    holeCardInfo={{ rank: item.slice(0, 1), suit: item.slice(1, 2) }}
                                />
                            )}
                        </div>
                    }
                </div>
                :
                <div
                    className={
                        clsx(
                            'absolute top-1/2 text-[30px] text-center w-[110px] transform font-bold',
                            styles.letter_animation, info.status !== 'folds' ? styles.letter_animation_pre : styles.letter_animation_run_fold
                        )
                    }
                > Fold </div>
            }
        </div>
    );
};

export default PlayerBet;
