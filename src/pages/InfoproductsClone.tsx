// src/pages/InfoproductsClone.tsx

import { useState, useEffect } from "react" // Importe useEffect
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Download, Upload, Copy, Eye, Edit, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cloneInfoproduct, getInfoproductCategories, getRecentInfoproductClones, InfoproductCategory, ClonedInfoproduct } from '@/api/infoproducts'; // Importe funcoes e tipos da API

const InfoproductsClone = () => {
  const [sourceUrl, setSourceUrl] = useState("")
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [customizations, setCustomizations] = useState("")
  const [isCloning, setIsCloning] = useState(false)
  const [infoproductCategories, setInfoproductCategories] = useState<InfoproductCategory[]>([]); // Estado para categorias
  const [recentClones, setRecentClones] = useState<ClonedInfoproduct[]>([]); // Estado para clonagens recentes
  const { toast } = useToast()

  // Efeito para carregar categorias e clonagens recentes ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getInfoproductCategories();
        setInfoproductCategories(categoriesData);

        const clonesData = await getRecentInfoproductClones();
        setRecentClones(clonesData);
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Nao foi possivel carregar as listas de categorias ou clonagens.",
          variant: "destructive"
        });
      }
    };
    loadData();
  }, []);

  const handleClone = async () => {
    if (!sourceUrl || !productName || !category) {
      toast({
        title: "Campos obrigatorios",
        description: "Preencha a URL, nome do produto e categoria",
        variant: "destructive"
      })
      return
    }

    setIsCloning(true)
    
    try {
      const newClonedInfoproduct = await cloneInfoproduct(sourceUrl, productName, category, customizations);
      toast({
        title: "Infoproduto clonado com sucesso!",
        description: `"${newClonedInfoproduct.name}" foi clonado e esta pronto para personalizacao.`,
      });
      setRecentClones(prev => [newClonedInfoproduct, ...prev]); // Adiciona ao topo da lista de recentes
      
      setSourceUrl("");
      setProductName("");
      setCategory("");
      setCustomizations("");
    } catch (error: any) {
      toast({
        title: "Erro na clonagem",
        description: error.message || "Ocorreu um erro ao clonar o infoproduto. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsCloning(false);
    }
  }

  // Funcoes simuladas para os botoes de acao de clonagens recentes
  const handleViewInfoproduct = (infoproduct: ClonedInfoproduct) => {
    toast({
      title: "Visualizando Infoproduto",
      description: `Abrindo detalhes de "${infoproduct.name}"... (Simulado)`
    });
    console.log("Visualizar Infoproduto:", infoproduct);
  };

  const handleEditInfoproduct = (infoproduct: ClonedInfoproduct) => {
    toast({
      title: "Editando Infoproduto",
      description: `Abrindo editor para "${infoproduct.name}"... (Simulado)`
    });
    console.log("Editar Infoproduto:", infoproduct);
  };

  const handleDownloadInfoproduct = (infoproduct: ClonedInfoproduct) => {
    toast({
      title: "Download Infoproduto",
      description: `Preparando download de "${infoproduct.name}"... (Simulado)`
    });
    console.log("Download Infoproduto:", infoproduct);
    // Simulacao de download de arquivo JSON/ZIP
    const fileContent = `Conteudo do infoproduto ${infoproduct.name} (ID: ${infoproduct.id}).\nEste e um arquivo de simulacao de infoproduto.`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${infoproduct.name.replace(/\s/g, '_')}_infoproduto.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Concluido",
      description: `Arquivo para "${infoproduct.name}" baixado.`,
    });
  };

  // Funcoes simuladas para as ferramentas da barra lateral
  const handleImportList = () => {
    toast({
      title: "Importar Lista",
      description: "Funcionalidade de importacao de lista de infoprodutos ativada. (Simulado)"
    });
    console.log("Importar Lista de Infoprodutos");
  };

  const handleExportData = () => {
    toast({
      title: "Exportar Dados",
      description: "Gerando exportacao de dados de infoprodutos. (Simulado)"
    });
    console.log("Exportar Dados de Infoprodutos");
  };

  const handleFavorites = () => {
    toast({
      title: "Favoritos",
      description: "Visualizando infoprodutos favoritos. (Simulado)"
    });
    console.log("Ver infoprodutos favoritos");
  };

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
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Clonagem de Infoprodutos</h1>
                  <p className="text-muted-foreground">
                    Clone paginas de vendas e estruturas completas de infoprodutos
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Clone Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Clonar Infoproduto</CardTitle>
                      <CardDescription>
                        Insira a URL do infoproduto que deseja clonar
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sourceUrl">URL do Produto</Label>
                        <Input
                          id="sourceUrl"
                          placeholder="https://hotmart.com/produto-exemplo"
                          value={sourceUrl}
                          onChange={(e) => setSourceUrl(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="productName">Nome do Produto</Label>
                          <Input
                            id="productName"
                            placeholder="Meu Infoproduto"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoria</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {/* Renderiza categorias da API */}
                              {infoproductCategories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="customizations">Personalizacoes Desejadas</Label>
                        <Textarea
                          id="customizations"
                          placeholder="Descreva as modificacoes que deseja fazer..."
                          value={customizations}
                          onChange={(e) => setCustomizations(e.target.value)}
                        />
                      </div>
                      
                      <Button 
                        onClick={handleClone} 
                        disabled={isCloning}
                        className="w-full"
                      >
                        {isCloning ? (
                          <>
                            <Upload className="mr-2 h-4 w-4 animate-spin" />
                            Clonando Estrutura...
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Clonar Infoproduto
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Categories Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Categorias Populares</CardTitle>
                      <CardDescription>
                        Explore os tipos de infoprodutos mais clonados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {infoproductCategories.length > 0 ? (
                          infoproductCategories.map((cat) => (
                            <div key={cat.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                              <div className="text-2xl mb-2">{cat.icon}</div>
                              <h3 className="font-medium text-sm">{cat.name}</h3>
                              <p className="text-xs text-muted-foreground">{cat.count} produtos</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center">Nenhuma categoria encontrada.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Clones */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Clonagens Recentes</CardTitle>
                      <CardDescription>
                        Seus ultimos infoprodutos clonados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentClones.length > 0 ? (
                          recentClones.map((clone) => (
                            <div key={clone.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex-1">
                                <h3 className="font-medium">{clone.name}</h3>
                                <p className="text-sm text-muted-foreground">{clone.category}</p>
                                <p className="text-xs text-muted-foreground">{clone.originalUrl}</p>
                                <p className="text-xs text-muted-foreground">Clonado em {clone.clonedAt}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  clone.status === 'Concluido' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {clone.status}
                                </span>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="outline" onClick={() => handleViewInfoproduct(clone)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleEditInfoproduct(clone)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleDownloadInfoproduct(clone)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center">Nenhuma clonagem de infoproduto recente.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ferramentas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={handleImportList}>
                        <Upload className="mr-2 h-4 w-4" />
                        Importar Lista
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Dados
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleFavorites}>
                        <Star className="mr-2 h-4 w-4" />
                        Favoritos
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Estatisticas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Clonado</span>
                          <span className="font-semibold">234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Este Mes</span>
                          <span className="font-semibold">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Taxa Sucesso</span>
                          <span className="font-semibold">98.5%</span>
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

export default InfoproductsClone