// TODO: refact solid principles
// 1. Single Responsibility Principle (SRP):
//    - Este contexto deve servir recursos apenas para a operação de criar novos produtos;
// 2. Open/Closed Principle (OCP):
//    - Este contexto deve estar aberto para extensão e fechado para modificações (mais interfaces);
//    - Novas interfaces podem ser criadas para implementar os métodos do contexto
// 3. Liskov Substitution Principle (LSP):
//    - Não se aplica aqui.
// 4. Interface Segregation Principle (ISP):
//    - Não se aplica aqui.
// 5. Dependency Inversion Principle (DIP):
//    - Não se aplica aqui

import { createContext } from 'react';
import { ProductRequest, ProductResponse } from '../../types/types';
import { ProductForm } from '../../validation/productSchema';

type CreateProductContextProps = {
  pageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
  openAlertWarning: boolean;
  setOpenAlertWarning: (open: boolean) => void;
  openErrorWarning: boolean;
  setOpenErrorWarning: (open: boolean) => void;
  errorWarningMessage: string;
  price: string;
  setPrice: (price: string) => void;
  productRequest: ProductRequest,
  setProductRequest: (product: ProductRequest) => void,
  productResponse: ProductResponse;
  setProductResponse: (product: ProductResponse) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitRegister: (data: ProductForm) => void;
  onSubmitUpdate: (data: ProductForm) => void;
  handleDeleteProduct: () => void;
};

export const CreateProductContext = createContext<CreateProductContextProps>({
  pageLoading: false,
  setPageLoading: () => { },
  openAlertWarning: false,
  setOpenAlertWarning: () => { },
  openErrorWarning: false,
  setOpenErrorWarning: () => { },
  errorWarningMessage: '',
  price: '0,00',
  setPrice: () => { },
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
  onSubmitRegister: () => { },
  onSubmitUpdate: () => { },
  handleDeleteProduct: () => { },
});