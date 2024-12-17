import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ReactNode, useState } from "react";
import { ProductRequest, ProductResponse } from "../../types/types";
import { CreateProductContext } from "./CreateProductContext";
import { ProductForm } from "../../validation/productSchema";

export const CreateProductProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<string>('R$ 0,00');
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [openAlertWarning, setOpenAlertWarning] = useState<boolean>(false);
  const [errorWarningMessage, setErrorWarningMessage] = useState<string>("");
  const [openErrorWarning, setOpenErrorWarning] = useState<boolean>(false);
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
    descricao: 'Sem descrição',
    preco: 0.00,
    imagem: undefined,
  });
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const onSubmitRegister = async (data: ProductForm) => {
    setPageLoading(true);

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

      setTimeout(() => {
        setOpenAlertWarning(true);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setOpenErrorWarning(true);
      }, 2000);

      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorWarningMessage("Já existe um produto cadastrado com este nome");
      } else {
        setErrorWarningMessage("Ocorreu um erro ao cadastrar o produto. Verifique o console do navegador.");
        console.error("[CADASTRO] Erro ao cadastrar produto:", error);
      }
    }
  };

  const onSubmitUpdate = async (data: ProductForm) => {
    setPageLoading(true);

    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('categoria', data.categoria);
    formData.append('descricao', data.descricao || '');
    formData.append('preco', data.preco.toString());
    formData.append('_method', 'PUT')

    if (data.imagem instanceof File) {
      formData.append('imagem', data.imagem);
    }

    try {
      await axios.post(`http://localhost:8000/api/produtos/${id}`, formData);

      setTimeout(() => {
        setOpenAlertWarning(true);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setOpenErrorWarning(true);
      }, 1000);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorWarningMessage("Já existe um produto cadastrado com este nome");
      } else {
        setErrorWarningMessage("Ocorreu um erro ao editar o produto. Verifique o console do navegador.");
        console.error("[EDIÇÃO] Erro ao editar o produto:", error);
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

  const handleDeleteProduct = async () => {
    setPageLoading(true);
    await axios.delete(`http://localhost:8000/api/produtos/${id}`);

    setTimeout(() => {
      setPageLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <CreateProductContext.Provider value={{
      pageLoading,
      setPageLoading,
      openAlertWarning,
      setOpenAlertWarning,
      openErrorWarning,
      setOpenErrorWarning,
      errorWarningMessage,
      onSubmitRegister,
      onSubmitUpdate,
      price,
      setPrice,
      productRequest,
      setProductRequest,
      productResponse,
      setProductResponse,
      handleNameChange,
      handlePriceChange,
      handleCategoryChange,
      handleDescriptionChange,
      handleDeleteProduct,
    }}>
      {children}
    </CreateProductContext.Provider>
  );
}