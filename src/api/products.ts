// src/api/products.ts

// Define um tipo para o produto clonado (ClonedProduct ja esta definido)
export interface ClonedProduct {
    id: number;
    name: string;
    marketplace: string; // Pode ser "Facebook Ads", "TikTok Ads", "Amazon", etc.
    price: string;
    sales: number; // Ou engajamento, visualizacoes do anuncio
    rating: number; // Ou um indice de sucesso do anuncio
    trend: string;
    competition: 'Baixa' | 'Media' | 'Alta';
    profit: 'Baixo' | 'Medio' | 'Alto'; // Pode ser ROI Estimado
    originalUrl: string; // Se for de um marketplace, a URL do produto. Se for de anuncio, pode ser a landing page
    clonedAt: string; // Mantido para consistencia
    status: 'Ativo' | 'Revisao' | 'Pendente' | 'Concluido' | 'Em edicao'; // Mantido para consistencia
    // Novos campos que podem vir de analise de anuncio
    adClicks?: number; // Cliques no anuncio
    cpa?: string; // Custo por Aquisicao do anuncio (ex: R$5.20)
    adPlatform?: 'Facebook' | 'TikTok' | 'Google' | 'Outro'; // Plataforma de anuncio
  }
  
  // Funcao simulada para clonar um produto (mantida como estava, pois nao se refere a mineracao)
  export const cloneProduct = async (
    sourceUrl: string,
    productName: string,
    marketplace: string
  ): Promise<ClonedProduct> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sourceUrl.includes("invalid")) {
          reject(new Error("URL de produto invalida."));
        } else if (marketplace === "error_mp") {
          reject(new Error("Erro na comunicacao com o marketplace."));
        } else {
          const newProductId = Math.floor(Math.random() * 100000);
          resolve({
            id: newProductId,
            name: productName,
            marketplace: marketplace,
            price: `R$ ${Math.floor(Math.random() * 500) + 50},00`,
            sales: Math.floor(Math.random() * 5000) + 100,
            rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
            trend: `+${Math.floor(Math.random() * 20) + 5}%`,
            competition: Math.random() > 0.6 ? 'Alta' : (Math.random() > 0.3 ? 'Media' : 'Baixa'),
            profit: Math.random() > 0.5 ? 'Alto' : 'Medio',
            originalUrl: sourceUrl,
            clonedAt: new Date().toLocaleDateString('pt-BR'),
            status: 'Pendente',
            adClicks: undefined, cpa: undefined, adPlatform: undefined // Nao relevante para clonagem direta
          });
        }
      }, 3500);
    });
  };
  
  // Funcao simulada para buscar produtos vencedores (Mineracao)
  // Dados simulados agora mais "ad-like" e com mais variedade de plataformas
  export const getWinningProducts = async (
    keyword: string,
    marketplaceFilter?: string, // Renomeado para evitar conflito com 'marketplace' dentro do objeto
    categoryFilter?: string // Renomeado
  ): Promise<ClonedProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allWinningProducts: ClonedProduct[] = [
          { 
            id: 1, name: "Smartwatch Fitness - Anuncio Viral", marketplace: "Facebook Ads", 
            price: "R$ 189", sales: 15678, rating: 4.9, trend: "+55%", 
            competition: "Media", profit: "Alto", originalUrl: "https://ad.link/smartwatch", 
            clonedAt: "2024-06-20", status: "Concluido", adClicks: 50000, cpa: "R$ 5.20", adPlatform: "Facebook" 
          },
          { 
            id: 2, name: "Cinto Corretor Postural - Oferta Imperdivel", marketplace: "TikTok Ads", 
            price: "R$ 79", sales: 23456, rating: 4.7, trend: "+80%", 
            competition: "Baixa", profit: "Alto", originalUrl: "https://ad.link/cintopostural", 
            clonedAt: "2024-06-19", status: "Concluido", adClicks: 80000, cpa: "R$ 3.50", adPlatform: "TikTok" 
          },
          { 
            id: 3, name: "Kit Maquiagem Profissional (Dropshipping)", marketplace: "AliExpress", 
            price: "R$ 120", sales: 8765, rating: 4.6, trend: "+30%", 
            competition: "Alta", profit: "Medio", originalUrl: "https://br.aliexpress.com/item/12345.html", 
            clonedAt: "2024-06-18", status: "Concluido", adClicks: undefined, cpa: undefined, adPlatform: undefined 
          },
          { 
            id: 4, name: "Fone Bluetooth de Alta Fidelidade", marketplace: "Amazon", 
            price: "R$ 250", sales: 4321, rating: 4.8, trend: "+25%", 
            competition: "Media", profit: "Alto", originalUrl: "https://amazon.com.br/dp/B0XYZ", 
            clonedAt: "2024-06-17", status: "Concluido", adClicks: undefined, cpa: undefined, adPlatform: undefined 
          },
          { 
            id: 5, name: "Luvas de Ciclismo - Edicao Limitada", marketplace: "Facebook Ads", 
            price: "R$ 99", sales: 12345, rating: 4.5, trend: "+40%", 
            competition: "Media", profit: "Alto", originalUrl: "https://ad.link/luvasciclismo", 
            clonedAt: "2024-06-16", status: "Concluido", adClicks: 30000, cpa: "R$ 6.00", adPlatform: "Facebook" 
          },
          { 
            id: 6, name: "Escova Removedora de Pelos de Pet", marketplace: "TikTok Ads", 
            price: "R$ 49", sales: 18000, rating: 4.8, trend: "+60%", 
            competition: "Baixa", profit: "Alto", originalUrl: "https://ad.link/petbrush", 
            clonedAt: "2024-06-15", status: "Concluido", adClicks: 60000, cpa: "R$ 4.00", adPlatform: "TikTok" 
          },
        ];
  
        // Filtra produtos com base na palavra-chave e marketplace/categoria
        const filtered = allWinningProducts.filter(p => {
          const keywordMatch = p.name.toLowerCase().includes(keyword.toLowerCase());
          const marketplaceMatch = marketplaceFilter ? p.marketplace.toLowerCase().includes(marketplaceFilter.toLowerCase()) : true;
          
          // Simula filtro por categoria/nicho
          const categoryMatch = categoryFilter ? (
            p.name.toLowerCase().includes(categoryFilter.toLowerCase()) || // Ex: "Maquiagem" para Kit Maquiagem
            (categoryFilter === 'eletronics' && p.name.toLowerCase().includes('watch')) ||
            (categoryFilter === 'saude' && p.name.toLowerCase().includes('postural')) ||
            (categoryFilter === 'pets' && p.name.toLowerCase().includes('pet')) ||
            (p.adPlatform && p.adPlatform.toLowerCase().includes(categoryFilter.toLowerCase())) // Para filtrar por plataforma como categoria
          ) : true;
  
          return keywordMatch && marketplaceMatch && categoryMatch;
        });
  
        resolve(filtered);
      }, 2000);
    });
  };
  
  // Funcao simulada para buscar produtos clonados recentemente (mantida, pois nao se refere a mineracao)
  export const getRecentClonedProducts = async (): Promise<ClonedProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 101, name: "Smartphone Galaxy A54", marketplace: "Amazon", originalUrl: "amazon.com/sga54", clonedAt: "2024-06-15", status: "Ativo", price: "R$ 1.299", sales: 1500, rating: 4.7, trend: "+10%", competition: "Media", profit: "Medio" },
          { id: 102, name: "Notebook Lenovo IdeaPad", marketplace: "Mercado Livre", originalUrl: "ml.com/nli", clonedAt: "2024-06-14", status: "Revisao", price: "R$ 2.499", sales: 800, rating: 4.5, trend: "-5%", competition: "Alta", profit: "Baixo" },
          { id: 103, name: "Tenis Nike Air Max", marketplace: "Magazine Luiza", originalUrl: "magalu.com/tnam", clonedAt: "2024-06-13", status: "Ativo", price: "R$ 399", sales: 2500, rating: 4.9, trend: "+20%", competition: "Baixa", profit: "Alto" }
        ]);
      }, 1000);
    });
  };