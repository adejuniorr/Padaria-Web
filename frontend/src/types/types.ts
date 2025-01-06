export type Category = {
  name: string;
  icon: React.ReactNode;
}

export type ProductRequest = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  imagem?: File | null;
  qtd_em_estoque: number;
};

export type ProductResponse = {
  id: number;
  nome: string;
  preco: number | string;
  categoria: string;
  descricao: string;
  imagem?: string | undefined;
  qtd_em_estoque: number;
}

export interface ResponseError extends Error {
  status?: number;
}