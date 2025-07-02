// src/api/quiz.ts

export interface QuizTemplate {
    id: number;
    name: string;
    type: string;
    questions: number;
    completions: number;
  }
  
  export interface ClonedQuiz {
    id: number;
    name: string;
    type: string;
    sourceUrl?: string;
    createdAt: string;
    status: 'active' | 'pending' | 'draft';
  }
  
  // Funcao simulada para clonar um Quiz
  export const cloneQuiz = async (
    sourceUrl: string,
    quizTitle: string,
    quizType: string
  ): Promise<ClonedQuiz> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sourceUrl.includes("invalid-url")) {
          reject(new Error("URL do Quiz invalida."));
        } else if (quizTitle.includes("erro")) {
          reject(new Error("Titulo do Quiz ja existente ou invalido."));
        } else {
          const newId = Math.floor(Math.random() * 10000);
          resolve({
            id: newId,
            name: quizTitle,
            type: quizType,
            sourceUrl: sourceUrl,
            createdAt: new Date().toLocaleDateString('pt-BR'),
            status: 'draft', // Comeca como rascunho apos clonagem
          });
        }
      }, 3000); // Simula o tempo de clonagem
    });
  };
  
  // Funcao simulada para buscar templates de Quiz populares
  export const getPopularQuizTemplates = async (): Promise<QuizTemplate[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Quiz de Personalidade", type: "Personalidade", questions: 12, completions: 1834 },
          { id: 2, name: "Quiz de Conhecimento Geral", type: "Educacional", questions: 20, completions: 967 },
          { id: 3, name: "Quiz de Produto Ideal", type: "Marketing", questions: 8, completions: 2156 },
          { id: 4, name: "Teste de Aptidao Profissional", type: "Avaliacao", questions: 15, completions: 789 }
        ]);
      }, 800);
    });
  };
  
  // Funcao simulada para buscar quizzes clonados recentemente
  export const getRecentClonedQuizzes = async (): Promise<ClonedQuiz[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Qual seu estilo de lideranca?", type: "Personalidade", createdAt: "2024-06-15", status: 'active' },
          { id: 2, name: "Teste de Marketing Digital", type: "Educacional", createdAt: "2024-06-14", status: 'active' },
          { id: 3, name: "Encontre seu produto ideal", type: "Marketing", createdAt: "2024-06-13", status: 'draft' }
        ]);
      }, 1000);
    });
  };
  
  // Funcao simulada para usar um template (simulacao de clonagem a partir do template)
  export const useQuizTemplate = async (templateId: number): Promise<ClonedQuiz> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const selectedTemplate = (getPopularQuizTemplates() as any).find((t: QuizTemplate) => t.id === templateId);
        if (selectedTemplate) {
          resolve({
            id: Math.floor(Math.random() * 10000),
            name: `${selectedTemplate.name} (Copia)`,
            type: selectedTemplate.type,
            createdAt: new Date().toLocaleDateString('pt-BR'),
            status: 'draft',
          });
        } else {
          reject(new Error("Template nao encontrado."));
        }
      }, 1500);
    });
  };