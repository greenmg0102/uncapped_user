import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userHandInfo } from '../../../../utils/functions/user/report/Report'
import { pokerMarkList } from '../../../../utils/reference'
import { accessTokenDecode } from '../../../../utils/middlewareFunction/accessTokenDecode'
import styles from './Upload.module.css'
import clsx from 'clsx'

import CategoryCircle from './CategoryCircle'
import LuckCircle from './LuckCircle'

const DatabaseOverview = () => {

    const [pokerTypeCount, setPokerTypeCount] = useState([])

    useEffect(() => {

        async function fetchMyAPI() {

            const accessToken = localStorage.getItem('accessToken');
            const detailResult = await userHandInfo(accessTokenDecode(accessToken))
            
            setPokerTypeCount(detailResult)
        }
        fetchMyAPI()

    }, [])

    return (
        <Link
            to="/user/poker/report"
            className='relative w-full flex justify-between items-center flex-wrap sm:h-[350px] border rounded-[6px] border-gray-700 border-dashed transition-all hover:border-solid cursor-pointer hover:border-gray-500'
        >

            <div className='w-full sm:w-1/2 p-2'>
                <CategoryCircle />
            </div>

            <div className='w-full sm:w-1/2 p-2'>
                <LuckCircle />
            </div>

            <img src={`/assets/images/pokerImage/looking.png`} alt="flag" className={clsx(styles.looking_zoom, "w-24 h-24 object-cover absolute right-[10px] bottom-[10px]")} />

        </Link>
    );
};

export default DatabaseOverview;