import { 
  Store, 
  Bot, 
  HelpCircle, 
  Package, 
  Copy, 
  Search,
  Sparkles,
  Rocket,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react"
import { FeatureCard } from "@/components/FeatureCard"
import { StatsOverview } from "@/components/StatsOverview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

const features = [
  {
    title: "Templates Shopify",
    description: "Gere templates profissionais para Shopify com designs modernos e otimizados para conversão.",
    icon: Store,
    status: "active" as const,
    gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
    stats: { label: "Templates gerados", value: "456" },
    route: "/shopify"
  },
  {
    title: "Clonagem Typebot",
    description: "Clone e personalize chatbots do Typebot com todas as funcionalidades e integrações.",
    icon: Bot,
    status: "active" as const,
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-600",
    stats: { label: "Bots clonados", value: "123" },
    route: "/typebot"
  },
  {
    title: "Clonagem Quiz",
    description: "Replique quizzes interativos completos com lógica de pontuação e resultados personalizados.",
    icon: HelpCircle,
    status: "beta" as const,
    gradient: "bg-gradient-to-r from-purple-500 to-violet-600",
    stats: { label: "Quizzes criados", value: "89" },
    route: "/quiz"
  },
  {
    title: "Clonagem Infoprodutos",
    description: "Clone páginas de vendas e estruturas completas de infoprodutos digitais.",
    icon: Package,
    status: "active" as const,
    gradient: "bg-gradient-to-r from-orange-500 to-red-600",
    stats: { label: "Produtos clonados", value: "234" },
    route: "/infoprodutos"
  },
  {
    title: "Clonagem Produtos",
    description: "Duplique produtos físicos com descrições, imagens e especificações detalhadas.",
    icon: Copy,
    status: "active" as const,
    gradient: "bg-gradient-to-r from-teal-500 to-green-600",
    stats: { label: "Produtos duplicados", value: "567" },
    route: "/produtos"
  },
  {
    title: "Mineração Produtos",
    description: "Encontre e extraia dados de produtos vencedores de diferentes marketplaces.",
    icon: Search,
    status: "coming-soon" as const,
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    stats: { label: "Em desenvolvimento", value: "---" },
    route: "/mining"
  }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleFeatureClick = (route: string, status: string) => {
    if (status !== "coming-soon") {
      navigate(route)
    }
  }

  const handleViewActivity = (activityId: number) => {
    toast({
      title: "Visualizando atividade",
      description: `Abrindo detalhes da atividade #${activityId}...`
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processando':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'concluido':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'falha':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processando':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Processando</Badge>
      case 'concluido':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Concluído</Badge>
      case 'falha':
        return <Badge variant="destructive">Falha</Badge>
      default:
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Concluído</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Bem-vindo ao Clonaa! 
          <Sparkles className="inline-block ml-2 h-8 w-8 text-yellow-500" />
        </h1>
        <p className="text-muted-foreground text-lg">
          Sua plataforma completa para clonagem e automação de projetos digitais
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <CardTitle>Ações Rápidas</CardTitle>
          </div>
          <CardDescription>
            Acesse rapidamente as ferramentas mais utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              onClick={() => navigate("/shopify")}
            >
              <Store className="h-4 w-4 mr-2" />
              Novo Template Shopify
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-200 hover:bg-purple-50"
              onClick={() => navigate("/typebot")}
            >
              <Bot className="h-4 w-4 mr-2" />
              Clonar Typebot
            </Button>
            <Button 
              variant="outline" 
              className="border-green-200 hover:bg-green-50"
              onClick={() => navigate("/infoprodutos")}
            >
              <Package className="h-4 w-4 mr-2" />
              Clonar Infoproduto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Ferramentas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              onClick={() => handleFeatureClick(feature.route, feature.status)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>
            Seus últimos projetos e ações no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, action: "Template Shopify criado", time: "há 2 horas", status: "concluido" },
              { id: 2, action: "Typebot clonado com sucesso", time: "há 4 horas", status: "concluido" },
              { id: 3, action: "Quiz personalizado finalizado", time: "há 1 dia", status: "processando" },
              { id: 4, action: "Infoproduto analisado", time: "há 2 dias", status: "falha" }
            ].map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 px-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{activity.action}</span>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(activity.status)}
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewActivity(activity.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
