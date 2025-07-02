// src/api/typebot.ts

export interface ClonedTypebot {
    id: number;
    name: string;
    url: string;
    clonedAt: string;
    description?: string;
    status: 'active' | 'pending' | 'error';
  }
  
  export const cloneTypebot = async (
    sourceUrl: string,
    projectName: string,
    description?: string
  ): Promise<ClonedTypebot> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sourceUrl.includes("invalid-url")) {
          reject(new Error("URL do Typebot invalida."));
        } else if (projectName.includes("erro")) {
          reject(new Error("Nome do projeto ja existente ou invalido."));
        } else {
          const newId = Math.floor(Math.random() * 10000);
          resolve({
            id: newId,
            name: projectName,
            url: sourceUrl,
            clonedAt: new Date().toLocaleDateString('pt-BR'),
            description: description || `Typebot clonado de ${sourceUrl}`,
            status: 'pending',
          });
        }
      }, 3000); // Simula o tempo de clonagem
    });
  };
  
  export const getRecentTypebotClones = async (): Promise<ClonedTypebot[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Quiz de Marketing", url: "https://typebot.io/quiz-1", clonedAt: "2024-06-15", status: 'active' },
          { id: 2, name: "Chatbot de Vendas", url: "https://typebot.io/sales-bot", clonedAt: "2024-06-14", status: 'active' },
          { id: 3, name: "Suporte Automatico", url: "https://typebot.io/support", clonedAt: "2024-06-13", status: 'active' }
        ]);
      }, 1000); // Simula o tempo de carregamento
    });
  };