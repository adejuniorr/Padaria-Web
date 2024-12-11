import { createContext } from 'react';
import { Product } from '../../types/types';

type RegisterProductContextProps = {
  price: string;
  product: Product;
  setProduct: (product: Product) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (data: unknown) => void;
};

export const RegisterProductContext = createContext<RegisterProductContextProps>({
  price: '0,00',
  product: {
    id: 1,
    nome: 'Nome do Produto',
    preco: 0.00,
    categoria: 'Categoria',
    descricao: 'Descrição',
    img: '',
  },
  setProduct: () => { },
  handleNameChange: () => { },
  handlePriceChange: () => { },
  handleCategoryChange: () => { },
  handleDescriptionChange: () => { },
  onSubmit: () => { },
});