import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';

import ChartComparison from './chartComparison';
import GradientHeat from './gradientHeat';
import DetailTable from './detailTable';
import Histogram from './histogram';


export default function TableChart({ page, PAGE_SIZES, pageSize, filter, valueStatus, heroPosition, stackDepth, VillianPosition, userTab, userInfoResult, reportingResult, setInterestingPair, setIsGradient }: any) {

    const [reportItemActive, setReportItemActive] = useState("")

    return (
        <div className="w-full xl:w-[70%] pr-0 xl:pr-2">

            <Tab.Group>
                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => setIsGradient(false)}
                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''} dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}>
                                Chart Comparison
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => setIsGradient(true)}
                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''} dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}>
                                Gradient Heat
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => setIsGradient(false)}
                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''} dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}>
                                Detail Table
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                onClick={() => setIsGradient(false)}
                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black' : ''} dark:hover:border-b-black -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}>
                                Histogram
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <div className='px-1'>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ChartComparison
                                userTab={userTab}
                                userInfoResult={userInfoResult}
                                reportingResult={reportingResult}
                                reportItemActive={reportItemActive}
                                setInterestingPair={(pair: any) => setInterestingPair(pair)}
                                setReportItemActive={(item: any) => setReportItemActive(item)}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <GradientHeat
                                filter={filter}
                                valueStatus={valueStatus}
                                heroPosition={heroPosition}
                                stackDepth={stackDepth}
                                VillianPosition={VillianPosition}
                                userTab={userTab}
                                userInfoResult={userInfoResult}
                                reportingResult={reportingResult}
                                reportItemActive={reportItemActive}
                                setInterestingPair={(pair: any) => setInterestingPair(pair)}
                                setReportItemActive={(item: any) => setReportItemActive(item)}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <DetailTable
                                page={page}
                                pageSize={pageSize}
                                PAGE_SIZES={PAGE_SIZES}
                                filter={filter}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            <Histogram
                                filter={filter}
                                userInfoResult={userInfoResult}
                                reportingResult={reportingResult}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </div>

            </Tab.Group>

        </div>
    )
}