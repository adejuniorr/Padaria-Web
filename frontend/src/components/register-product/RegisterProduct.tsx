import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../buttons/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useProductForm } from '../../hooks/useProductForm';
import { InputField } from '../inputs/InputField';
import { ProductCard } from '../product-card/ProductCard';
import { Product } from '../../types/types';
import { TiThSmallOutline } from 'react-icons/ti';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { MdOutlineBakeryDining } from 'react-icons/md';

export default function RegisterProduct() {
  const { register, handleSubmit, formState: { errors } } = useProductForm();
  const [price, setPrice] = useState<string>('0,00');
  const categories = [
    {
      name: 'Todos',
      icon: <TiThSmallOutline />,
    },
    {
      name: 'Pães',
      icon: <PiBreadFill />,
    },
    {
      name: 'Doces',
      icon: <RiCake3Line />,
    },
    {
      name: 'Salgados',
      icon: <MdOutlineBakeryDining />,
    },
  ]
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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;

    if (category === 'Selecionar') {
      setProduct({ ...product, categoria: 'Categoria' });
      return;
    }

    setProduct({ ...product, categoria: category });
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

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;

    if (description === '') {
      setProduct({ ...product, descricao: 'Descrição' });
      return;
    }

    setProduct({ ...product, descricao: description });
  }

  return (
    <div className='py-4 h-screen'>
      <h2 className='text-brown text-center mb-6 font-pacifico'>
        Cadastrar Produto
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <InputField
          label='Nome'
          error={errors.nome}
          input={
            <input
              type="text"
              placeholder='Digite o nome do produto'
              {...register('nome')}
              onChangeCapture={handleNameChange}
              className='outline-none w-full'
            />
          }
        />
        <InputField
          label='Categoria'
          error={errors.categoria}
          input={
            <select
              {...register('categoria')}
              onChangeCapture={handleCategoryChange}
              className='outline-none w-full cursor-pointer'
            >
              <option value="Selecionar">Selecionar</option>
              <option value="Pães">Pães</option>
              <option value="Doces">Doces</option>
              <option value="Salgados">Salgados</option>
            </select>
          }
        />
        <InputField
          label='Preço'
          error={errors.preco}
          input={
            <input
              type="text"
              value={price === "0,00" ? "" : price}
              placeholder='Digite o preço (apenas números)'
              onChangeCapture={handlePriceChange}
              {...register('preco')}
              className='outline-none w-full '
            />
          }
        />
        <InputField
          label='Descrição'
          error={errors.descricao}
          vertical
          input={
            <textarea
              rows={3}
              placeholder='Se desejar, escreva aqui uma breve descrição sobre o produto...'
              {...register('descricao')}
              onChangeCapture={handleDescriptionChange}
              className='outline-none w-full resize-none'
            />
          }
        />
        <ProductCard product={product} categories={categories} changing />
        <Button type='submit'>
          Cadastrar
        </Button>
        <Link to="/" className='flex items-center gap-2 text-xl mx-auto hover:underline'>
          <FaArrowLeft />
          Voltar
        </Link>
      </form>
    </div>
  );
}
