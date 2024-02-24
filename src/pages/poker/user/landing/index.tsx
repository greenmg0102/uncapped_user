import Radar from './Radar'
import Analyze from './Analyze'
import Compare from './Compare'
import Review from './Review'
import Stastic from './Stastic'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '../../../../store/themeConfigSlice';

export default function Landing() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Landing'));
    });

    return (
        <div>
            <div className="w-full lg:w-[70%] xl:w-[75%] mb-5 transition-all">
                <div id="radar" className="mb-4"></div>
                <Radar />
                <Analyze />
                <Compare />
                <Review />
            </div>
            <div className='w-full static lg:top-1/2 lg:right-0 lg:transform lg:-translate-y-1/2 lg:fixed lg:w-[30%] xl:w-[25%] border border-gray-700 border-dashed rounded-[12px] px-6 pt-6 transition-all'>
                <Stastic />
            </div>
        </div>
    )
}