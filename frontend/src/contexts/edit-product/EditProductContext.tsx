import { createContext } from 'react';
import { ProductForm } from '../../validation/productSchema';

type EditProductContextProps = {
  onSubmitUpdate: (data: ProductForm) => void;
  handleDeleteProduct: () => void;
};

export const EditProductContext = createContext<EditProductContextProps>({
  onSubmitUpdate: () => { },
  handleDeleteProduct: () => { },
});