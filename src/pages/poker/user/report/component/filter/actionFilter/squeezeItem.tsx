import clsx from 'clsx'

export default function SqueezeItem({ value, height, handleSqueeze, validationItem, type }: any) {

  return (
    <div className={`pb-[1px] px-[1px] h-[${height}px]`}>
      {
        <div
          className={clsx("transition-all rounded-[4px] cursor-pointer hover:bg-gray-800", validationItem === value ? "bg-gray-500 text-gray-200" : "bg-gray-900")}
          onClick={handleSqueeze}
        >
          <div className="text-center">
            {value}
          </div>
        </div>
      }
    </div>
  )
}