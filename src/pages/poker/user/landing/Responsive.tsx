import './style.css'

export default function Responsive() {

    return (
        <div className="sm:flex transition-all">
            <div className="relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] dark:before:border-[#191e3a] before:hidden sm:before:block">
                <img src="/assets/images/profile-16.jpg" alt="img" className="w-18 h-18 md:w-14 md:h-14 2xl:w-12 2xl:h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)] transition-all" />
            </div>
            <div className="flex-1">
                <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">Is it only available on the web?</h4>
                <p className="text-center ltr:sm:text-left rtl:sm:text-right">We guarantee operation on all devices!</p>
                <p className="text-center ltr:sm:text-left rtl:sm:text-right"></p>
                <div className="mt-1 sm:mt-1 w-full pr-0 lg:pr-24 py-12 pb-24">
                    <div className='flex justify-center justify-between items-center flex-wrap w-full' >
                        <div className='w-full 2xl:w-1/2 flex justify-center'>
                            <img src="/assets/images/pokerImage/Capture7_1.png" alt="radar" className="opacity-[100%] transition-all rounded-[30px] md:rounded-2xl xl:rounded-xl element_laptop" />
                        </div>
                        <div className='w-full 2xl:w-1/2 pl-0 mt-12 2xl:pl-24 2xl:mt-0 flex justify-center'>
                            <img src="/assets/images/pokerImage/Capture7_2.png" alt="radar" className="opacity-[100%] transition-all rounded-[30px] md:rounded-2xl xl:rounded-xl element_mobile" />
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}