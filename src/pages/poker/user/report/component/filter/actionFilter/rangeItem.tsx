import clsx from 'clsx'

export default function RangeItem({ value, height, setValueStatus, valueStatus, type, list, bufferRportingStatue }: any) {

  return (
    <div className={`pb-[1px] px-[1px] h-[${height}px]`}>
      {
        <div
          className={clsx("transition-all rounded-[4px] cursor-pointer hover:bg-gray-800", list.includes(value) ? "bg-gray-500 text-gray-200" : "bg-gray-900")}
          onClick={() => bufferRportingStatue(type, value)}
        >
          <div className="text-center">
            {value === 398750 ? 40 : value}
          </div>
        </div>
      }
    </div>
  )
}