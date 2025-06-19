import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "lucide-react";
import { Progress } from "../ui/progress"
const BranchesRevenue = () => {
  const propertyRevenue = [
    { property: "Grand Plaza Downtown", revenue: 8500000, growth: 12.5, rooms: 450 },
    { property: "Seaside Resort", revenue: 7200000, growth: 8.3, rooms: 380 },
    { property: "Mountain View Lodge", revenue: 5800000, growth: -2.1, rooms: 280 },
    { property: "City Center Hotel", revenue: 6900000, growth: 15.7, rooms: 320 },
    { property: "Airport Suites", revenue: 4200000, growth: 5.2, rooms: 200 },
  ]
  return (
    <Card>
    <CardHeader>
      <CardTitle>Property Revenue Performance</CardTitle>
      <CardDescription>Revenue and growth by property</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {propertyRevenue.map((property) => (
          <div key={property.property} className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{property.property}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={property.growth > 0 ? "default" : "destructive"}>
                    {property.growth > 0 ? "+" : ""}
                    {property.growth}%
                  </Badge>
                  <span className="text-sm font-medium">${(property.revenue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={(property.revenue / 8500000) * 100} className="flex-1" />
                <span className="text-xs text-muted-foreground">{property.rooms} rooms</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}

export default BranchesRevenue
