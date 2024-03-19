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
                                    userInfo && userInfo.socialAvatar ?
                                        <img
                                            className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                            src={userInfo && userInfo.socialAvatar}
                                            alt="userProfile"
                                        />
                                        :
                                        <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </div>
                                }
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            {
                                                userInfo && userInfo.socialAvatar ?
                                                    <img
                                                        className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                                        src={userInfo && userInfo.socialAvatar} alt="userProfile"
                                                    />
                                                    :
                                                    <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                                            <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
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
