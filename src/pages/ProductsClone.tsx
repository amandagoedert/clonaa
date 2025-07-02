// src/pages/ProductsClone.tsx

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Download, Upload, Eye, Edit, ShoppingCart, Package, Star, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cloneProduct, getRecentClonedProducts, ClonedProduct } from '@/api/products';
import { Checkbox } from "@/components/ui/checkbox";

const ProductsClone = () => {
  const [sourceUrl, setSourceUrl] = useState("")
  const [productName, setProductName] = useState("")
  const [marketplace, setMarketplace] = useState("")
  const [isCloning, setIsCloning] = useState(false)
  const [recentClones, setRecentClones] = useState<ClonedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    const loadRecentClones = async () => {
      try {
        const data = await getRecentClonedProducts();
        setRecentClones(data);
      } catch (error) {
        toast({
          title: "Erro ao carregar produtos",
          description: "Nao foi possivel carregar a lista de produtos clonados.",
          variant: "destructive"
        });
      }
    };
    loadRecentClones();
  }, []);

  const handleClone = async () => {
    if (!sourceUrl || !productName || !marketplace) {
      toast({
        title: "Campos obrigatorios",
        description: "Preencha a URL, nome do produto e marketplace",
        variant: "destructive"
      })
      return
    }

    setIsCloning(true)
    
    try {
      const newClonedProduct = await cloneProduct(sourceUrl, productName, marketplace);
      toast({
        title: "Produto clonado com sucesso!",
        description: `"${newClonedProduct.name}" foi clonado do ${newClonedProduct.marketplace} com status: ${newClonedProduct.status}.`,
      });
      setRecentClones(prev => [newClonedProduct, ...prev]);
      
      setSourceUrl("");
      setProductName("");
      setMarketplace("");
    } catch (error: any) {
      toast({
        title: "Erro na clonagem",
        description: error.message || "Ocorreu um erro ao clonar o produto. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsCloning(false);
    }
  }

  const handleSelectProduct = (productId: number, isChecked: boolean) => {
    setSelectedProducts(prevSelected => {
      if (isChecked) {
        return [...prevSelected, productId];
      } else {
        return prevSelected.filter(id => id !== productId);
      }
    });
  };

  const handleDownloadSelected = () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Nenhum produto selecionado",
        description: "Selecione pelo menos um produto para download.",
        variant: "destructive"
      });
      return;
    }

    const productsToDownload = recentClones.filter(product =>
      selectedProducts.includes(product.id)
    );

    let csvContent = `handle,title,body (HTML),vendor,product_type,tags,published,option1 Name,option1 Value,option2 Name,option2 Value,option3 Name,option3 Value,variant SKU,variant Grams,variant Inventory Tracker,variant Inventory Qty,variant Inventory Policy,variant Fulfillment Service,variant Price,variant Compare At Price,variant Requires Shipping,variant Taxable,variant Barcode,Image Src,Image Alt Text,Gift Card,SEO Title,SEO Description,Google Shopping / Google Product Category,Google Shopping / Gender,Google Shopping / Age Group,Google Shopping / Condition,Google Shopping / Custom Product,Google Shopping / Custom Label 0,Google Shopping / Custom Label 1,Google Shopping / Custom Label 2,Google Shopping / Custom Label 3,Variant Image,Variant Weight Unit,Variant Tax Code,Cost per item,Status\n`;
    
    productsToDownload.forEach(product => {
      csvContent += `${product.name.toLowerCase().replace(/\s/g, '-')},"${product.name}","Descricao completa do ${product.name} clonado do ${product.marketplace}.",Clonaa,Produto,clonado,TRUE,Cor,Unica,,,,,,100,shopify,1,deny,manual,${product.price},,TRUE,TRUE,,https://via.placeholder.com/150/0000FF/FFFFFF?text=ImagemPrincipal_${product.id},Imagem Principal,,${product.name},Descricao SEO,,,,,FALSE,,,${product.originalUrl},kg,,${parseFloat(product.price.replace('R$ ', '').replace(',', '.')) * 0.7},active\n`;
      csvContent += `,,,,,,,,,,,,,,,,https://via.placeholder.com/150/FF0000/FFFFFF?text=Variante1_${product.id},,,,,,\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `produtos_clonados_selecionados.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download Concluido",
        description: `Arquivo CSV para ${productsToDownload.length} produtos baixado.`,
      });
      setSelectedProducts([]);
    } else {
      toast({
        title: "Download Indisponivel",
        description: "Seu navegador nao suporta downloads diretos. Por favor, copie o conteudo.",
        variant: "destructive"
      });
    }
  };

  const handleViewProduct = (product: ClonedProduct) => {
    toast({
      title: "Visualizando Produto",
      description: `Abrindo detalhes de "${product.name}"... (Simulado)`
    });
    console.log("Visualizar produto:", product);
  };

  const handleEditProduct = (product: ClonedProduct) => {
    toast({
      title: "Editando Produto",
      description: `Abrindo editor para "${product.name}"... (Simulado)`
    });
    console.log("Editar produto:", product);
  };

  const handleDownloadProduct = (product: ClonedProduct) => {
    toast({
      title: "Iniciando Download",
      description: `Preparando arquivos de "${product.name}" para download... (Simulado)`
    });
    console.log("Download solicitado para:", product);

    const csvContent = `handle,title,body (HTML),vendor,product_type,tags,published,option1 Name,option1 Value,option2 Name,option2 Value,option3 Name,option3 Value,variant SKU,variant Grams,variant Inventory Tracker,variant Inventory Qty,variant Inventory Policy,variant Fulfillment Service,variant Price,variant Compare At Price,variant Requires Shipping,variant Taxable,variant Barcode,Image Src,Image Alt Text,Gift Card,SEO Title,SEO Description,Google Shopping / Google Product Category,Google Shopping / Gender,Google Shopping / Age Group,Google Shopping / Condition,Google Shopping / Custom Product,Google Shopping / Custom Label 0,Google Shopping / Custom Label 1,Google Shopping / Custom Label 2,Google Shopping / Custom Label 3,Variant Image,Variant Weight Unit,Variant Tax Code,Cost per item,Status\n` +
                       `${product.name.toLowerCase().replace(/\s/g, '-')},"${product.name}","Descricao completa do ${product.name} clonado do ${product.marketplace}.",Clonaa,Produto,clonado,TRUE,Cor,Unica,,,,,,100,shopify,1,deny,manual,${product.price},,TRUE,TRUE,,https://via.placeholder.com/150/0000FF/FFFFFF?text=ImagemPrincipal_${product.id},Imagem Principal,,${product.name},Descricao SEO,,,,,FALSE,,,${product.originalUrl},kg,,${parseFloat(product.price.replace('R$ ', '').replace(',', '.')) * 0.7},active\n` +
                       `,,,,,,,,,,,,,,,,https://via.placeholder.com/150/FF0000/FFFFFF?text=Variante1_${product.id},,,,,,\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${product.name.replace(/\s/g, '_')}_clonado.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download Concluido",
        description: `Arquivo CSV para "${product.name}" baixado.`,
      });
    } else {
      toast({
        title: "Download Indisponivel",
        description: "Seu navegador nao suporta downloads diretos. Por favor, copie o conteudo.",
        variant: "destructive"
      });
    }
  };


  const marketplaces = [
    { id: 1, name: "Amazon", products: 45623, icon: "📦" },
    { id: 2, name: "Mercado Livre", products: 32198, icon: "🛒" },
    { id: 3, name: "AliExpress", products: 78945, icon: "🌐" },
    { id: 4, name: "Shopee", products: 23456, icon: "🛍️" },
    { id: 5, name: "Magazine Luiza", products: 15678, icon: "🏪" },
    { id: 6, name: "Casas Bahia", products: 9876, icon: "🏠" }
  ]

  const trendingProducts = [
    { id: 1, name: "Smart Watch Pro", marketplace: "Amazon", price: "R$ 299", sales: 1234, trend: "+15%" },
    { id: 2, name: "Fone Bluetooth", marketplace: "Mercado Livre", price: "R$ 89", sales: 2156, trend: "+23%" },
    { id: 3, name: "Camera Action", marketplace: "AliExpress", price: "R$ 156", sales: 876, trend: "+8%" },
    { id: 4, name: "Kit Maquiagem", marketplace: "Shopee", price: "R$ 67", sales: 3421, trend: "+31%" }
  ]

  const productCategories = [
    { value: "eletronicos", label: "Eletronicos" },
    { value: "moda-e-beleza", label: "Moda e Beleza" },
    { value: "casa-e-jardim", label: "Casa e Jardim" },
    { value: "esportes", label: "Esportes" },
    { value: "livros", label: "Livros" },
    { value: "brinquedos", label: "Brinquedos" },
    { value: "infoprodutos", label: "Infoprodutos" },
    { value: "relogios", label: "Relogios" },
  ];
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");


  // Funcoes para as novas ferramentas laterais
  const handleImportList = () => {
    toast({
      title: "Importar Lista",
      description: "Funcionalidade de importacao de lista de produtos ativada. (Simulado)"
    });
    console.log("Importar Lista de Produtos");
  };

  const handleExportCSV = () => {
    toast({
      title: "Exportar CSV",
      description: "Gerando CSV com todos os produtos clonados. (Simulado)"
    });
    console.log("Exportar todos os produtos clonados para CSV");
    // Aqui voce pode gerar um CSV com todos os 'recentClones'
  };

  const handleFavorites = () => {
    toast({
      title: "Favoritos",
      description: "Visualizando produtos favoritos. (Simulado)"
    });
    console.log("Ver produtos favoritos");
  };

  const handleComparePrices = () => {
    toast({
      title: "Comparar Precos",
      description: "Funcionalidade de comparacao de precos ativada. (Simulado)"
    });
    console.log("Comparar precos de produtos");
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
                  <Copy className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Clonagem de Produtos</h1>
                  <p className="text-muted-foreground">
                    Clone produtos fisicos com descricoes, imagens e especificacoes
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Clone Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Clonar Produto</CardTitle>
                      <CardDescription>
                        Insira a URL do produto que deseja clonar
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sourceUrl">URL do Produto</Label>
                        <Input
                          id="sourceUrl"
                          placeholder="https://amazon.com.br/produto-exemplo"
                          value={sourceUrl}
                          onChange={(e) => setSourceUrl(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="productName">Nome do Produto</Label>
                          <Input
                            id="productName"
                            placeholder="Nome do produto a ser clonado"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="marketplace">Marketplace de Origem</Label>
                          <Select value={marketplace} onValueChange={setMarketplace}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o marketplace" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="amazon">Amazon</SelectItem>
                              <SelectItem value="mercadolivre">Mercado Livre</SelectItem>
                              <SelectItem value="aliexpress">AliExpress</SelectItem>
                              <SelectItem value="shopee">Shopee</SelectItem>
                              <SelectItem value="magalu">Magazine Luiza</SelectItem>
                              <SelectItem value="casasbahia">Casas Bahia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      {/* NOVO: Seletor de Categoria */}
                      <div className="space-y-2">
                        <Label htmlFor="categoryFilter">Categoria do Produto</Label>
                        <Select value={selectedCategoryFilter} onValueChange={setSelectedCategoryFilter}>
                          <SelectTrigger id="categoryFilter">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Para selecao multipla, seria necessario um componente customizado ou um grupo de checkboxes.
                        </p>
                      </div>

                      <Button 
                        onClick={handleClone} 
                        disabled={isCloning}
                        className="w-full"
                      >
                        {isCloning ? (
                          <>
                            <Upload className="mr-2 h-4 w-4 animate-spin" />
                            Extraindo Dados...
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Clonar Produto
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Marketplaces */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Marketplaces Suportados</CardTitle>
                      <CardDescription>
                        Plataformas disponiveis para clonagem de produtos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {marketplaces.map((marketplace) => (
                          <div key={marketplace.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="text-2xl mb-2">{marketplace.icon}</div>
                            <h3 className="font-medium text-sm">{marketplace.name}</h3>
                            <p className="text-xs text-muted-foreground">{marketplace.products.toLocaleString()} produtos</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sugestões de Produtos (Antigo Trending Products) */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sugestoes de Produtos</CardTitle>
                      <CardDescription>
                        Produtos com maior potencial de mercado
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trendingProducts.map((product) => (
                          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.marketplace} • {product.price}</p>
                              <p className="text-xs text-muted-foreground">{product.sales} vendas</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-green-600 text-sm font-medium">{product.trend}</span>
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <Button size="sm" variant="outline">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Clones */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Produtos Clonados Recentemente</CardTitle>
                        {/* Botao de download para itens selecionados, aparece apenas se houver itens selecionados */}
                        {selectedProducts.length > 0 && (
                          <Button size="sm" onClick={handleDownloadSelected}>
                            <Download className="mr-2 h-4 w-4" />
                            Download ({selectedProducts.length})
                          </Button>
                        )}
                      </div>
                      <CardDescription>
                        Historico dos seus ultimos produtos clonados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentClones.length > 0 ? (
                          recentClones.map((clone) => (
                            <div key={clone.id} className="flex items-center justify-between p-4 border rounded-lg">
                              {/* Checkbox para selecao multipla */}
                              <Checkbox
                                checked={selectedProducts.includes(clone.id)}
                                onCheckedChange={(checked) => handleSelectProduct(clone.id, checked as boolean)}
                                className="mr-3" // Adiciona um pouco de espaco
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{clone.name}</h3>
                                <p className="text-sm text-muted-foreground">{clone.marketplace} • {clone.price}</p>
                                <p className="text-xs text-muted-foreground">Clonado em {clone.clonedAt}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  clone.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {clone.status}
                                </span>
                                <div className="flex gap-1">
                                  {/* Botoes de acao para o produto individual */}
                                  <Button size="sm" variant="outline" onClick={() => handleViewProduct(clone)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleEditProduct(clone)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleDownloadProduct(clone)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center">Nenhum produto clonado recentemente.</p>
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
                      <Button variant="outline" className="w-full justify-start" onClick={handleExportCSV}>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleFavorites}>
                        <Star className="mr-2 h-4 w-4" />
                        Favoritos
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleComparePrices}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Comparar Precos
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
                          <span className="font-semibold">567</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Este Mes</span>
                          <span className="font-semibold">34</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Marketplace Favorito</span>
                          <span className="font-semibold">Amazon</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Taxa Sucesso</span>
                          <span className="font-semibold">96.2%</span>
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

export default ProductsClone