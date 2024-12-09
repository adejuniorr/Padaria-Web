import { createContext } from 'react';
import { Product } from '../../types/types';

type RegisterProductContextProps = {
  product: Product;
  price: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (data: unknown) => void;
};

export const RegisterProductContext = createContext<RegisterProductContextProps>({
  product: {
    id: 1,
    nome: 'Nome do Produto',
    categoria: 'Categoria',
    descricao: 'Descrição',
    preco: 0.00,
  },
  price: '0,00',
  handleNameChange: () => { },
  handleCategoryChange: () => { },
  handlePriceChange: () => { },
  handleDescriptionChange: () => { },
  onSubmit: () => { },
});