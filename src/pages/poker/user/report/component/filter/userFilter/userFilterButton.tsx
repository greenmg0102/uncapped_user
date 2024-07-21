
import clsx from 'clsx'
export default function UserFilterButton({ icon, value }: any) {
  return (
    <div className='flex items-center mt-1 w-1/4'>
      <p className="text-left mr-1">
        <img
          src={icon}
          alt={icon}
          className="max-w-[16px] w-full m-auto"
        />
      </p>
      <p className='text-gray-400'> {value}</p>
    </div>
  )
}