import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { userHandInfo } from '../../../../../../../utils/functions/user/report/Report'
import { pokerMarkList } from '../../../../../../../utils/reference'
import UserFilterButton from "./userFilterButton"

export default function UserFilter() {

  const navigate = useNavigate();
  const [pokerTypeCount, setPokerTypeCount] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      const data = {}
      const response = await userHandInfo(data)
      setPokerTypeCount(response)
    }
    fetchMyAPI()
  }, [])

  return (
    <div className="w-full sm:w-1/3 border border-dashed border-gray-500 border-y-[1px] border-x-[0px] sm:border-x-[1px] sm:border-y-[0px]  p-2">
      <center className="font-bold text-gray-200 text-[15px]">User Info</center>
      <div className="flex justify-start items-center mt-2 ">
        <div className="flex justify-start items-center mr-1">
          <p>Hand History</p>
        </div>
        <div className="text-gray-300 text-[20px]">{pokerTypeCount.reduce((previous: any, after: any) => previous + after.count, 0)}</div>
      </div>

      <div className="flex justify-start items-center flex-wrap my-2">
        {pokerTypeCount.map((item: any, index: any) =>
          <UserFilterButton
            key={index}
            icon={pokerMarkList.filter((each: any) => each.value === item._id)[0].image}
            value={item.count}
            item={item.count}
            pokerMarkList={pokerMarkList}
          />
        )}
      </div>
      <div
        className="border border-blue-700 text-blue-700 text-[12px] font-bold text-center rounded-[4px] py-[1px] hover:border-gray-300 hover:text-gray-300 transition-all cursor-pointer"
        onClick={() => navigate('/user/poker/upload')}
      >
        Import more hands
      </div>
    </div>
  )
}