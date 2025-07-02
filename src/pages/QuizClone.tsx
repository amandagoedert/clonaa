// src/pages/QuizClone.tsx

import { useState, useEffect } from "react" // Importe useEffect
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Download, Upload, Copy, Play, Plus, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cloneQuiz, getPopularQuizTemplates, getRecentClonedQuizzes, useQuizTemplate, QuizTemplate, ClonedQuiz } from '@/api/quiz'; // Importe funcoes e tipos da API de quiz

const QuizClone = () => {
  const [sourceUrl, setSourceUrl] = useState("")
  const [quizTitle, setQuizTitle] = useState("")
  const [quizType, setQuizType] = useState("")
  const [isCloning, setIsCloning] = useState(false)
  const [popularTemplates, setPopularTemplates] = useState<QuizTemplate[]>([]); // Estado para templates populares
  const [recentQuizzes, setRecentQuizzes] = useState<ClonedQuiz[]>([]); // Estado para quizzes recentes
  const { toast } = useToast()

  // Efeito para carregar templates populares e quizzes recentes ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const templatesData = await getPopularQuizTemplates();
        setPopularTemplates(templatesData);

        const quizzesData = await getRecentClonedQuizzes();
        setRecentQuizzes(quizzesData);
      } catch (error) {
        toast({
          title: "Erro ao carregar dados",
          description: "Nao foi possivel carregar a lista de templates ou quizzes recentes.",
          variant: "destructive"
        });
      }
    };
    loadData();
  }, []);

  const handleClone = async () => {
    if (!sourceUrl || !quizTitle || !quizType) {
      toast({
        title: "Campos obrigatorios",
        description: "Preencha todos os campos obrigatorios",
        variant: "destructive"
      })
      return
    }

    setIsCloning(true)
    
    try {
      const newClonedQuiz = await cloneQuiz(sourceUrl, quizTitle, quizType);
      toast({
        title: "Quiz clonado com sucesso!",
        description: `Quiz "${newClonedQuiz.name}" foi criado e esta pronto para personalizacao.`,
      });
      setRecentQuizzes(prev => [newClonedQuiz, ...prev]); // Adiciona ao topo da lista de recentes
      
      setSourceUrl("");
      setQuizTitle("");
      setQuizType("");
    } catch (error: any) {
      toast({
        title: "Erro na clonagem",
        description: error.message || "Ocorreu um erro ao clonar o Quiz. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsCloning(false);
    }
  }

  // Funcoes para acoes rapidas
  const handleCreateNew = () => {
    toast({
      title: "Criar Quiz do Zero",
      description: "Iniciando criacao de um novo quiz. (Simulado)"
    });
    console.log("Criar Quiz do Zero");
  };

  const handleImportJson = () => {
    toast({
      title: "Importar JSON Quiz",
      description: "Funcionalidade de importacao de JSON de Quiz. (Simulado)"
    });
    console.log("Importar JSON Quiz");
  };

  const handleExportData = () => {
    toast({
      title: "Exportar Dados Quiz",
      description: "Exportando dados do Quiz. (Simulado)"
    });
    console.log("Exportar Dados Quiz");
  };

  // Funcoes para acoes em templates populares
  const handleViewTemplate = (template: QuizTemplate) => {
    toast({
      title: "Visualizando Template",
      description: `Abrindo visualizacao de "${template.name}"... (Simulado)`
    });
    console.log("Visualizar Template:", template);
  };

  const handleUseTemplate = async (template: QuizTemplate) => {
    toast({
      title: "Usando Template",
      description: `Gerando novo quiz a partir de "${template.name}"...`
    });
    try {
      const newQuizFromTemplate = await useQuizTemplate(template.id);
      toast({
        title: "Quiz criado de template!",
        description: `"${newQuizFromTemplate.name}" criado a partir do template.`,
      });
      setRecentQuizzes(prev => [newQuizFromTemplate, ...prev]);
    } catch (error: any) {
      toast({
        title: "Erro ao usar template",
        description: error.message || "Nao foi possivel criar o quiz do template.",
        variant: "destructive"
      });
    }
    console.log("Usar Template:", template);
  };

  // Funcoes para acoes em quizzes recentes
  const handlePlayQuiz = (quiz: ClonedQuiz) => {
    toast({
      title: "Testando Quiz",
      description: `Abrindo quiz "${quiz.name}" para teste. (Simulado)`
    });
    console.log("Testar Quiz:", quiz);
    // Em um cenario real, abriria o link do quiz para teste
  };

  const handleEditQuiz = (quiz: ClonedQuiz) => {
    toast({
      title: "Editando Quiz",
      description: `Abrindo editor para "${quiz.name}"... (Simulado)`
    });
    console.log("Editar Quiz:", quiz);
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
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Clonagem de Quiz</h1>
                  <p className="text-muted-foreground">
                    Clone e personalize quizzes interativos com facilidade
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Clone Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Clonar Quiz Existente</CardTitle>
                      <CardDescription>
                        Insira a URL do quiz que deseja clonar
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sourceUrl">URL do Quiz</Label>
                        <Input
                          id="sourceUrl"
                          placeholder="https://exemplo.com/quiz"
                          value={sourceUrl}
                          onChange={(e) => setSourceUrl(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quizTitle">Titulo do Quiz</Label>
                        <Input
                          id="quizTitle"
                          placeholder="Meu Quiz Personalizado"
                          value={quizTitle}
                          onChange={(e) => setQuizTitle(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quizType">Tipo de Quiz</Label>
                        <Select value={quizType} onValueChange={setQuizType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personality">Personalidade</SelectItem>
                            <SelectItem value="knowledge">Conhecimento</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="assessment">Avaliacao</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={handleClone} 
                        disabled={isCloning}
                        className="w-full"
                      >
                        {isCloning ? (
                          <>
                            <Upload className="mr-2 h-4 w-4 animate-spin" />
                            Clonando Quiz...
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Clonar Quiz
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quiz Templates */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Templates Populares</CardTitle>
                      <CardDescription>
                        Comece com nossos templates mais utilizados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {popularTemplates.length > 0 ? (
                          popularTemplates.map((template) => (
                            <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div>
                                <h3 className="font-medium">{template.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {template.questions} perguntas • {template.completions} completados
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleViewTemplate(template)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" onClick={() => handleUseTemplate(template)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center">Nenhum template popular encontrado.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Acoes Rapidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={handleCreateNew}>
                        <Plus className="mr-2 h-4 w-4" />
                        Criar do Zero
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleImportJson}>
                        <Upload className="mr-2 h-4 w-4" />
                        Importar JSON
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Dados
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quizzes Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentQuizzes.length > 0 ? (
                          recentQuizzes.map((quiz) => (
                            <div key={quiz.id} className="p-3 border rounded-lg">
                              <h4 className="font-medium text-sm">{quiz.name}</h4>
                              <p className="text-xs text-muted-foreground">{quiz.type}</p>
                              <p className="text-xs text-muted-foreground">Criado em {quiz.createdAt}</p>
                              <div className="flex gap-1 mt-2">
                                <Button size="sm" variant="outline" className="h-6 px-2 text-xs" onClick={() => handlePlayQuiz(quiz)}>
                                  <Play className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-6 px-2 text-xs" onClick={() => handleEditQuiz(quiz)}>
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-center">Nenhum quiz clonado recentemente.</p>
                        )}
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

export default QuizClone