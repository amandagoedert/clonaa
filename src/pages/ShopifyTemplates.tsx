// src/pages/ShopifyTemplates.tsx

import { useState, useEffect } from "react" // Importe useEffect
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, Download, Search, Star, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getShopifyTemplates, downloadShopifyTemplate, ShopifyTemplate } from '@/api/shopifyTemplates'; // Importe as funcoes da API e o tipo

const ShopifyTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [templates, setTemplates] = useState<ShopifyTemplate[]>([]); // Estado para armazenar os templates
  const [loadingSearch, setLoadingSearch] = useState(false); // Estado para indicar carregamento da busca
  const { toast } = useToast();

  // Efeito para carregar os templates ao montar o componente (busca inicial)
  useEffect(() => {
    const loadTemplates = async () => {
      setLoadingSearch(true);
      try {
        const data = await getShopifyTemplates(""); // Busca inicial vazia para carregar todos
        setTemplates(data);
      } catch (error) {
        toast({
          title: "Erro ao carregar templates",
          description: "Nao foi possivel carregar a lista de templates Shopify.",
          variant: "destructive"
        });
      } finally {
        setLoadingSearch(false);
      }
    };
    loadTemplates();
  }, []); // Array de dependencia vazio para rodar apenas na montagem

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da pagina ao submeter o formulario
    setLoadingSearch(true);
    try {
      const data = await getShopifyTemplates(searchTerm); // Busca templates com o termo atual
      setTemplates(data);
      toast({
        title: "Busca concluida!",
        description: `${data.length} templates encontrados para "${searchTerm}".`
      });
    } catch (error: any) {
      toast({
        title: "Erro na busca",
        description: error.message || "Ocorreu um erro ao buscar templates. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoadingSearch(false);
    }
  }

  const handleDownload = async (templateId: number, templateName: string) => {
    toast({
      title: "Iniciando Download",
      description: `Preparando download do template "${templateName}"...`
    });
    try {
      await downloadShopifyTemplate(templateId, templateName);
      toast({
        title: "Download Concluido!",
        description: `Template "${templateName}" baixado com sucesso.`,
      });
    } catch (error: any) {
      toast({
        title: "Erro no Download",
        description: error.message || "Ocorreu um erro ao baixar o template. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleViewTemplate = (template: ShopifyTemplate) => {
    toast({
      title: "Visualizando Template",
      description: `Abrindo visualizacao de "${template.name}"... (Simulado)`
    });
    console.log("Visualizar template:", template);
    // Em um cenario real, voce navegaria para uma pagina de detalhes/preview
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
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Templates Shopify</h1>
                  <p className="text-muted-foreground">
                    Biblioteca de templates prontos para sua loja Shopify
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Buscar Templates</CardTitle>
                  <CardDescription>
                    Encontre o template perfeito para sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="flex gap-4"> {/* Adicione o form e onSubmit */}
                    <div className="flex-1">
                      <Label htmlFor="search">Pesquisar por nome ou categoria</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="search"
                          placeholder="Ex: fashion, tech, minimal..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" disabled={loadingSearch}> {/* Adicione type="submit" */}
                        {loadingSearch ? (
                          <>
                            <Search className="mr-2 h-4 w-4 animate-spin" />
                            Buscando...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Buscar
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.length > 0 ? ( // Renderiza templates do estado
                  templates.map((template) => (
                    <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-muted relative">
                        <img 
                          src={template.image} 
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {template.category}
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-muted-foreground">
                            {template.downloads} downloads
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => handleDownload(template.id, template.name)}>
                            <Download className="mr-2 h-4 w-4" />
                            Baixar
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleViewTemplate(template)}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : ( // Mensagem quando nao ha templates
                  <Card className="col-span-full"> {/* Garante que a mensagem ocupe a largura total */}
                    <CardContent className="py-12 text-center">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nenhum template encontrado</h3>
                      <p className="text-muted-foreground">
                        {loadingSearch ? "Buscando templates..." : "Tente ajustar os termos de busca para encontrar templates."}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default ShopifyTemplates