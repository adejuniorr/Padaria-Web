export type Category = {
  name: string;
  icon: React.ReactNode;
}

export type Product = {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  img?: string;
  imgAlt?: string;
};