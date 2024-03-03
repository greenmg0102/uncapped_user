import { getChipStatus, getBBStatus } from '../../../utils/functions/chipCalculate'
import { chipAmountColor, chipAmountColorInBB } from '../../../utils/reference/playCardArray'
import styles from '../pokerTable/PokerTable.module.css'
import clsx from 'clsx'

export const ChipStatus = ({ totalBet }: any) => {

    return <div className='flex justify-center items-end'>
        {Object.keys(getChipStatus(totalBet)).map((key: any, index: any) =>
            <div
                key={index}
                className='relative mr-[30px]'
            >
                {Array(getChipStatus(totalBet)[key]).fill(0).map((item: any, order: any) =>
                    <div
                        className='absolute w-[40px] h-[20px]'
                        style={{
                            bottom: 5 * order
                        }}
                    >
                        <div className={styles.rotate_svg}>
                            <img
                                src={`/assets/images/cheapSVG/chip${key}.png`}
                                alt="image"
                                className="w-[40px] h-[20px] object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
}


export const BBStatus = (totalBet: any, status: any) => {

    return <div>
        <div className='flex justify-center items-end'>
            {Object.keys(getBBStatus(totalBet)).map((key: any, index: any) =>
                <div
                    key={index}
                    className='flex flex-col'
                >
                    {Array(getBBStatus(totalBet)[key]).fill(0).map((item: any, order: any) =>
                        <div
                            key={order}
                            className='w-[6px] h-[6px] mb-[1px] rounded-full'
                            style={{ background: chipAmountColorInBB[key] }}
                        />
                    )}
                </div>
            )}
        </div>
        <p className={clsx('text-center mb-0 text-[12px]', distinguishColor(status))}>
            {totalBet}
        </p>
    </div>
}

export const distinguishColor = (status: any): any => {
    return "text-gray-200"
}