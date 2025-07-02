
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  status: "active" | "coming-soon" | "beta"
  stats?: {
    label: string
    value: string
  }
  gradient: string
  onClick?: () => void
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  stats, 
  gradient,
  onClick 
}: FeatureCardProps) {
  const statusConfig = {
    active: { label: "Ativo", variant: "default" as const, color: "bg-green-500" },
    "coming-soon": { label: "Em Breve", variant: "secondary" as const, color: "bg-yellow-500" },
    beta: { label: "Beta", variant: "outline" as const, color: "bg-blue-500" }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted/50 hover:border-primary/20 bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl ${gradient} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge variant={statusConfig[status].variant} className="gap-1">
            <div className={`w-2 h-2 rounded-full ${statusConfig[status].color}`}></div>
            {statusConfig[status].label}
          </Badge>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {stats && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{stats.label}</span>
              <span className="font-semibold text-primary">{stats.value}</span>
            </div>
          )}
          
          <Button 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200" 
            variant="outline"
            onClick={onClick}
            disabled={status === "coming-soon"}
          >
            {status === "coming-soon" ? "Em Desenvolvimento" : "Acessar Ferramenta"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
