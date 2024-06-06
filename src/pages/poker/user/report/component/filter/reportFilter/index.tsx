import ReportButton from "./reportButton"


export default function ReportFilter({ valueStatus, setValueStatus, defaultReportSetting, heroPosition, stackDepth, VillianPosition, bufferRportingStatue }: any) {

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
              isClickable={false}
              value={valueStatus["action"]}
              type={"action"}
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

      </div>
    </div>
  )
}