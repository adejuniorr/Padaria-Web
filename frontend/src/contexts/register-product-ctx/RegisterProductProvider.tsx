import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/types";
import axios from "axios";
import { RegisterProductContext } from "./RegisterProductContext";

export const RegisterProductProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<string>('0,00');
  const [product, setProduct] = useState<Product>({
    id: 1,
    nome: 'Nome do Produto',
    categoria: 'Categoria',
    descricao: 'Descrição',
    preco: 0.00,
  });
  const navigate = useNavigate();

  const onSubmit = async (data: unknown) => {
    await axios.post('http://localhost:8000/api/produtos', data);
    navigate('/');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    if (name === '') {
      setProduct({ ...product, nome: 'Nome do Produto' });
      return;
    }

    setProduct({ ...product, nome: name });
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');

    if (!input) {
      setPrice('0,00');
      return;
    }

    const numericValue = Math.min(Number(input), 99999);

    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setPrice(formattedValue);
    setProduct({ ...product, preco: numericValue / 100 });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;

    if (category === 'Selecionar') {
      setProduct({ ...product, categoria: 'Categoria' });
      return;
    }

    setProduct({ ...product, categoria: category });
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;

    if (description === '') {
      setProduct({ ...product, descricao: 'Descrição' });
      return;
    }

    setProduct({ ...product, descricao: description });
  }

  return (
    <RegisterProductContext.Provider value={{
      product,
      setProduct,
      price,
      handleNameChange,
      handlePriceChange,
      handleCategoryChange,
      handleDescriptionChange,
      onSubmit,
    }}>
      {children}
    </RegisterProductContext.Provider>
  );
}