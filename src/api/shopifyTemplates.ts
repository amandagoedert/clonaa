// src/api/shopifyTemplates.ts

// Define um tipo para o Template Shopify
export interface ShopifyTemplate {
    id: number;
    name: string;
    category: string;
    rating: number;
    downloads: number;
    image: string; // URL da imagem
    description: string;
  }
  
  // Funcao simulada para buscar templates Shopify
  export const getShopifyTemplates = async (
    searchTerm: string = ""
  ): Promise<ShopifyTemplate[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allTemplates: ShopifyTemplate[] = [
          {
            id: 1,
            name: "Minimal Store",
            category: "Fashion",
            rating: 4.8,
            downloads: 1230,
            image: "https://via.placeholder.com/400x225/007bff/ffffff?text=Minimal+Store",
            description: "Template minimalista perfeito para lojas de moda"
          },
          {
            id: 2,
            name: "Tech Shop",
            category: "Electronics",
            rating: 4.9,
            downloads: 890,
            image: "https://via.placeholder.com/400x225/28a745/ffffff?text=Tech+Shop",
            description: "Template moderno para lojas de eletronicos"
          },
          {
            id: 3,
            name: "Beauty Store",
            category: "Beauty",
            rating: 4.7,
            downloads: 1560,
            image: "https://via.placeholder.com/400x225/dc3545/ffffff?text=Beauty+Store",
            description: "Template elegante para produtos de beleza"
          },
          {
              id: 4,
              name: "Artizan Craft",
              category: "Handmade",
              rating: 4.5,
              downloads: 750,
              image: "https://via.placeholder.com/400x225/ffc107/343a40?text=Artizan+Craft",
              description: "Design rustico para produtos artesanais"
          },
          {
              id: 5,
              name: "EcoLiving",
              category: "Sustainable",
              rating: 4.6,
              downloads: 1100,
              image: "https://via.placeholder.com/400x225/17a2b8/ffffff?text=EcoLiving",
              description: "Ideal para lojas de produtos ecologicos"
          }
        ];
  
        // Filtra templates com base no termo de busca
        const filtered = allTemplates.filter(template =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        resolve(filtered);
      }, 1000); // Simula atraso da rede
    });
  };
  
  // Funcao simulada para baixar um template
  export const downloadShopifyTemplate = async (templateId: number, templateName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (templateId === 999) { // Simula um erro de download
          reject(new Error("Falha ao baixar o template. Tente novamente."));
        } else {
          console.log(`Template ${templateName} (ID: ${templateId}) baixado com sucesso.`);
          // Em um cenario real, aqui voce iniciaria o download de um arquivo.
          // Para simulacao no frontend, podemos gerar um blob simples.
          const fileContent = `Conteudo do template ${templateName} (ID: ${templateId}).\nEste é um arquivo de simulacao de template Shopify.`;
          const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8;' });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${templateName.replace(/\s/g, '_')}_template.zip`; // Simula um arquivo ZIP
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
  
          resolve();
        }
      }, 1500); // Simula atraso do download
    });
  };