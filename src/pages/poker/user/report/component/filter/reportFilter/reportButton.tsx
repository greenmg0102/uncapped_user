import clsx from 'clsx'

export default function ReportButton({ value, isClickable, list, type, bufferRportingStatue }: any) {

  return (
    <div
      className={
        clsx(
          "hover:bg-gray-700 cursor-pointer rounded-[4px] mr-1 px-[3px] py-[1px] mb-0 text-[12px] block sm:inline-block transition-all",
          list.includes(value) ? "bg-gray-500 text-gray-100 font-semibold" : "bg-gray-900 text-gray-400 border border-dashed border-gray-600"
        )
      }
      onClick={() => bufferRportingStatue(type, value)}
    >
      {value === 398750 ? 40 : value}
    </div>
  )
}