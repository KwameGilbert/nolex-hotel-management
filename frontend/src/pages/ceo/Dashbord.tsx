import CeoDashboardStat from "../../components/ceo-components/DashboardStat"
import { OccupancyChart } from "../../components/ceo-components/OccupancyRate"
import { RevenueChart } from "../../components/ceo-components/Revenue"


const CeoDashbord = () => {
  return (
    <div>
      <CeoDashboardStat/>

      <div className="flex flex-col md:flex-row gap-4 py-5">
        <div className="bg-white p-4 rounded-md flex-[1]">
        <h2 className="text-xl font-semibold">Revenue Trend</h2>
        <p className="text-gray-600 mb-4">Monthly revenue performance across all properties</p>
        <RevenueChart/>
        </div>
        <div className="flex-[1]">
        <OccupancyChart/>
        </div>
      </div>
    </div>
  )
}

export default CeoDashbord
