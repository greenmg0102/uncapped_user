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
            
            console.log("ante");
            
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
                setInfo({ ...info, status: currentStatus.status, callAmount: currentStatus.amount, anteAmount: currentStatus.amount, player: currentStatus.player, chipAmount: info.chipAmount - parseInt(currentStatus.amount.replace(",", "")) })
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
                    chipAmount: info.chipAmount - parseInt(currentStatus.toNumber)
                    // chipAmount: info.chipAmount - currentStatus.amount
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
                <div className={clsx("relative w-[100px] md:w-[110px] h-[55px] border bg-[#0e2e39] py-1 rounded-[12px]", playInfo.playerName === "Hero" ? "border-green-500 border-[3px]" : "border-red-400 border-[1px]")}>

                    <p className={clsx('text-center font-bold text-[18px] mb-0', playInfo.playerName === "Hero" ? "text-green-400" : "text-yellow-400")}>
                        {type === "hero9Site" ? hero9Site[playInfo.seatNumber] : hero8Site[playInfo.seatNumber - 1]}
                    </p>

                    <p className='text-center mb-0 text-gray-200 font-bold text-[12px] '>{info.chipAmount}</p>

                    <div className={clsx(buttonSeat === playInfo.seatNumber ? "absolute right-[5px] top-[55px] border rounded-full p-1 border-blue-400" : "hidden")}>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="flag" width="1.3em" height="1.3em" fill="currentColor" className='text-blue-400' aria-hidden="true"><path d="M880 305H624V192c0-17.7-14.3-32-32-32H184v-40c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V640h248v113c0 17.7 14.3 32 32 32h416c17.7 0 32-14.3 32-32V337c0-17.7-14.3-32-32-32zM184 568V232h368v336H184zm656 145H504v-73h112c4.4 0 8-3.6 8-8V377h216v336z"></path></svg>
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
