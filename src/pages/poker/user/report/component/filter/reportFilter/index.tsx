import { useEffect, useState } from 'react'
import ReportButton from "./reportButton"
import { pokerStreetOptionUser } from '../../../../../../../utils/reference/playCardColor'
import StreetItem from './secondPanel'

export default function ReportFilter({ userTab, isGradinet, setUserTab, valueStatus, setValueStatus, reportingResult, defaultReportSetting, heroPosition, stackDepth, VillianPosition, bufferRportingStatue }: any) {

  const [critical, setCritical] = useState([false, false, false, false, true])

  useEffect(() => {

    let critical = [false, false, false, false, true]

    Object.keys(reportingResult).forEach((key: any) => {
      reportingResult[key].played.forEach((item: any, index: any) => {
        critical[index] = critical[index] ? critical[index] : !critical[index] && item !== 0
      })
    })

    setCritical(critical)

  }, [reportingResult])

  useEffect(() => {
    if (isGradinet) setUserTab(1)
  }, [isGradinet])

  return (
    <div className="w-full sm:w-1/3 p-2">
      <center className="font-bold text-gray-200 text-[15px]">Report Filters</center>
      <div className=" flex justify-between items-center flex-wrap mt-2">

        <div className="flex justify-start items-center mt-[2px] w-1/2 sm:w-full">
          <div className="flex justify-between items-center mr-1 w-[60px]">
            <p>Action</p>
          </div>
          {valueStatus["action"] !== "" ?
            <ReportButton
              type={"action"}
              isClickable={false}
              value={valueStatus["action"]}
              list={[valueStatus["action"]]}
            />
            :
            <p className="border border-gray-500 rounded-[4px] px-4">Empty</p>
          }
        </div>

        <div className="flex justify-start items-center mt-[2px] w-1/2 sm:w-full">
          <div className="flex justify-between items-center mr-1 w-[60px]">
            <p>Hero</p>
          </div>
          {valueStatus.heroPosition !== "" ? defaultReportSetting.heroPosition.find((item: any) => item.title === valueStatus.heroPosition).stringList.map((item: any, index: any) =>
            <ReportButton
              key={index}
              value={item}
              type={"heroPosition"}
              list={heroPosition}
              bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
            />
          ) :
            <p className="border border-gray-500 rounded-[4px] px-4">Empty</p>
          }
        </div>

        <div className="flex justify-start items-center mt-[2px] w-1/2 sm:w-full">
          <div className="flex justify-between items-center mr-1 w-[60px]">
            <p>Stack</p>
          </div>
          {valueStatus.stackDepth !== "" ? defaultReportSetting.stackDepth.find((item: any) => item.title === valueStatus.stackDepth).valueList.map((item: any, index: any) =>
            <ReportButton
              key={index}
              value={item}
              type={"stackDepth"}
              list={stackDepth}
              bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
            />
          ) :
            <p className="border border-gray-500 rounded-[4px] px-4">Empty</p>
          }
        </div>

        <div className="flex justify-start items-center mt-[2px] w-1/2 sm:w-full">
          <div className="flex justify-between items-center mr-1 w-[60px]">
            <p>Villain</p>
          </div>
          {valueStatus.VillianPosition !== "" ? defaultReportSetting.VillianPosition.find((item: any) => item.title === valueStatus.VillianPosition).stringList.map((item: any, index: any) =>
            <ReportButton
              key={index}
              value={item}
              type={"VillianPosition"}
              list={VillianPosition}
              bufferRportingStatue={(type: any, list: any) => bufferRportingStatue(type, list)}
            />
          ) :
            <p className="border border-gray-500 rounded-[4px] px-4">Empty</p>
          }
        </div>

        <div className='w-full mt-2 flex justify-center items-center flex-wrap'>
          {pokerStreetOptionUser.slice(0, isGradinet ? 4 : 5).map((item: any, index: any) =>
            <StreetItem
              key={index}
              item={item}
              userTab={userTab}
              critical={critical[index]}
              action={valueStatus.action}
              setUserTab={(order: any) => setUserTab(order)}
            />
          )}
        </div>

      </div>
    </div>
  )
}