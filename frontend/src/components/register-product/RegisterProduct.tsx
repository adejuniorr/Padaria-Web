import { Link } from 'react-router-dom';
import { Button } from '../buttons/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { useProductForm } from '../../hooks/useProductForm';
import { InputField } from '../inputs/InputField';
import { ProductCard } from '../product-card/ProductCard';
import { TiThSmallOutline } from 'react-icons/ti';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { MdOutlineBakeryDining } from 'react-icons/md';
import { useContext } from 'react';
import { RegisterProductContext } from '../../contexts/register-product-ctx/RegisterProductContext';

export default function RegisterProduct() {
  const { register, setValue, handleSubmit, formState: { errors } } = useProductForm();
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
  const {
    onSubmit,
    price,
    productRequest,
    setProductRequest,
    productResponse,
    handleNameChange,
    handlePriceChange,
    handleCategoryChange,
    handleDescriptionChange,
  } = useContext(RegisterProductContext);

  const onImageChange = (file: File | null) => {
    if (file) {
      setProductRequest({
          ...productRequest,
          imagem: file,
        })
      setValue("imagem", file);
    } else {
      setProductRequest({ ...productRequest, imagem: undefined });
      setValue("imagem", null);
    }
  };

  return (
    <div className='p-4 h-screen flex flex-col items-center'>
      <h2 className='text-brown text-center mb-6 font-pacifico'>
        Cadastrar Produto
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-6'
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
          label='Preço'
          error={errors.preco}
          input={
            <input
              type="text"
              value={price}
              placeholder='Digite o preço (apenas números)*'
              onChangeCapture={handlePriceChange}
              {...register('preco')}
              className='outline-none w-full '
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
              className='outline-none w-full cursor-pointer bg-white'
            >
              <option value="Selecionar">Selecionar</option>
              <option value="Pães">Pães</option>
              <option value="Doces">Doces</option>
              <option value="Salgados">Salgados</option>
            </select>
          }
        />
        <InputField
          label='Descrição'
          error={errors.descricao}
          vertical
          input={
            <textarea
              rows={3}
              placeholder='Digite aqui uma breve descrição sobre o produto (opcional)'
              {...register('descricao')}
              onChangeCapture={handleDescriptionChange}
              className='outline-none w-full resize-none'
            />
          }
        />
        <div className='relative mt-2 w-full'>
          <span className='lg:hidden font-pacifico text-xl bg-orange text-white rounded-t-lg px-4 py-1 relative -z-10 bottom-1'>Prévia</span>
          <ProductCard
            product={productResponse}
            categories={categories}
            changing
            onImageChange={onImageChange}
          />
          <span>{errors.imagem && <i>{errors.imagem.message?.toString()}</i>}</span>
        </div>
        <Button type='submit'>
          Cadastrar
        </Button>
        <Link to="/" className='flex items-center gap-2 text-xl mx-auto hover:underline pb-4'>
          <FaArrowLeft />
          Voltar
        </Link>
      </form>
    </div>
  );
}
