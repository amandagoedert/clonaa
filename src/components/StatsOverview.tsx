
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Award } from "lucide-react"

const stats = [
  {
    title: "Projetos Clonados",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: TrendingUp,
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  {
    title: "Templates Gerados",
    value: "456",
    change: "+8%",
    trend: "up",
    icon: Zap,
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  {
    title: "Usuários Ativos",
    value: "2,890",
    change: "+23%",
    trend: "up",
    icon: Users,
    gradient: "bg-gradient-to-r from-green-500 to-green-600"
  },
  {
    title: "Taxa de Sucesso",
    value: "98.5%",
    change: "+2%",
    trend: "up",
    icon: Award,
    gradient: "bg-gradient-to-r from-orange-500 to-orange-600"
  }
]

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.gradient}`}>
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>{stat.change} do mês passado</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
