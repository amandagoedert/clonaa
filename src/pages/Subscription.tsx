
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, ArrowLeft, Check, Star, Zap, Crown } from "lucide-react"
import { Link } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"

const plans = [
  {
    name: "Básico",
    price: "R$ 29",
    period: "/mês",
    description: "Ideal para iniciantes",
    icon: Zap,
    features: [
      "5 projetos por mês",
      "Templates básicos",
      "Suporte por email",
      "Clonagem limitada"
    ],
    popular: false,
    current: true
  },
  {
    name: "Pro",
    price: "R$ 79",
    period: "/mês",
    description: "Para profissionais",
    icon: Star,
    features: [
      "50 projetos por mês",
      "Todos os templates",
      "Suporte prioritário",
      "Clonagem avançada",
      "API de integração",
      "Relatórios detalhados"
    ],
    popular: true,
    current: false
  },
  {
    name: "Enterprise",
    price: "R$ 199",
    period: "/mês",
    description: "Para empresas",
    icon: Crown,
    features: [
      "Projetos ilimitados",
      "Templates personalizados",
      "Suporte 24/7",
      "Clonagem enterprise",
      "API completa",
      "White label",
      "Gerente dedicado"
    ],
    popular: false,
    current: false
  }
]

const Subscription = () => {
  const [isLoading, setIsLoading] = useState("")

  const handleUpgrade = async (planName: string) => {
    setIsLoading(planName)
    
    // Simular chamada de API
    setTimeout(() => {
      setIsLoading("")
      console.log(`Upgrading to ${planName}`)
      alert(`Redirecionando para pagamento do plano ${planName}`)
    }, 2000)
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold">Assinatura</h1>
                  <p className="text-muted-foreground">Gerencie seu plano e faturamento</p>
                </div>
              </div>

              {/* Current Plan */}
              <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle>Plano Atual</CardTitle>
                  </div>
                  <CardDescription>
                    Você está no plano Básico. Próxima cobrança em 15/02/2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">Plano Básico</h3>
                      <p className="text-muted-foreground">R$ 29/mês</p>
                    </div>
                    <Badge variant="secondary">Ativo</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Plans */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Escolha seu Plano</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.name} 
                      className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} ${plan.current ? 'bg-muted/20' : ''}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">Mais Popular</Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <div className={`mx-auto p-3 rounded-full w-fit ${
                          plan.name === 'Básico' ? 'bg-blue-100 text-blue-600' :
                          plan.name === 'Pro' ? 'bg-purple-100 text-purple-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          <plan.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="pt-2">
                          <span className="text-3xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full" 
                          variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                          disabled={plan.current || isLoading === plan.name}
                          onClick={() => handleUpgrade(plan.name)}
                        >
                          {plan.current ? "Plano Atual" : 
                           isLoading === plan.name ? "Processando..." : 
                           "Escolher Plano"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Billing History */}
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Faturamento</CardTitle>
                  <CardDescription>
                    Suas últimas faturas e pagamentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: "15/01/2024", amount: "R$ 29,00", status: "Pago", plan: "Básico" },
                      { date: "15/12/2023", amount: "R$ 29,00", status: "Pago", plan: "Básico" },
                      { date: "15/11/2023", amount: "R$ 29,00", status: "Pago", plan: "Básico" },
                    ].map((invoice, i) => (
                      <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">{invoice.plan}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount}</p>
                          <Badge variant="secondary" className="text-xs">
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Subscription
