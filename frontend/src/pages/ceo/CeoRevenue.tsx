import RevenueSourceStat from "../../components/ceo-components/RevenueSourceStat"
import RevenueStat from "../../components/ceo-components/RevenueStat"
import RevenueTrend from "../../components/ceo-components/RevenueTrend"


const CeoRevenue = () => {
  return (
    <div>
      <RevenueStat/>
      <div className="flex flex-col md:flex-row py-5 gap-5 mb-5">
        <div className="flex-[1]">
          <RevenueTrend/>
        </div>
        <div className="flex-[1]">
          <RevenueSourceStat/>
        </div>
      </div>
    </div>
  )
}

export default CeoRevenue
