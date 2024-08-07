import { useState } from 'react';
import styles from './PokerTable.module.css'
import { positionSet } from '../../../utils/reference/playCardColor'
import MiddlePlayCard from '../../../components/UI/playcard/MiddlePlayCard';
import PlayerBet from './PlayerBet'
import PokerSummary from './PokerSummary';
import { ChipStatus } from '../chipStatus'
import clsx from 'clsx'

const PokerTableEnv = ({ handData, stage, currentStatus, isNext, isAnimation, chipAmountColor }: any) => {

    const [totalBet, setTotalBet] = useState(0)
    const [modalStatus, setModalStatus] = useState(false);

    const calculateBetting = (betting: any) => {
        let real = totalBet
        setTotalBet(real + Number(betting))
    }

    let playCount = handData && handData.players && handData.players.length
    let playSeatInfo = playCount !== undefined && positionSet[playCount]
    let players = handData && handData.players

    
    return (
        <div className='relative py-16'>
            <div className={styles.playcard_table}>
                {Object.keys(playSeatInfo).map((item: any, index: any) =>
                    <PlayerBet
                        key={index}
                        item={item}
                        index={index}
                        isNext={isNext}
                        defaultAnte={50}
                        players={players}
                        handData={handData}
                        playCount={playCount}
                        playSeatInfo={playSeatInfo}
                        currentStatus={currentStatus}
                        calculateBetting={(betting: any) => calculateBetting(betting)}
                    />
                )}
                {Object.keys(playSeatInfo).map((item: any, index: any) =>
                    <div
                        key={index}
                        className={
                            clsx(
                                isAnimation ? '' : 'hidden',
                                (currentStatus.player === players[index].playerName && currentStatus.type === "smallBlind") ||
                                    (currentStatus.player === players[index].playerName && currentStatus.type === "bigBlind") ||
                                    (currentStatus.player === players[index].playerName && currentStatus.type === "actionKind" && currentStatus.status === "raises") ||
                                    (currentStatus.player === players[index].playerName && currentStatus.type === "actionKind" && currentStatus.status === "calls")
                                    ? styles.chip_betting_img : styles.chip_betting
                            )
                        }
                        style={{
                            top: currentStatus.player === players[index].playerName ? '25%' : (playSeatInfo[item].y - 5) + "%",
                            left: currentStatus.player === players[index].playerName ? '50%' : (playSeatInfo[item].x - 5) + "%",
                            // zIndex: currentStatus.player === players[index].playerName ? 1 : 0,
                            opacity:
                                (currentStatus.player === players[index].playerName && currentStatus.type === "smallBlind") ||
                                    (currentStatus.player === players[index].playerName && currentStatus.type === "bigBlind") ||
                                    (currentStatus.player === players[index].playerName && currentStatus.type === "actionKind" && currentStatus.status === "raises") ||
                                    (currentStatus.player === players[index].playerName && currentStatus.type === "actionKind" && currentStatus.status === "calls")
                                    ? 1 : 0,
                        }}
                    >
                        <img
                            src={"/assets/images/playCardSymbol/PokerChips.png"}
                            className={clsx("transition-all", true ? 'bg-cover' : 'hidden')}
                            alt="suit"
                            width="50" height="50"
                        />
                    </div>
                )}

                <div className={clsx(totalBet === 0 ? 'hidden' : styles.betting_amount)}>
                    <ChipStatus totalBet={totalBet} />
                    <p className='text-center text-[20px] mt-[16px] text-white transition-all'>
                        {totalBet}
                    </p>
                </div>

                <div className={styles.playcard_table_place}>
                    <i>
                        {handData && handData.pokerRoomId}
                    </i>
                    <div className={styles.poker_panel}>
                        {
                            handData.communityCards && handData.communityCards
                                .filter((each: any, order: any) => order < stage)
                                .map((item: any, index: any) =>
                                    <MiddlePlayCard
                                        key={index}
                                        holeCardInfo={item}
                                    />
                                )
                        }
                    </div>
                </div>
                <div className={styles.playcard_table_place}>
                    <div className="w-[245px] h-[60px]">
                        <img
                            src={"/assets/images/playCardSymbol/ggpoker-logo-new.webp"}
                            className='bg-cover'
                            alt="suit"
                            width="245" height="60"
                        />
                    </div>
{/* 
                    <i>
                        {handData && handData.pokerRoomId}
                    </i> */}

                    <div className={styles.poker_panel}>
                        {
                            handData.communityCards && handData.communityCards
                                .filter((each: any, order: any) => order < stage)
                                .map((item: any, index: any) =>
                                    <MiddlePlayCard
                                        key={index}
                                        holeCardInfo={item}
                                    />
                                )
                        }
                    </div>
                </div>
                <PokerSummary
                    setModalStatus={(bool: any) => setModalStatus(bool)}
                    modalStatus={modalStatus}
                />
            </div>

            <div className='absolute top-[0px] right-[0px] hidden md:block'>
                {
                    Object.keys(chipAmountColor).map((key: any, index: any) =>
                        <div
                            key={index}
                            className='flex justify-start items-center mb-[4px] cursor-pointer text-gray-600 hover:text-gray-100 hover:font-bold transition-all'
                        >
                            <img src={`/assets/images/cheapSVG/chip${key}.png`} alt="image" className="w-[40px] h-[20px] object-cover" />
                            <div className='ml-[12px] flex justify-start'>{key}</div>
                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default PokerTableEnv;
