
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  UserCheck,
  AlertTriangle,
  Settings,
  BarChart3,
  Plus,
  Eye,
  Lock,
  Unlock,
  Trash2,
  CreditCard,
  FileText,
  Shield
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const adminStats = [
  {
    title: "Usuários Totais",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  {
    title: "Receita Mensal",
    value: "R$ 84.320",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    gradient: "bg-gradient-to-r from-green-500 to-green-600"
  },
  {
    title: "Projetos Ativos",
    value: "1,234",
    change: "+8%",
    trend: "up",
    icon: Activity,
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  {
    title: "Taxa de Conversão",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: TrendingUp,
    gradient: "bg-gradient-to-r from-orange-500 to-orange-600"
  }
]

const users = [
  { 
    id: 1, 
    name: "João Silva", 
    email: "joao@email.com", 
    plan: "Pro", 
    status: "Ativo", 
    joined: "2024-01-15",
    lastLogin: "2024-06-18"
  },
  { 
    id: 2, 
    name: "Maria Santos", 
    email: "maria@email.com", 
    plan: "Básico", 
    status: "Ativo", 
    joined: "2024-02-10",
    lastLogin: "2024-06-17"
  },
  { 
    id: 3, 
    name: "Pedro Costa", 
    email: "pedro@email.com", 
    plan: "Enterprise", 
    status: "Bloqueado", 
    joined: "2024-01-05",
    lastLogin: "2024-06-10"
  },
  { 
    id: 4, 
    name: "Ana Oliveira", 
    email: "ana@email.com", 
    plan: "Pro", 
    status: "Ativo", 
    joined: "2024-03-20",
    lastLogin: "2024-06-18"
  },
  { 
    id: 5, 
    name: "Carlos Pereira", 
    email: "carlos@email.com", 
    plan: "Básico", 
    status: "Pendente", 
    joined: "2024-06-15",
    lastLogin: "2024-06-16"
  },
]

const systemAlerts = [
  { type: "warning", message: "Alto uso de CPU no servidor", time: "há 15 min", severity: "Médio" },
  { type: "info", message: "Backup automático concluído", time: "há 1 hora", severity: "Baixo" },
  { type: "error", message: "Falha na integração com API externa", time: "há 2 horas", severity: "Alto" },
  { type: "warning", message: "Espaço em disco com 85% de uso", time: "há 3 horas", severity: "Médio" },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const handleCreateUser = () => {
    console.log("Criando novo usuário...")
    // Implementar lógica de criação de usuário
  }

  const handleViewUser = (userId: number) => {
    console.log(`Visualizando usuário ${userId}`)
    // Implementar lógica de visualização de usuário
  }

  const handleBlockUser = (userId: number) => {
    console.log(`Bloqueando usuário ${userId}`)
    // Implementar lógica de bloqueio de usuário
  }

  const handleUnblockUser = (userId: number) => {
    console.log(`Desbloqueando usuário ${userId}`)
    // Implementar lógica de desbloqueio de usuário
  }

  const handleDeleteUser = (userId: number) => {
    console.log(`Excluindo usuário ${userId}`)
    // Implementar lógica de exclusão de usuário
  }

  const handleSystemSettings = () => {
    console.log("Abrindo configurações do sistema...")
    // Implementar navegação para configurações
  }

  const handleFinancialReports = () => {
    console.log("Abrindo relatórios financeiros...")
    // Implementar navegação para relatórios
  }

  const handleSubscriptionManagement = () => {
    console.log("Abrindo gerenciamento de assinaturas...")
    // Implementar navegação para assinaturas
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Dashboard Administrativo
                </h1>
                <p className="text-muted-foreground text-lg">
                  Visão geral do sistema e gestão de usuários
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                {[
                  { id: "overview", label: "Visão Geral" },
                  { id: "users", label: "Usuários" },
                  { id: "reports", label: "Relatórios" },
                  { id: "settings", label: "Configurações" }
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-sm"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminStats.map((stat) => (
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

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* System Alerts */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Alertas do Sistema
                        </CardTitle>
                        <CardDescription>
                          Notificações e status do sistema
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {systemAlerts.map((alert, i) => (
                            <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                alert.type === 'error' ? 'bg-red-500' :
                                alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm">{alert.message}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                                  <Badge variant={alert.severity === 'Alto' ? 'destructive' : 'secondary'} className="text-xs">
                                    {alert.severity}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Usage Statistics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Estatísticas de Uso</CardTitle>
                        <CardDescription>
                          Principais ferramentas utilizadas pelos usuários
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { tool: "Templates Shopify", usage: "45%", count: "1,234 usos" },
                            { tool: "Clonagem Typebot", usage: "32%", count: "876 usos" },
                            { tool: "Clonagem Infoprodutos", usage: "18%", count: "492 usos" },
                            { tool: "Clonagem Quiz", usage: "5%", count: "137 usos" },
                          ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{stat.tool}</span>
                                <span className="text-sm text-muted-foreground">{stat.count}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: stat.usage }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Ações Rápidas
                      </CardTitle>
                      <CardDescription>
                        Ferramentas administrativas mais utilizadas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button 
                          className="h-20 flex-col gap-2" 
                          variant="outline"
                          onClick={() => setActiveTab("users")}
                        >
                          <Users className="h-6 w-6" />
                          Gerenciar Usuários
                        </Button>
                        <Button 
                          className="h-20 flex-col gap-2" 
                          variant="outline"
                          onClick={handleFinancialReports}
                        >
                          <FileText className="h-6 w-6" />
                          Relatórios Financeiros
                        </Button>
                        <Button 
                          className="h-20 flex-col gap-2" 
                          variant="outline"
                          onClick={handleSubscriptionManagement}
                        >
                          <CreditCard className="h-6 w-6" />
                          Gerenciar Assinaturas
                        </Button>
                        <Button 
                          className="h-20 flex-col gap-2" 
                          variant="outline"
                          onClick={handleSystemSettings}
                        >
                          <Settings className="h-6 w-6" />
                          Configurações
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Gerenciamento de Usuários
                          </CardTitle>
                          <CardDescription>
                            Visualize e gerencie todos os usuários do sistema
                          </CardDescription>
                        </div>
                        <Button onClick={handleCreateUser} className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Criar Novo Usuário
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Plano</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data de Cadastro</TableHead>
                            <TableHead>Último Login</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{user.plan}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={
                                    user.status === 'Ativo' ? 'default' : 
                                    user.status === 'Bloqueado' ? 'destructive' : 'secondary'
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(user.joined).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>{new Date(user.lastLogin).toLocaleDateString('pt-BR')}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewUser(user.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  {user.status === 'Ativo' ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleBlockUser(user.id)}
                                    >
                                      <Lock className="h-3 w-3" />
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleUnblockUser(user.id)}
                                    >
                                      <Unlock className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === "reports" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Relatórios Financeiros
                      </CardTitle>
                      <CardDescription>
                        Análise detalhada de receitas e transações
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <DollarSign className="h-8 w-8" />
                          <span>Receita por Período</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <TrendingUp className="h-8 w-8" />
                          <span>Crescimento de Usuários</span>
                        </Button>
                        <Button variant="outline" className="h-24 flex-col gap-2">
                          <BarChart3 className="h-8 w-8" />
                          <span>Análise de Conversão</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Gerenciamento de Assinaturas
                      </CardTitle>
                      <CardDescription>
                        Controle de planos e assinaturas dos usuários
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold">Plano Básico</h3>
                            <p className="text-2xl font-bold">847 usuários</p>
                            <p className="text-sm text-muted-foreground">R$ 29/mês cada</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold">Plano Pro</h3>
                            <p className="text-2xl font-bold">1,234 usuários</p>
                            <p className="text-sm text-muted-foreground">R$ 69/mês cada</p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold">Plano Enterprise</h3>
                            <p className="text-2xl font-bold">166 usuários</p>
                            <p className="text-sm text-muted-foreground">R$ 199/mês cada</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Configurações do Sistema
                      </CardTitle>
                      <CardDescription>
                        Configurações gerais e de segurança do sistema
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Configurações Gerais</h3>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                              <Settings className="h-4 w-4 mr-2" />
                              Configurações de Email
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Shield className="h-4 w-4 mr-2" />
                              Políticas de Segurança
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <Users className="h-4 w-4 mr-2" />
                              Limites de Usuário
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-semibold">Monitoramento</h3>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                              <Activity className="h-4 w-4 mr-2" />
                              Logs do Sistema
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Configurar Alertas
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Métricas de Performance
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboard
