import { createContext } from 'react';
import { ProductRequest, ProductResponse } from '../../types/types';
import { ProductForm } from '../../validation/productSchema';

type RegisterProductContextProps = {
  price: string;
  productRequest: ProductRequest,
  setProductRequest: (product: ProductRequest) => void,
  productResponse: ProductResponse;
  setProductResponse: (product: ProductResponse) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (data: ProductForm) => void;
};

export const RegisterProductContext = createContext<RegisterProductContextProps>({
  price: '0,00',
  productRequest: {
    id: 1,
    nome: '',
    preco: 0.00,
    categoria: '',
    descricao: '',
    imagem: null,
  },
  setProductRequest: () => { },
  productResponse: {
    id: 1,
    nome: 'Nome do Produto',
    preco: 0.00,
    categoria: 'Categoria',
    descricao: 'Descrição',
    imagem: undefined,
  },
  setProductResponse: () => { },
  handleNameChange: () => { },
  handlePriceChange: () => { },
  handleCategoryChange: () => { },
  handleDescriptionChange: () => { },
  onSubmit: () => { },
});