import Dropdown from '../../../../../../../components/Dropdown';
import { pokerType, tableSize } from '../../../../../../../utils/reference/uploadingFilter'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default function Datafilter({ filter, setFilter }: any) {

  const bufferRange = (range: any) => {
    const startDate = new Date(Date.parse(range[0]));
    const endDate = new Date(Date.parse(range[1]));
    const formattedRange = `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`;
    setFilter({ ...filter, range: formattedRange });
  }

  return (
    <div className="w-full sm:w-1/3 p-2">
      <center className="font-bold text-gray-200 text-[15px]">Data Filters</center>
      <div className='pl-1 mb-1 mt-2'>
        <div className="flex justify-start items-center mb-2 mr-2">
          <p className="w-[70px] text-left mr-0">Net </p>
          <div className="inline-flex">
            <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none btn-sm">
              {filter.pokerType}
            </button>
            <div className="dropdown">
              <Dropdown
                placement='bottom-end'
                btnClassName="btn  btn-sm btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                button={<span className="sr-only"></span>}
              >
                <ul className="!min-w-[170px]">
                  {pokerType.filter((item: any, index: any) => index !== 0).map((item: any, index: any) =>
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => setFilter({ ...filter, pokerType: item.value })}
                      >
                        {item.title}
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center mb-2 mr-2">
          <p className="w-[70px] text-left mr-0">Max </p>
          <div className="inline-flex">
            <button className="btn btn-outline-primary ltr:rounded-r-none rtl:rounded-l-none btn-sm">
              {filter.tableSize}
            </button>
            <div className="dropdown">
              <Dropdown
                placement='bottom-end'
                btnClassName="btn  btn-sm btn-outline-primary ltr:rounded-l-none rtl:rounded-r-none dropdown-toggle before:border-[5px] before:border-l-transparent before:border-r-transparent before:border-t-inherit before:border-b-0 before:inline-block hover:before:border-t-white-light h-full"
                button={<span className="sr-only"></span>}
              >
                <ul className="!min-w-[170px]">
                  {tableSize.map((item: any, index: any) =>
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => setFilter({ ...filter, tableSize: item.value })}
                      >
                        {item.title}
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center mb-2">
          <p className="w-[70px] text-left mr-0 hidden 2xl:block">Date </p>
          <Flatpickr
            options={{
              mode: 'range',
              dateFormat: 'Y-m-d',
              position: 'auto left',
            }}
            value={filter.range}
            className="form-input form-input-sm !border-primary !w-[170px] !px-1 !py-[5px]"
            onChange={(range: any) => bufferRange(range)}
          />
        </div>
      </div>
    </div>
  )
}