// src/api/infoproducts.ts

export interface InfoproductCategory {
    id: number;
    name: string;
    count: number;
    icon: string; // Emoji ou URL de icone
  }
  
  export interface ClonedInfoproduct {
    id: number;
    name: string;
    category: string;
    originalUrl: string;
    clonedAt: string;
    status: 'Concluido' | 'Em edicao' | 'Pendente' | 'Falha';
    customizations?: string;
  }
  
  // Funcao simulada para clonar um Infoproduto
  export const cloneInfoproduct = async (
    sourceUrl: string,
    productName: string,
    category: string,
    customizations?: string
  ): Promise<ClonedInfoproduct> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sourceUrl.includes("invalid-url")) {
          reject(new Error("URL do Infoproduto invalida."));
        } else if (productName.includes("erro")) {
          reject(new Error("Nome do produto ja existente ou invalido."));
        } else {
          const newId = Math.floor(Math.random() * 10000);
          resolve({
            id: newId,
            name: productName,
            category: category,
            originalUrl: sourceUrl,
            clonedAt: new Date().toLocaleDateString('pt-BR'),
            status: 'Pendente', // Comeca como pendente apos clonagem
            customizations: customizations,
          });
        }
      }, 4000); // Simula o tempo de clonagem (pode ser mais longo para infoprodutos)
    });
  };
  
  // Funcao simulada para buscar categorias de infoprodutos
  export const getInfoproductCategories = async (): Promise<InfoproductCategory[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Cursos Online", count: 156, icon: "📚" },
          { id: 2, name: "E-books", count: 89, icon: "📖" },
          { id: 3, name: "Webinars", count: 67, icon: "🎥" },
          { id: 4, name: "Templates", count: 234, icon: "📄" },
          { id: 5, name: "Software/Apps", count: 45, icon: "💻" },
          { id: 6, name: "Consultoria", count: 78, icon: "🎯" }
        ]);
      }, 800);
    });
  };
  
  // Funcao simulada para buscar clonagens recentes de infoprodutos
  export const getRecentInfoproductClones = async (): Promise<ClonedInfoproduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Curso de Marketing Digital", category: "Cursos Online", originalUrl: "hotmart.com/curso-marketing", clonedAt: "2024-06-15", status: "Concluido" },
          { id: 2, name: "E-book Vendas Online", category: "E-books", originalUrl: "exemplo.com/ebook-vendas", clonedAt: "2024-06-14", status: "Em edicao" },
          { id: 3, name: "Template Landing Page", category: "Templates", originalUrl: "template.com/landing", clonedAt: "2024-06-13", status: "Concluido" }
        ]);
      }, 1000);
    });
  };