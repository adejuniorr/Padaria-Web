export type Category = {
  name: string;
  icon: React.ReactNode;
}

export type Product = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  img?: string;
  imgAlt?: "Imagem meramente ilustrativa do produto";
};