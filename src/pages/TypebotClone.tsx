// src/pages/TypebotClone.tsx

import { useState, useEffect } from "react" // Importe useEffect
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Download, Upload, Copy, Play, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cloneTypebot, getRecentTypebotClones, ClonedTypebot } from '@/api/typebot'; // Importe as funcoes da API e o tipo

const TypebotClone = () => {
  const [sourceUrl, setSourceUrl] = useState("")
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [isCloning, setIsCloning] = useState(false)
  const [recentProjects, setRecentProjects] = useState<ClonedTypebot[]>([]); // Estado para projetos recentes
  const { toast } = useToast()

  // Efeito para carregar projetos recentes ao montar o componente
  useEffect(() => {
    const loadRecentProjects = async () => {
      try {
        const data = await getRecentTypebotClones();
        setRecentProjects(data);
      } catch (error) {
        toast({
          title: "Erro ao carregar projetos",
          description: "Nao foi possivel carregar a lista de projetos Typebot recentes.",
          variant: "destructive"
        });
      }
    };
    loadRecentProjects();
  }, []);

  const handleClone = async () => {
    if (!sourceUrl || !projectName) {
      toast({
        title: "Campos obrigatorios",
        description: "Preencha a URL do Typebot e o nome do projeto",
        variant: "destructive"
      })
      return
    }

    setIsCloning(true)
    
    try {
      const newClonedTypebot = await cloneTypebot(sourceUrl, projectName, description);
      toast({
        title: "Typebot clonado com sucesso!",
        description: `Projeto "${newClonedTypebot.name}" foi criado e esta pronto para uso.`,
      });
      // Adiciona o novo Typebot clonado ao inicio da lista de recentes
      setRecentProjects(prev => [newClonedTypebot, ...prev]);
      
      // Reseta o formulario
      setSourceUrl("");
      setProjectName("");
      setDescription("");
    } catch (error: any) {
      toast({
        title: "Erro na clonagem",
        description: error.message || "Ocorreu um erro ao clonar o Typebot. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsCloning(false);
    }
  }

  // Funcoes simuladas para os botoes de acao de projetos recentes
  const handlePlayTypebot = (project: ClonedTypebot) => {
    toast({
      title: "Testando Chatbot",
      description: `Abrindo visualizacao de "${project.name}"... (Simulado)`
    });
    console.log("Testar Typebot:", project);
    window.open(project.url, '_blank'); // Abre a URL do Typebot em nova aba (simulado)
  };

  const handleSettingsTypebot = (project: ClonedTypebot) => {
    toast({
      title: "Configuracoes Typebot",
      description: `Abrindo configuracoes de "${project.name}"... (Simulado)`
    });
    console.log("Configuracoes Typebot:", project);
  };

  const handleDownloadTypebot = (project: ClonedTypebot) => {
    toast({
      title: "Download Typebot",
      description: `Preparando download do Typebot "${project.name}"... (Simulado)`
    });
    console.log("Download Typebot:", project);
    // Simulacao de download de JSON
    const jsonContent = JSON.stringify({
      id: project.id,
      name: project.name,
      url: project.url,
      clonedAt: project.clonedAt,
      description: project.description,
      // Estrutura de dados completa do Typebot simulada
      flows: [{ name: "Welcome Flow", blocks: [] }],
      variables: {},
    }, null, 2); // Formata o JSON com indentacao

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${project.name.replace(/\s/g, '_')}_typebot.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Concluido",
      description: `Arquivo JSON para "${project.name}" baixado.`,
    });
  };

  // Funcoes simuladas para as acoes rapidas
  const handleImportJson = () => {
    toast({
      title: "Importar JSON",
      description: "Funcionalidade de importacao de JSON do Typebot. (Simulado)"
    });
    console.log("Importar JSON do Typebot");
  };

  const handleExportConfigs = () => {
    toast({
      title: "Exportar Configuracoes",
      description: "Funcionalidade de exportacao de configuracoes. (Simulado)"
    });
    console.log("Exportar Configuracoes");
  };

  const handleAdvancedSettings = () => {
    toast({
      title: "Configuracoes Avancadas",
      description: "Abrindo configuracoes avancadas. (Simulado)"
    });
    console.log("Configuracoes Avancadas");
  };

  const handleTestChatbot = () => {
    toast({
      title: "Testar Chatbot",
      description: "Iniciando modo de teste para chatbot. (Simulado)"
    });
    console.log("Testar Chatbot");
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
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Clonagem Typebot</h1>
                  <p className="text-muted-foreground">
                    Clone e personalize chatbots do Typebot facilmente
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Clone Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Clonar Novo Typebot</CardTitle>
                    <CardDescription>
                      Insira a URL do Typebot que deseja clonar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sourceUrl">URL do Typebot</Label>
                      <Input
                        id="sourceUrl"
                        placeholder="https://typebot.io/seu-bot"
                        value={sourceUrl}
                        onChange={(e) => setSourceUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Nome do Projeto</Label>
                      <Input
                        id="projectName"
                        placeholder="Meu Chatbot Clonado"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Descricao (Opcional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva o proposito do seu chatbot..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                          Clonando...
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Clonar Typebot
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Acoes Rapidas</CardTitle>
                    <CardDescription>
                      Ferramentas uteis para seus chatbots
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" onClick={handleImportJson}>
                      <Upload className="mr-2 h-4 w-4" />
                      Importar JSON do Typebot
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleExportConfigs}>
                      <Download className="mr-2 h-4 w-4" />
                      Exportar Configuracoes
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleAdvancedSettings}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configuracoes Avancadas
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleTestChatbot}>
                      <Play className="mr-2 h-4 w-4" />
                      Testar Chatbot
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projetos Recentes</CardTitle>
                  <CardDescription>
                    Seus ultimos chatbots clonados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.length > 0 ? (
                      recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">{project.url}</p>
                            <p className="text-xs text-muted-foreground">Clonado em {project.clonedAt}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handlePlayTypebot(project)}>
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleSettingsTypebot(project)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDownloadTypebot(project)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center">Nenhum projeto Typebot clonado recentemente.</p>
                    )}
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

export default TypebotClone