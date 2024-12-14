import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import { ProductRequest, ProductResponse } from "../../types/types";
import { RegisterProductContext } from "./RegisterProductContext";
import { ProductForm } from "../../validation/productSchema";

export const RegisterProductProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<string>('R$ 0,00');
  const [productRequest, setProductRequest] = useState<ProductRequest>({
    id: 1,
    nome: '',
    categoria: '',
    descricao: '',
    preco: 0.00,
    imagem: null,
  });
  const [productResponse, setProductResponse] = useState<ProductResponse>({
    id: 1,
    nome: 'Nome do Produto',
    categoria: 'Categoria',
    descricao: 'Descrição',
    preco: 0.00,
    imagem: undefined,
  });
  const navigate = useNavigate();

  const onSubmit = async (data: ProductForm) => {

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("categoria", data.categoria);
    formData.append("descricao", data.descricao || "");
    formData.append("preco", data.preco.toString());

    if (data.imagem instanceof File) {
      formData.append("imagem", data.imagem);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/produtos", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      alert("Produto cadastrado com sucesso! Você será redirecionado para a página inicial.");
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert("Já existe um produto cadastrado com este nome");
      } else {
        alert("Ocorreu um erro ao cadastrar o produto.");
        console.error("Erro ao enviar o produto:", error);
      }
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    if (name === '') {
      setProductResponse({ ...productResponse, nome: 'Nome do Produto' });
      return;
    }

    setProductResponse({ ...productResponse, nome: name });
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');

    if (!input) {
      setPrice('R$ 0,00');
      return;
    }

    const numericValue = Math.min(Number(input), 99999);

    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setPrice("R$ " + formattedValue);
    setProductResponse({ ...productResponse, preco: numericValue / 100 });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;

    if (category === 'Selecionar') {
      setProductResponse({ ...productResponse, categoria: 'Categoria' });
      return;
    }

    setProductResponse({ ...productResponse, categoria: category });
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;

    if (description === '') {
      setProductResponse({ ...productResponse, descricao: 'Descrição' });
      return;
    }

    setProductResponse({ ...productResponse, descricao: description });
  }

  return (
    <RegisterProductContext.Provider value={{
      onSubmit,
      price,
      productRequest,
      setProductRequest,
      productResponse,
      setProductResponse,
      handleNameChange,
      handlePriceChange,
      handleCategoryChange,
      handleDescriptionChange,
    }}>
      {children}
    </RegisterProductContext.Provider>
  );
}