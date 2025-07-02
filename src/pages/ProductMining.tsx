
import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Filter, Download, Eye, Star, BarChart3, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ProductMining = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [marketplace, setMarketplace] = useState("")
  const [category, setCategory] = useState("")
  const [isMining, setIsMining] = useState(false)
  const { toast } = useToast()

  const handleStartMining = async () => {
    if (!searchKeyword || !marketplace) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a palavra-chave e selecione um marketplace",
        variant: "destructive"
      })
      return
    }

    setIsMining(true)
    
    setTimeout(() => {
      setIsMining(false)
      toast({
        title: "Mineração concluída!",
        description: `Encontrados 47 produtos vencedores para "${searchKeyword}".`
      })
    }, 4000)
  }

  const winningProducts = [
    {
      id: 1,
      name: "Smart Watch Fitness Pro",
      marketplace: "Amazon",
      price: "R$ 199",
      sales: 2847,
      rating: 4.8,
      trend: "+34%",
      competition: "Baixa",
      profit: "Alto"
    },
    {
      id: 2,
      name: "Fone Bluetooth Premium",
      marketplace: "Mercado Livre",
      price: "R$ 89",
      sales: 5621,
      rating: 4.6,
      trend: "+28%",
      competition: "Média",
      profit: "Médio"
    },
    {
      id: 3,
      name: "Kit Skincare Completo",
      marketplace: "Shopee",
      price: "R$ 67",
      sales: 3912,
      rating: 4.9,
      trend: "+45%",
      competition: "Baixa",
      profit: "Alto"
    },
    {
      id: 4,
      name: "Câmera Ação 4K",
      marketplace: "AliExpress",
      price: "R$ 156",
      sales: 1234,
      rating: 4.5,
      trend: "+19%",
      competition: "Alta",
      profit: "Médio"
    }
  ]

  const miningStats = [
    { label: "Produtos Analisados", value: "12,847", change: "+15%" },
    { label: "Vencedores Encontrados", value: "234", change: "+23%" },
    { label: "Taxa de Conversão", value: "8.4%", change: "+2.1%" },
    { label: "ROI Médio", value: "312%", change: "+18%" }
  ]

  const categories = [
    { name: "Eletrônicos", products: 3421, trend: "+15%" },
    { name: "Moda e Beleza", products: 2156, trend: "+23%" },
    { name: "Casa e Jardim", products: 1876, trend: "+8%" },
    { name: "Esportes", products: 1234, trend: "+31%" },
    { name: "Livros", products: 987, trend: "+12%" },
    { name: "Brinquedos", products: 765, trend: "+19%" }
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Mineração de Produtos</h1>
                  <p className="text-muted-foreground">
                    Encontre produtos vencedores em diferentes marketplaces
                  </p>
                </div>
              </div>

              {/* Mining Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {miningStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className="text-green-600 text-sm font-medium">{stat.change}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Mining Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurar Mineração</CardTitle>
                      <CardDescription>
                        Defina os parâmetros para encontrar produtos vencedores
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="keyword">Palavra-chave</Label>
                          <Input
                            id="keyword"
                            placeholder="Ex: smartwatch, fone..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="marketplace">Marketplace</Label>
                          <Select value={marketplace} onValueChange={setMarketplace}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="amazon">Amazon</SelectItem>
                              <SelectItem value="mercadolivre">Mercado Livre</SelectItem>
                              <SelectItem value="aliexpress">AliExpress</SelectItem>
                              <SelectItem value="shopee">Shopee</SelectItem>
                              <SelectItem value="all">Todos</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electronics">Eletrônicos</SelectItem>
                              <SelectItem value="fashion">Moda e Beleza</SelectItem>
                              <SelectItem value="home">Casa e Jardim</SelectItem>
                              <SelectItem value="sports">Esportes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleStartMining} 
                          disabled={isMining}
                          className="flex-1"
                        >
                          {isMining ? (
                            <>
                              <Search className="mr-2 h-4 w-4 animate-spin" />
                              Minerando...
                            </>
                          ) : (
                            <>
                              <Search className="mr-2 h-4 w-4" />
                              Iniciar Mineração
                            </>
                          )}
                        </Button>
                        <Button variant="outline">
                          <Filter className="mr-2 h-4 w-4" />
                          Filtros Avançados
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Winning Products */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Produtos Vencedores</CardTitle>
                          <CardDescription>
                            Produtos com maior potencial de vendas identificados
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Exportar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {winningProducts.map((product) => (
                          <div key={product.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-medium">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.marketplace}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-lg font-bold text-green-600">{product.price}</span>
                                  <span className="text-sm text-muted-foreground">{product.sales} vendas</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">{product.rating}</span>
                                  </div>
                                </div>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline" className="text-green-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {product.trend}
                                  </Badge>
                                  <Badge variant={product.competition === 'Baixa' ? 'default' : product.competition === 'Média' ? 'secondary' : 'destructive'}>
                                    Concorrência {product.competition}
                                  </Badge>
                                  <Badge variant={product.profit === 'Alto' ? 'default' : 'secondary'}>
                                    Lucro {product.profit}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <BarChart3 className="h-4 w-4" />
                                </Button>
                                <Button size="sm">
                                  <Target className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Categorias Populares</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categories.map((cat, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{cat.name}</p>
                              <p className="text-xs text-muted-foreground">{cat.products.toLocaleString()} produtos</p>
                            </div>
                            <span className="text-green-600 text-xs">{cat.trend}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ferramentas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Análise Detalhada
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="mr-2 h-4 w-4" />
                        Relatório PDF
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Star className="mr-2 h-4 w-4" />
                        Salvar Pesquisa
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Alertas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                          <p className="font-medium text-green-700">Novo produto em alta!</p>
                          <p className="text-green-600">Categoria: Eletrônicos</p>
                        </div>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                          <p className="font-medium text-blue-700">Oportunidade detectada</p>
                          <p className="text-blue-600">Baixa concorrência em Beleza</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ProductMining