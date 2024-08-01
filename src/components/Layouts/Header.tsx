import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx'
import { IRootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { accessTokenDecode, expireTimeDecode } from '../../utils/middlewareFunction/accessTokenDecode';
import { profileGet } from '../../utils/functions/usage/profile/profile'
import { notificationRead } from '../../utils/functions/user/notification'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Dropdown from '../Dropdown';

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const loadingStatus = useSelector((state: IRootState) => state.uploadingStatusSlice.current);
    const totalHand = useSelector((state: IRootState) => state.uploadingStatusSlice.total);
    const passedTime = useSelector((state: IRootState) => state.uploadingStatusSlice.passedTime);
    const fileStatus = useSelector((state: IRootState) => state.uploadingStatusSlice.fileData);
    const complete = useSelector((state: IRootState) => state.uploadingStatusSlice.complete);
    const rejected = useSelector((state: IRootState) => state.uploadingStatusSlice.rejected);

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        socialAvatar: '',
        user: {
            email: ''
        }
    })

    const [profileAvailable, setProfileAvailable] = useState(true)

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken !== null && refreshToken !== null) {
            async function fetchData() {
                let result = await profileGet(accessTokenDecode(accessToken)).then()
                setUserInfo(result)
            }
            fetchData()
            setProfileAvailable(expireTimeDecode(accessToken))
        } else setProfileAvailable(false)

    }, [])

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);


    function displayTime(seconds: any) {
        if (seconds < 59) {
            seconds++;
            return `${seconds} seconds`;
        } else if (seconds > 59 && seconds < 3600) {
            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;
            return `${minutes} minutes ${remainingSeconds} seconds`;
        } else {
            let hours = Math.floor(seconds / 3600);
            let remainingMinutes = Math.floor((seconds % 3600) / 60);
            let remainingSeconds = seconds % 60;
            return `${hours} hour ${remainingMinutes} minutes ${remainingSeconds} seconds`;
        }
    }


    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await notificationRead({})

            let real: any = []

            result.forEach((item: any, index: any) => {
                real.push({
                    id: index + 1,
                    profile: 'profile-16.jpg',
                    sender: `<strong">${item.sender}</strong>`,
                    message: `<strong class="text-sm mr-1">${item.content}</strong>`,
                    time: item.createdAt.slice(0, 10),
                })
            });
            setNotifications(real)
        }
        fetchData()
    }, [])

    const removeNotification = (value: number) => {
        setNotifications(notifications.filter((user: any) => user.id !== value));
    };

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };

    const [flag, setFlag] = useState(themeConfig.locale);

    const { t } = useTranslation();

    const gotoPath = (path: any) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate(path);
    }


    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex justify-between w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="main-logo flex items-end shrink-0">
                            <img className="w-12 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.png" alt="logo" />
                            <img className="w-36 text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300" src="/assets/images/mark.png" alt="mark" />
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="">

                    </div>
                    <div className="sm: ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">

                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60 rounded-[4px]"
                                button={
                                    <div className={clsx(totalHand === 0 ? "hidden" : "flex justify-center items-end cursor-pointer bg-dark/40 py-2 px-2 rounded-[4px] border border-green-800")}>
                                        <p className='text-red-400 text-[18px]'>{(loadingStatus === 0 ? 0 : loadingStatus * 100 / totalHand).toFixed(0)} <span className='text-[12px] text-gray-400'> %</span></p>
                                        <div className='flex justify-center items-end px-2'>
                                            <p className='text0-center text-gray-200 text-[14px] mb-0'>{totalHand} / </p>
                                            <p className='text0-center text-gray-300 text-[10px] mb-0'>{loadingStatus}</p>
                                        </div>
                                        <p className='text-green-400'>{displayTime(passedTime)}</p>
                                    </div>
                                }
                            >
                                <div className='border border-green-800 w-[280px] mt-12 p-2 bg-gray-900'>
                                    {/* <div className="w-full h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                        <div
                                            className="bg-warning h-1.5 rounded-full rounded-bl-full text-center text-white text-xs transition-all"
                                            style={{ width: `calc(${(complete) * (100 / (totalHand - rejected))}%)` }}
                                        ></div>
                                    </div>
                                    <p className='text-center mt-2'>Active Upload</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-400 text-[12px]'>Total Files</p>
                                        <p className='text-gray-400 text-[12px]'>{totalHand}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-400 text-[12px]'>Completed Files</p>
                                        <p className='text-gray-400 text-[12px]'>{complete}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-400 text-[12px]'>Rejected Files</p>
                                        <p className='text-gray-400 text-[12px]'>{rejected}</p>
                                    </div> */}
                                    <p className='text-center mt-2'>Upload Status</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-gray-300 mt-2 mb-1'>File Size</p>
                                        <p className='text-gray-400 text-[12px]'>{fileStatus.fileSize} KBytes</p>
                                    </div>
                                    <p className='text-gray-300 mt-2 mb-1'>File Name</p>
                                    <p className='text-gray-400 text-[12px]'>{fileStatus.filename}</p>
                                </div>
                            </Dropdown>
                        </div>

                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={<img className="w-5 h-5 object-cover rounded-full" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
                            >
                                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                    {themeConfig.languageList.map((item: any) => {
                                        return (
                                            <li key={item.code}>
                                                <button
                                                    type="button"
                                                    className={`flex w-full hover:text-primary rounded-lg ${i18next.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                    onClick={() => {
                                                        i18next.changeLanguage(item.code);
                                                        // setFlag(item.code);
                                                        setLocale(item.code);
                                                    }}
                                                >
                                                    <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                    <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Dropdown>
                        </div>

                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M12 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                            <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                        </span>
                                    </span>
                                }
                            >
                                <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 className="text-lg">Notification</h4>
                                            {notifications.length ? <span className="badge bg-primary/80">{notifications.length}New</span> : ''}
                                        </div>
                                    </li>
                                    {notifications.length > 0 ? (
                                        <>
                                            {notifications.map((notification: any) => {
                                                return (
                                                    <li key={notification.id} className="dark:text-white-light/90" onClick={(e) => e.stopPropagation()}>
                                                        <div className="group flex items-center px-4 py-2">
                                                            <div className="grid place-content-center rounded">
                                                                <div className="w-12 h-12 relative">
                                                                    <img className="w-12 h-12 rounded-full object-cover" alt="profile" src={`/assets/images/${notification.profile}`} />
                                                                    <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                                </div>
                                                            </div>
                                                            <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                                <div className="ltr:pr-3 rtl:pl-3">
                                                                    <span
                                                                        className="text-sm block font-normal dark:text-gray-400"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: notification.sender,
                                                                        }} />
                                                                    <h6
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: notification.message,
                                                                        }}
                                                                    ></h6>
                                                                    <span className="text-xs block font-normal dark:text-gray-500">{notification.time}</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                                    onClick={() => removeNotification(notification.id)}
                                                                >
                                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                                        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                            <li>
                                                <div className="p-4">
                                                    <button className="btn btn-primary block w-full btn-small">Read All Notifications</button>
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <li onClick={(e) => e.stopPropagation()}>
                                            <button type="button" className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="40"
                                                        height="40"
                                                        viewBox="0 0 24 24"
                                                        fill="#a9abb6"
                                                        stroke="#ffffff"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-info bg-primary rounded-full"
                                                    >
                                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                                    </svg>
                                                </div>
                                                No data available.
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </Dropdown>
                        </div>
                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={
                                    userInfo && userInfo.socialAvatar && !userInfo.socialAvatar.includes("stickpng") ?
                                        <img
                                            className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                            src={userInfo && userInfo.socialAvatar}
                                            alt="userProfile"
                                        />
                                        :
                                        <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                            <svg height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 511.659 511.659" >
                                                <path style={{ fill: "#AAB2BC" }} d="M350.723,373.365c1.374,5.137-1.671,10.431-6.809,11.805l-242.008,64.85
                                        c-5.137,1.374-10.415-1.687-11.789-6.824L0.33,108.121c-1.374-5.138,1.671-10.416,6.808-11.79L249.14,31.482
                                        c5.137-1.374,10.431,1.671,11.805,6.808L350.723,373.365z"/>
                                                <path style={{ fill: "#434A54" }} d="M87.759,126.374c-1.421-5.31-6.886-8.464-12.195-7.042l-9.635,2.577l-2.576-9.635
                                        c-1.421-5.309-6.886-8.463-12.211-7.042c-5.309,1.421-8.463,6.886-7.042,12.211l2.577,9.618l-9.635,2.593
                                        c-5.309,1.421-8.463,6.886-7.042,12.195c1.421,5.324,6.886,8.479,12.211,7.058l9.619-2.592l2.592,9.634
                                        c1.421,5.309,6.886,8.479,12.195,7.042c5.325-1.421,8.479-6.887,7.058-12.195l-2.576-9.635l9.619-2.576
                                        C86.025,137.164,89.195,131.699,87.759,126.374z"/>
                                                <path style={{ fill: "#CCD1D9" }} d="M355.204,408.296c0,5.324-4.31,9.635-9.634,9.635H95.035c-5.325,0-9.634-4.311-9.634-9.635V61.4
                                        c0-5.309,4.31-9.634,9.634-9.634H345.57c5.324,0,9.634,4.325,9.634,9.634V408.296z"/>
                                                <g>
                                                    <path style={{ fill: "#434A54" }} d="M168.004,96.05c-5.715-15.693-23.781-22.174-27.357-23.313l-3.029-0.968l-3.045,0.968
                                        	c-3.56,1.14-21.626,7.62-27.342,23.329c-4.778,12.71-0.125,26.327,11.087,32.401l0.406,0.218c2.249,1.093,4.716,1.64,7.37,1.64l0,0
                                        	c4.451,0,8.573-1.593,11.461-2.889c2.92,1.312,7.058,2.904,11.524,2.904c2.67,0,5.168-0.562,7.433-1.655l0.406-0.218
                                        	C168.129,122.392,172.782,108.776,168.004,96.05z"/>
                                                    <path style={{ fill: "#434A54" }} d="M147.58,131.512v-7.371h-19.925v7.371c-5.512,0-9.978,4.45-9.978,9.962
                                        	c0,5.496,4.466,9.962,9.978,9.962h19.925c5.512,0,9.962-4.466,9.962-9.962C157.542,135.962,153.092,131.512,147.58,131.512z"/>
                                                </g>
                                                <path style={{ fill: "#D7DADD" }} d="M350.504,443.195c-1.39,5.138-6.668,8.198-11.805,6.824L96.706,385.17
                                        c-5.153-1.374-8.198-6.668-6.824-11.805L179.668,38.29c1.374-5.137,6.667-8.182,11.805-6.808l241.993,64.849
                                        c5.137,1.374,8.197,6.652,6.808,11.79L350.504,443.195z"/>
                                                <polygon style={{ fill: "#ED5564" }} points="227.341,61.728 185.946,91.912 206.698,138.742 248.093,108.558 " />
                                                <path style={{ fill: "#E6E9ED" }} d="M336.919,475.69c-2.671,4.606-8.558,6.184-13.163,3.528L106.793,353.956
                                        c-4.622-2.671-6.199-8.558-3.529-13.164L276.707,40.367c2.654-4.606,8.558-6.184,13.164-3.529l216.971,125.279
                                        c4.605,2.655,6.184,8.558,3.529,13.164L336.919,475.69z"/>
                                                <g>
                                                    <path style={{ fill: "#ED5564" }} d="M287.451,126.171l3.123,0.671c1.217,0.265,5.59,1.125,11.242,1.125l0,0
                                        	c9.807,0,18.145-2.639,24.109-7.651c10.494-8.62,13.273-22.735,6.605-33.604l-0.25-0.391c-4.419-6.527-12.008-7.823-16.942-8.338
                                        	c-2.842-3.919-7.933-9.978-15.786-10.556l-0.453-0.031c-0.219,0-0.453,0-0.672,0c-12.602,0-22.938,9.259-25.141,22.548
                                        	c-2.881,16.442,9.51,31.089,12.024,33.869L287.451,126.171z"/>
                                                    <path style={{ fill: "#ED5564" }} d="M341.775,401.472l-0.25-0.39c-4.435-6.527-12.008-7.823-16.942-8.339
                                        	c-2.842-3.919-7.933-9.993-15.802-10.556l-0.453-0.031c-0.219,0-0.438,0-0.656,0c-12.617,0-22.938,9.26-25.141,22.548
                                        	c-2.904,16.443,9.51,31.09,12.024,33.869l2.14,2.358l3.123,0.671c1.201,0.266,5.59,1.124,11.242,1.124l0,0
                                        	c9.807,0,18.129-2.639,24.094-7.651C345.648,426.456,348.443,412.324,341.775,401.472z"/>
                                                    <path style={{ fill: "#ED5564" }} d="M356.937,236.273l-0.234-0.391c-6.605-9.729-20.893-12.352-29.621-13.039
                                        	c-1.188-1.733-2.718-3.763-4.467-5.856c-7.011-8.244-14.271-12.71-21.564-13.241l-0.452-0.016c-0.344-0.016-0.688-0.016-1.03-0.016
                                        	c-19.551,0-35.595,14.6-39.046,35.493c-4.934,27.841,18.074,54.114,20.714,57.035l2.154,2.357l3.107,0.672
                                        	c1.483,0.327,9.4,1.936,19.534,1.936l0,0c16.583,0,30.496-4.325,40.225-12.508c8.245-6.745,13.601-15.428,15.521-25.054
                                        	C363.668,254.152,361.949,244.424,356.937,236.273z"/>
                                                </g>
                                            </svg>
                                        </div>
                                }
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            {
                                                userInfo && userInfo.socialAvatar && !userInfo.socialAvatar.includes("stickpng") ?
                                                    <img
                                                        className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                                        src={userInfo && userInfo.socialAvatar} alt="userProfile"
                                                    />
                                                    :
                                                    <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                        <svg height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 511.659 511.659" >
                                                            <path style={{ fill: "#AAB2BC" }} d="M350.723,373.365c1.374,5.137-1.671,10.431-6.809,11.805l-242.008,64.85
                                        c-5.137,1.374-10.415-1.687-11.789-6.824L0.33,108.121c-1.374-5.138,1.671-10.416,6.808-11.79L249.14,31.482
                                        c5.137-1.374,10.431,1.671,11.805,6.808L350.723,373.365z"/>
                                                            <path style={{ fill: "#434A54" }} d="M87.759,126.374c-1.421-5.31-6.886-8.464-12.195-7.042l-9.635,2.577l-2.576-9.635
                                        c-1.421-5.309-6.886-8.463-12.211-7.042c-5.309,1.421-8.463,6.886-7.042,12.211l2.577,9.618l-9.635,2.593
                                        c-5.309,1.421-8.463,6.886-7.042,12.195c1.421,5.324,6.886,8.479,12.211,7.058l9.619-2.592l2.592,9.634
                                        c1.421,5.309,6.886,8.479,12.195,7.042c5.325-1.421,8.479-6.887,7.058-12.195l-2.576-9.635l9.619-2.576
                                        C86.025,137.164,89.195,131.699,87.759,126.374z"/>
                                                            <path style={{ fill: "#CCD1D9" }} d="M355.204,408.296c0,5.324-4.31,9.635-9.634,9.635H95.035c-5.325,0-9.634-4.311-9.634-9.635V61.4
                                        c0-5.309,4.31-9.634,9.634-9.634H345.57c5.324,0,9.634,4.325,9.634,9.634V408.296z"/>
                                                            <g>
                                                                <path style={{ fill: "#434A54" }} d="M168.004,96.05c-5.715-15.693-23.781-22.174-27.357-23.313l-3.029-0.968l-3.045,0.968
                                        	c-3.56,1.14-21.626,7.62-27.342,23.329c-4.778,12.71-0.125,26.327,11.087,32.401l0.406,0.218c2.249,1.093,4.716,1.64,7.37,1.64l0,0
                                        	c4.451,0,8.573-1.593,11.461-2.889c2.92,1.312,7.058,2.904,11.524,2.904c2.67,0,5.168-0.562,7.433-1.655l0.406-0.218
                                        	C168.129,122.392,172.782,108.776,168.004,96.05z"/>
                                                                <path style={{ fill: "#434A54" }} d="M147.58,131.512v-7.371h-19.925v7.371c-5.512,0-9.978,4.45-9.978,9.962
                                        	c0,5.496,4.466,9.962,9.978,9.962h19.925c5.512,0,9.962-4.466,9.962-9.962C157.542,135.962,153.092,131.512,147.58,131.512z"/>
                                                            </g>
                                                            <path style={{ fill: "#D7DADD" }} d="M350.504,443.195c-1.39,5.138-6.668,8.198-11.805,6.824L96.706,385.17
                                        c-5.153-1.374-8.198-6.668-6.824-11.805L179.668,38.29c1.374-5.137,6.667-8.182,11.805-6.808l241.993,64.849
                                        c5.137,1.374,8.197,6.652,6.808,11.79L350.504,443.195z"/>
                                                            <polygon style={{ fill: "#ED5564" }} points="227.341,61.728 185.946,91.912 206.698,138.742 248.093,108.558 " />
                                                            <path style={{ fill: "#E6E9ED" }} d="M336.919,475.69c-2.671,4.606-8.558,6.184-13.163,3.528L106.793,353.956
                                        c-4.622-2.671-6.199-8.558-3.529-13.164L276.707,40.367c2.654-4.606,8.558-6.184,13.164-3.529l216.971,125.279
                                        c4.605,2.655,6.184,8.558,3.529,13.164L336.919,475.69z"/>
                                                            <g>
                                                                <path style={{ fill: "#ED5564" }} d="M287.451,126.171l3.123,0.671c1.217,0.265,5.59,1.125,11.242,1.125l0,0
                                        	c9.807,0,18.145-2.639,24.109-7.651c10.494-8.62,13.273-22.735,6.605-33.604l-0.25-0.391c-4.419-6.527-12.008-7.823-16.942-8.338
                                        	c-2.842-3.919-7.933-9.978-15.786-10.556l-0.453-0.031c-0.219,0-0.453,0-0.672,0c-12.602,0-22.938,9.259-25.141,22.548
                                        	c-2.881,16.442,9.51,31.089,12.024,33.869L287.451,126.171z"/>
                                                                <path style={{ fill: "#ED5564" }} d="M341.775,401.472l-0.25-0.39c-4.435-6.527-12.008-7.823-16.942-8.339
                                        	c-2.842-3.919-7.933-9.993-15.802-10.556l-0.453-0.031c-0.219,0-0.438,0-0.656,0c-12.617,0-22.938,9.26-25.141,22.548
                                        	c-2.904,16.443,9.51,31.09,12.024,33.869l2.14,2.358l3.123,0.671c1.201,0.266,5.59,1.124,11.242,1.124l0,0
                                        	c9.807,0,18.129-2.639,24.094-7.651C345.648,426.456,348.443,412.324,341.775,401.472z"/>
                                                                <path style={{ fill: "#ED5564" }} d="M356.937,236.273l-0.234-0.391c-6.605-9.729-20.893-12.352-29.621-13.039
                                        	c-1.188-1.733-2.718-3.763-4.467-5.856c-7.011-8.244-14.271-12.71-21.564-13.241l-0.452-0.016c-0.344-0.016-0.688-0.016-1.03-0.016
                                        	c-19.551,0-35.595,14.6-39.046,35.493c-4.934,27.841,18.074,54.114,20.714,57.035l2.154,2.357l3.107,0.672
                                        	c1.483,0.327,9.4,1.936,19.534,1.936l0,0c16.583,0,30.496-4.325,40.225-12.508c8.245-6.745,13.601-15.428,15.521-25.054
                                        	C363.668,254.152,361.949,244.424,356.937,236.273z"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                            }

                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">
                                                    {userInfo && userInfo.firstName}  {userInfo && userInfo.lastName}
                                                    <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {userInfo && userInfo.user && userInfo.user.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/users/profile" className="dark:hover:text-white">
                                            <svg className="ltr:mr-2 rtl:ml-2 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                <path
                                                    opacity="0.5"
                                                    d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <div onClick={() => gotoPath("/auth/boxed-signin")} className="flex justify-start items-center text-danger cursor-pointer !py-3 px-4">
                                            <svg className="ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    opacity="0.5"
                                                    d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                                <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {profileAvailable ? 'Sign Out' : 'J o i n'}
                                        </div>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;
